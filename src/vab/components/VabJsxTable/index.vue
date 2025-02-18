<script>
  import request from '@/utils/request'
  import mixTable from '@/utils/mixTable'
  import _ from 'lodash'
  import cache from '@/utils/cache'
  import { VabContextmenu, VabContextmenuItem } from '@/extra/VabContextmenu'
  import store from '@/store'

  export default {
    name: 'VabTable',
    componentName: 'VabTable',
    components: {
      VabContextmenu,
      VabContextmenuItem,
    },
    mixins: [mixTable],
    provide() {
      return {
        tableRoot: this,
      }
    },
    props: {
      selection: {
        type: Boolean,
        default: false,
      },
      showHeader: {
        type: Boolean,
        default: true,
      },
      hasPager: {
        type: Boolean,
        default: true,
      },
      initParams: {
        type: Object,
        default: null,
      },
      enableInit: {
        type: Boolean,
        default: true,
      },
      // queryParams: {
      //   type: Object,
      //   default: null,
      // },
      apiUrl: {
        type: String,
        default: '',
      },
      height: {
        type: [Number, String],
        default: null,
      },
      maxHeight: {
        type: [Number, String],
        default: null,
      },
      //表示項目設定
      customConfig: {
        type: Boolean,
        default: true,
      },
      rowClassName: {
        type: [String, Function],
        default: null,
      },
      spanMethod: {
        type: [String, Function],
        default: null,
      },
      selecTableSwitch: {
        type: Boolean,
        default: false,
      },
      headerCellName: {
        type: Boolean,
        default: false,
      },
      enableSort: {
        type: Boolean,
        default: true,
      },
      //没有分页的情况下，强制调用后台排序（例：月别作业一览画面）
      enSortable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        listLoading: false,
        // layout: 'total, sizes, prev, pager, next, jumper',
        layout: 'total,sizes, prev, pager, next',
        total: 0,
        elementLoadingText: 'ローディング',
        innerHeight: null,
        requestParams: {
          page: 1,
          rows: this.hasPager ? 10 : 999,
        },
        checkList: [],
        columnActions: [],
        cursorPos: [0, 0],
        isDragging: false,
        rightColumnIndex: 0,
        initalColumns: [],
        localEmptyText: null,
        list: [
          {
            icon: 'lock-fill',
            title: '固定',
            code: 'lock',
          },
          {
            icon: 'lock-unlock-line',
            title: '固定の解除',
            code: 'unlock',
          },
        ],
        footer: null,
        vmQueyForm: null,
        pageDisabled: false,
      }
    },
    computed: {
      eListeners() {
        return {
          'row-click': this.handleRowClick,
          'selection-change': this.selectionChange,
          'current-change': this.setSelectRows,
          'sort-change': this.handleSort,
          select: this.getSelectRows,
          'select-all': this.handleSelectAll,
          'expand-change': this.handleExpandChange,
        }
      },
      dragOptions() {
        return {
          animation: 600,
          group: 'description',
          filter: '.undraggable',
        }
      },
      finallyColumns() {
        this.columns.filter((item) => {
          if (
            !this.$baseLodash.has(item, 'sortable') &&
            item.type != 'actions' &&
            this.enableSort
          ) {
            item.sortable = true
          }
        })
        if (this.customConfig) {
          let list = this.columns.filter((item) =>
            this.checkList.includes(item.label)
          )
          return list.filter((item) => !item.hidden)
        } else {
          return this.columns.filter((item) => !item.hidden)
        }
      },
      rightSpan() {
        if (this.$attrs.span) {
          return 24 - this.$attrs.span
        } else {
          return 10
        }
      },
      checkFlg() {
        return store.getters['notify/checkFlg']
      },
      storePage() {
        return store.getters['notify/page']
      },
    },
    watch: {
      finallyColumns() {
        this.$nextTick(() => {
          this.$refs.table.doLayout()
        })
      },
      tableData: {
        handler(newVal) {
          this.dataSource = newVal
        },
      },
      // initParams: {
      //   handler() {
      //     this.requestParams = _.assign({}, this.requestParams, this.initParams)
      //     this.initTable()
      //   },
      //   deep: true,
      // },
    },
    beforeMount() {
      this.localEmptyText =
        this.emptyText ||
        this.$t(`validateMessage.${this.$messageCode.E00000104.name}`)
      window.addEventListener('resize', this.handleHeight)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleHeight)
    },
    mounted() {
      if (this.enableInit) {
        //テーブルの初期化
        this.requestParams = _.assign({}, this.requestParams, this.initParams)
        this.initTable()
      }
    },
    activated() {},
    created() {
      this.initalColumns = this.$baseLodash.cloneDeep(this.columns)
      this.initColumnConfig()
      this.handleColumnActions()
    },
    methods: {
      paramsChange() {
        this.requestParams = _.assign({}, this.requestParams, this.initParams)
        this.initTable()
      },
      queryParamChange(params) {
        this.requestParams = _.assign({}, this.requestParams, params)
        this.initTable()
      },
      doLayout() {
        this.$refs.table.doLayout()
      },
      handlePermission(permissions, row) {
        if (this.$baseLodash.isFunction(permissions)) {
          return permissions(row)
        }
        return permissions
      },
      cellClass(row) {
        if (
          row.columnIndex === 0 &&
          row.rowIndex === 0 &&
          this.headerCellName
        ) {
          return 'disableheadselection'
        }
      },
      setVm(vm) {
        this.vm = vm
      },
      selectable(row) {
        if (this.selecTableSwitch) {
          return this.vm && this.vm.selectable({ row: row })
        } else {
          return true
        }
      },
      handleExpandChange(val, expandedRows) {
        this.$emit('expand-change', val)
        this.$emit('expand-rows', expandedRows)
      },
      handleSelectAll(val) {
        this.$emit('select-all', val)
      },
      toggleRowSelection(item, boolean) {
        this.$refs.table.toggleRowSelection(item, boolean)
      },
      toggleAllSelection() {
        this.$refs.table.toggleAllSelection()
      },
      clearSelection() {
        this.$refs.table.clearSelection()
      },
      clearSort() {
        this.requestParams.sidx = null
        this.requestParams.sort = null
      },
      handleCommand(row) {
        console.log('row', row)
        this.listLoading = true
        row.click && row.click(row)
        let vm = this
        setTimeout(() => {
          vm.listLoading = false
        }, 500)
      },
      // 显示项目设定
      showProduntItem() {
        this.$refs.productItem.initData({ checkList: this.checkList, vm: this })
      },
      /** @param {MouseEvent} ev */
      onMouseDown(ev) {
        this.cursorPos = [ev.pageX, ev.pageY]
        this.isDragging = true
        window.addEventListener('mousemove', this.onMouseHold)
      },
      /** @param {MouseEvent} ev */
      onMouseUp() {
        window.removeEventListener('mousemove', this.onMouseHold)
        this.isDragging = false
      },
      /** @param {MouseEvent} ev */
      onMouseHold(ev) {
        ev.preventDefault()
        requestAnimationFrame(() => {
          const delta = [
            ev.pageX - this.cursorPos[0],
            ev.pageY - this.cursorPos[1],
          ]
          this.cursorPos = [ev.pageX, ev.pageY]
          if (!this.$refs['table'].bodyWrapper) return
          this.$refs['table'].bodyWrapper.scrollBy({
            left: -delta[0],
            top: -delta[1],
          })
        })
      },
      initColumnConfig() {
        if (this.customConfig) {
          let cacheKey = `${this.$route.name}_columnConfig`
          let columnConfig = cache.local.get(cacheKey)
          if (columnConfig) {
            this.checkList = columnConfig['checkList']
            var orderList = columnConfig['columnOrder']
            if (orderList?.length > 0) {
              this.updateColumnPosition(orderList)
            }
          } else {
            this.checkList = _.map(this.columns, 'label')
          }
        }
      },
      updateColumnPosition(orderList) {
        orderList.forEach((element, index) => {
          this.updatePosition(_.findIndex(this.columns, element), index)
        })
      },
      selectionChange(val) {
        if (this.multiSelect) {
          this.$emit('selection-change', val)
        }
      },
      setSelectRows(val) {
        if (!this.multiSelect) {
          this.$emit('selection-change', val ? [val] : [])
        }
      },
      getSelectRows(val, row) {
        this.$emit('select', _.isArray(val) ? val : [val])
        this.$emit('select-row', {
          list: _.isArray(val) ? val : [val],
          row: row,
        })
      },
      // ソート事件
      async handleSort(sort) {
        this.requestParams.sidx = sort.column.property
        if (this.primaryKey) {
          this.requestParams.sidx =
            this.requestParams.sidx + ',' + this.primaryKey
        }
        this.requestParams.sort =
          this.$baseLodash.replace(sort.order, 'ending', '') || 'asc'
        if (this.primaryKeySort) {
          this.requestParams.sort =
            this.requestParams.sort + ',' + this.primaryKeySort
        }

        if (this.dataSource.length == 0) return
        if (!this.hasPager && !this.enSortable) return
        let oldList = this.$baseLodash.cloneDeep(this.dataSource)
        await this.initTable()
        if (this.submitMode) {
          this.$emit('submitTable', {
            dataSource: this.dataSource,
            oldList: oldList,
            sort: true,
          })
        }
        this.$emit('sort-events', sort)
      },
      filterHandler(filters) {
        this.$emit('filter-events', filters)
      },
      handleRowClick(row) {
        this.$emit('click-events', row)
      },
      handleHeight() {
        this.innerHeight = this.height == 'auto' ? null : this.height
      },

      async handleSizeChange(val) {
        if (this.dataSource.length == 0) return
        let formCheck = true
        if (this.vmQueyForm) {
          await this.vmQueyForm.validateTable().then(
            () => {
              formCheck = true
            },
            () => {
              formCheck = false
              this.requestParams['rows'] = val
              this.clearDataSource()
            }
          )
        }
        if (!formCheck) return
        this.changePageSize('rows', val)
      },
      async handleCurrentChange(val) {
        if (this.dataSource.length == 0) return
        let formCheck = true
        if (this.vmQueyForm) {
          await this.vmQueyForm.validateTable().then(
            () => {
              formCheck = true
            },
            () => {
              formCheck = false
              this.requestParams['page'] = val
              this.clearDataSource()
            }
          )
        }
        if (!formCheck) return
        this.changePageSize('page', val)
      },
      async changePageSize(type, val) {
        this.requestParams = _.assign({}, this.queryParams, this.requestParams)
        this.requestParams[type] = val
        this.pageDisabled = false
        if (this.dataSource.length == 0) return
        let oldTableList = this.$baseLodash.cloneDeep(this.dataSource)
        await this.initTable()
        if (this.submitMode) {
          if (type == 'page') {
            store.dispatch('notify/setPage', val)
          }
          this.$emit('submitTable', {
            dataSource: this.dataSource,
            oldList: oldTableList,
          })
        }
        this.$emit('size-change', val)
      },
      handleClick: (row, btn) => btn && btn.click(btn),
      queryData() {
        this.requestParams.page = 1
        this.initTable()
      },
      alterList(onList) {
        if (this.columns) {
          onList(this.columns)
        }
      },
      toggleRowExpansion(row) {
        this.$refs.table.toggleRowExpansion(row)
      },
      updatePosition(oldIndex, newIndex) {
        const updatePosition = (list) =>
          list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
        this.alterList(updatePosition)
      },
      updateFixed(fixed) {
        let vm = this
        function updateFixed(list) {
          for (var i = 0; i <= vm.rightColumnIndex; i++) {
            if (fixed) {
              list[i].fixed = 'left'
            } else {
              list[i].fixed = false
            }
            list[i].disableCheck = fixed
            let ob = list[vm.rightColumnIndex].__ob__
            if (ob) {
              ob.dep.notify()
            }
          }
        }
        this.alterList(updateFixed)
      },
      handleColumnActions() {
        let array = this.columns.filter((item) => item.type == 'actions')
        if (array.length > 0) {
          // this.columnActions = array[0].actions.splice(3)
          this.columnActions = array[0].actions
        }
      },
      async fetchData() {
        let sidx = this.requestParams?.sidx
        let sort = this.requestParams?.sort

        this.requestParams = _.assign({}, this.requestParams, this.queryParams)
        this.requestParams.page = 1
        if (this.storePage) {
          this.requestParams.page = this.storePage
        }

        if (sidx && sort) {
          this.requestParams.sidx = sidx
          this.requestParams.sort = sort
        }
        return await this.initTable()
      },

      //table
      async initTable() {
        if (Object.keys(this.formData).length != 0) {
          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async (resolve) => {
            this.formData.validate(async (valid) => {
              if (valid) {
                await this.initDataSource()
                resolve()
              } else {
                return false
              }
            })
          })
        } else {
          await this.initDataSource()
        }
      },
      clearDataSource() {
        this.requestParams.page = 1
        this.total = 0
        this.dataSource = []
      },
      async initDataSource() {
        this.listLoading = true
        //url存在する場合
        if (this.apiUrl) {
          const { list, total } = await request({
            url: this.apiUrl,
            method: 'post',
            data: this.requestParams,
          })
          if (this.selecTableSwitch) {
            list.filter((item) => {
              item.userCheckbox = true
            })
          }

          this.$set(
            this.$data,
            'dataSource',
            this.freezeable ? Object.freeze(list) : list
          )
          //this.dataSource = list
          this.total = total
        } else {
          this.$set(
            this.$data,
            'dataSource',
            this.freezeable ? Object.freeze(this.tableData) : this.tableData
          )
          this.total = this.tableData.length
        }
        store.dispatch('notify/setPage', null)
        this.handleHeight()
        setTimeout(() => {
          this.listLoading = false
        }, 100)
      },
      onMove(e) {
        if (e.relatedContext.element.fixed) return false
        return true
      },

      rightClick(column, event) {
        if (column.type == 'actions') {
          return
        }
        let vnode = this.$refs['contextmenu']
        vnode.$contextmenuId = vnode._uid
        vnode.style.top = event.clientY + 'px'
        vnode.style.left = event.clientX + 'px'
        vnode.show()

        //columnのインデックスを記憶する
        this.rightColumnIndex = column.index
        event.stopPropagation()
        event.returnValue = false
      },

      handleContextMenu(item) {
        if (item.code == 'lock') {
          this.updateFixed(true)
        } else {
          this.updateFixed(false)
        }
      },

      /**
       * table
       */
      buildElTable() {
        return (
          <el-table
            ref="table"
            border
            class="changeTable"
            data={this.dataSource}
            element-loading-text={this.elementLoadingText}
            max-height={this.maxHeight}
            size={this.size}
            stripe={this.stripe}
            show-summary={this.showSummary}
            expand-row-keys={this.rowKey ? this.expandedRows : null}
            summary-method={this.getSummaries}
            show-header={this.showHeader}
            row-class-name={this.rowClassName}
            span-method={this.spanMethod}
            cell-style={this.cellStyle}
            tree-props={this.treeProps}
            row-key={this.rowKey}
            empty-text={this.localEmptyText}
            highlight-current-row={!this.multiSelect}
            header-cell-class-name={this.cellClass}
            {...{
              props: this.$attrs,
              on: { ...this.$listeners, ...this.eListeners },
            }}
          >
            {!this.multiSelect ? null : (
              <el-table-column
                type="selection"
                class-name="selection_change"
                width="45px"
                style="margin-left: 5px"
                selectable={this.selectable}
                reserve-selection={this.rowKey ? true : false}
              ></el-table-column>
            )}
            {this.finallyColumns.map((column) => {
              let hidden = false
              if (this.$baseLodash.has(column, 'hidden')) {
                hidden = column.hidden
              }
              if (this.$baseLodash.isFunction(column?.hidden)) {
                hidden = column.hidden()
              }

              //配置をマージする
              return hidden ? null : (
                <RenderColumn
                  column={Object.assign(
                    {},
                    column.type == 'actions'
                      ? this.actionCenterColumn
                      : this.defaultColumnConfig,
                    column
                  )}
                />
              )
            })}
          </el-table>
        )
      },

      /**
       * pager
       */
      buildPagination() {
        if (this.hasPager) {
          return (
            <el-pagination
              ref="page"
              current-page={this.requestParams.page}
              layout={this.layout}
              page-size={this.requestParams.rows}
              total={this.total}
              {...{
                on: {
                  'current-change': this.handleCurrentChange,
                  'size-change': this.handleSizeChange,
                },
              }}
            />
          )
        }
      },
    },

    render() {
      return (
        <div class="list-container table_top_btn">
          {this.buildNavTool()}
          <div class="vab_table_body">
            {this.buildPagination()}
            {this.buildElTable()}
          </div>
        </div>
      )
    },
  }
</script>

<style lang="scss" scoped>
  @mixin button {
    .el-button {
      display: block;
      padding: 3px 10px;
      margin-top: 10px;
      margin-right: auto;
      margin-left: auto;
    }
  }

  .nav-bar {
    padding: 2px 5px;
    margin: 20px 0 0 0;
  }
  .btnname {
    display: inline;
    padding-left: 5px;
    font-size: 13px;
  }
  .btnPl0 {
    padding-left: 0;
  }

  .className {
    font-size: 15px;
  }
  .is-disable {
    color: #a1a1a1;
    border-color: #cecece;
  }

  .custom-table-checkbox {
    .el-checkbox {
      margin-left: 10px;
    }
    @include button;
  }
  .set_item {
    height: 28px;
    padding: 0 6px;
    color: #848484;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #848484;
    border-radius: 3px;
    &:hover {
      color: #a1a1a1;
      border: 1px solid #a1a1a1;
    }
    .item_word {
      padding-left: 6px;
      font-size: 13px;
      font-weight: 500;
    }
  }
  .link-more-2-fill {
    float: right;
    line-height: 30px;
  }
  .chagne_btn {
    font-size: 13px;
    font-weight: 500;
    margin-right: 8px;
  }
  .changeTable ::v-deep {
    .disableheadselection > .cell .el-checkbox__inner {
      display: none;
    }
  }
  .chagne_btn.is-plain {
    .btnname {
      padding-left: 0px;
    }
  }
</style>
<style scoped lang="scss">
  $fontColor: var(--font-color, #0060c2);
  $hoverColor: var(--hover-color, #0071ee);
  $borderColor: var(--border-color, #0060c2);
  .hollow_box {
    padding: 0 10px;
    height: 28px;
    border: 1px solid $borderColor;
    border-radius: 3px;
    color: $fontColor;
    margin-right: 8px;
    cursor: pointer;
    &:hover {
      @if $hoverColor {
        border-color: $hoverColor;
        color: $hoverColor;
      }
    }
  }

  .pl0 {
    //padding-left: 0 !important;
  }

  .no_select {
    color: #a1a1a1 !important;
    background: #efefef !important;
    border-color: #cecece !important;
    pointer-events: none;
  }

  ::v-deep .el-dropdown-menu__item {
    font-size: 14px;
  }
</style>
