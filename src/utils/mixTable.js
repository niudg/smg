import { formatCell } from '@/utils/index'
import mixActionButton from '@/utils/mixActionButton'
import _ from 'lodash'
import { handleEventList } from '@/utils/eventListHandler'
export default {
  mixins: [mixActionButton],
  props: {
    showSummary: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    navButtons: {
      type: Array,
      default: () => [],
    },
    rightButtons: {
      type: Array,
      default: () => [],
    },

    size: {
      type: String,
      default: 'mini',
    },

    stripe: {
      type: Boolean,
      default: () => true,
    },

    multiSelect: {
      // ラジオボタンをチェックできるかどうか
      type: Boolean,
      default: () => false,
    },
    cellStyle: {
      type: [String, Function],
      default: null,
    },
    defaultColumnConfig: {
      type: Object,
      default: () => {
        return {
          align: 'left',
          'header-align': 'left',
        }
      },
    },
    actionCenterColumn: {
      type: Object,
      default: () => {
        return {
          align: 'center',
          'header-align': 'center',
        }
      },
    },
    actionsColumn: {
      type: Object,
      default: () => {
        return {
          'min-width': 100,
        }
      },
    },
    treeProps: {
      type: Object,
      default: () => {
        return {}
      },
    },
    rowKey: {
      type: [String, Function],
      default: null,
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    submitMode: {
      type: Boolean,
      default: false,
    },
    combineField: {
      type: String,
      default: null,
    },
    spanColIndex: {
      type: [Array, Number],
      default: null,
    },
    mergeCfg: {
      type: [Array],
      default: null,
    },
    customerSummaries: {
      type: Function,
      default: null,
    },
    emptyText: {
      type: String,
      default: null,
    },
    freezeable: {
      type: Boolean,
      default: true,
    },
    primaryKey: {
      type: String,
      default: null,
    },
    primaryKeySort: {
      type: String,
      default: null,
    },

    leftPanelSpan: {
      type: Number,
      default: 14,
    },
    rightPanelSpan: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'ElForm') {
        parent = parent.$parent
        if (!parent) {
          return
        }
        parentName = parent.$options.componentName
      }
      return parent
    },
    sortedColumns() {
      return this.$baseLodash.sortBy(this.columns, [
        function (o) {
          return o.order || 99
        },
      ])
    },

    propsValue() {
      let prop = this.$attrs.prop || this.$props.prop
      return prop && this.form && _.get(this.form.model, prop)
    },
  },

  data() {
    return {
      dataSource: [],
      expandedRows: [],
      editX: null,
      editY: null,
      editMap: [],
    }
  },
  activated() {
    this.$nextTick(() => {
      this.handleHeight()
      this.$refs.table.doLayout()
    })
  },
  watch: {
    dataSource() {
      this.$nextTick(() => {
        this.$refs.table?.doLayout()
        if (!this.showSummary) {
          return
        }
        let columns = this.flatColumns(this.sortedColumns)
        columns = columns.filter((item) => {
          if (this.$baseLodash.isFunction(item?.hidden)) {
            return !item.hidden()
          }
          return !item.hidden
        })
        let start = _.findIndex(columns, 'sums')
        let end = _.findLastIndex(columns, 'sums')
        if (start > 0) {
          if (this.footer == null) {
            this.footer = this.$el.querySelectorAll(
              '.el-table__footer-wrapper tr >td'
            )
            this.footer[0].colSpan = start
            this.footer[0].style.textAlign = 'right'
            for (let j = 1; j < start; j++) {
              if (this.footer[j]) {
                this.footer[j].style.display = 'none'
              }
            }
            if (this.footer[end + 1]) {
              this.footer[end + 1].colSpan = columns.length - end - 1
            }
            for (let j = end + 2; j < columns.length; j++) {
              if (this.footer[j]) {
                this.footer[j].style.display = 'none'
              }
            }
          }
        }
      })
    },
    propsValue: {
      handler(newVal, oldVal) {
        if (newVal == oldVal) {
          return
        }
        this.$set(
          this.$data,
          'dataSource',
          this.tableRowspanCombine(newVal, this.combineField)
        )
        this.editMap = []
      },
      deep: true,
      immediate: true,
    },
    // 'form.model': {
    //   handler(newVal) {
    //     let prop = this.$attrs.prop || this.$props.prop
    //     if (prop) {
    //       let data = _.get(newVal, prop)
    //       console.info(prop, data)
    //       if (data == this.dataSource) {
    //         return
    //       }
    //       console.info(prop, data)
    //       this.$set(
    //         this.$data,
    //         'dataSource',
    //         this.tableRowspanCombine(data, this.combineField)
    //       )
    //       this.editMap = []
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  methods: {
    doLayout() {
      let vm = this
      this.$nextTick(() => {
        vm.$refs.table.doLayout()
      })
    },
    handleHeight() {},
    flatColumns(columns) {
      return columns.flatMap((column) =>
        column.children ? [...this.flatColumns(column.children)] : [column]
      )
    },
    clearSelection() {
      let vm = this
      vm.$refs.table.clearSelection()
    },
    setCurrentRow(row) {
      let vm = this
      vm.$refs.table.setCurrentRow(row)
    },
    getSummaries(param) {
      if (this.customerSummaries) {
        return this.customerSummaries(param)
      }

      const { data } = param
      let columns = this.flatColumns(this.sortedColumns)
      columns = columns.filter((item) => {
        if (this.$baseLodash.isFunction(item?.hidden)) {
          return !item.hidden()
        }
        return !item.hidden
      })
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合計'
          return
        } else if (index === 1 && !column.sums) {
          sums[index] = ' '
          return
        }
        if (data) {
          let finalData = data.filter((item) => {
            if (this.$baseLodash.has(item, 'cancelFlg')) {
              return (
                item.cancelFlg != this.$divisions.cancelFlgEnum.enum_1.value
              )
            }
            if (this.$baseLodash.has(item, 'clflg')) {
              return item.clflg != this.$divisions.cancelFlgEnum.enum_1.value
            }
            return item
          })
          const values = finalData.map(
            (item) => Number(_.get(item, column.prop)) || 0
          )
          //item[column.property] は html でバインドされた prop で、prop がないと集計結果が表示されません
          if (!values.every((value) => isNaN(value))) {
            if (column.sums) {
              sums[index] = formatCell(
                values.reduce((prev, curr) => {
                  const value = Number(curr)
                  if (!isNaN(value)) {
                    return prev + curr
                  } else {
                    return prev
                  }
                }, 0),
                'number',
                null
              )
            }
          }
        }
      })
      return sums
    },
    // 行合併です
    tableRowspanCombine(list, fieldName) {
      if (!list) {
        return []
      }

      if (fieldName == null) {
        return list
      }

      if (this.$baseLodash.isEmpty(list)) {
        return list
      }

      if (!this.columns.find((item) => item.prop == fieldName)) {
        throw new Error(`Field ${fieldName}が存在していない`)
      }

      // tempIndexは割り当てが必要な要素を記録します
      let tempIndex = 0

      list[list.length - 1].rowspan = 1

      for (let j = 1; j < list.length; j++) {
        if (list[j][fieldName] !== list[tempIndex][fieldName]) {
          //tempIndexを使ってrowSpanに値を付けます
          list[tempIndex].rowspan = j - tempIndex
          tempIndex = j
        } else {
          if (j - tempIndex > 0) {
            list[j].rowspan = 0
          }
          // 最後は個別に判断する必要があります
          if (j == list.length - 1) {
            list[tempIndex].rowspan = j - tempIndex + 1
          }
        }
      }
      return list
    },

    /**
     * 行合併
     * @param {*} rowIndex 行インデックス
     * @param {*} columnIndex 列インデックス
     * @param {*} dataSource データソース
     * @param {*} mergeCfg 組み合わせ配置 :[{searchKey: 'score', columnIndex: 0 }] searchKey：プロパティ，columnIndex：べき組み合わせのカラム
     */
    mergeRows(rowIndex, columnIndex, dataSource, mergeCfg) {
      for (let item of mergeCfg) {
        let searchKey = item?.compareKey || [item.searchKey]
        if (columnIndex === item.columnIndex) {
          if (
            rowIndex !== 0 &&
            searchKey.every(
              (item) =>
                dataSource[rowIndex][item] === dataSource[rowIndex - 1][item]
            )
          ) {
            return [0, 0]
          } else {
            let rowIndexCount = rowIndex
            let count = 0
            while (rowIndexCount + 1 < dataSource.length) {
              if (
                searchKey.every(
                  (item) =>
                    dataSource[rowIndexCount + 1][item] ===
                    dataSource[rowIndexCount][item]
                )
              ) {
                rowIndexCount++
                count++
              } else {
                break
              }
            }
            return [count + 1, 1]
          }
        }
      }
    },

    /**
     *ボタン
     * */
    genSingleBtn(config) {
      const { action } = config

      if (!this.getShow(action)) {
        return null
      }

      return (
        <el-button
          type="primary"
          class="changebtn mini"
          v-permissions={action.permissions}
          disabled={
            _.isFunction(action.disabled)
              ? action.disabled.call(this)
              : action.disabled
          }
          on={{
            click: () => {
              //イベントの処理
              handleEventList(
                'click',
                {
                  page: this.page,
                  vm: this,
                },
                action
              )
            },
          }}
        >
          {action.name}
        </el-button>
      )
    },
    /**
     *ボタングループ
     */
    genBtnGroup(config) {
      const { action } = config
      return (
        <el-dropdown trigger="click">
          <el-button type="primary" class="changebtn mini">
            {action.name}
            <i class="el-icon-arrow-down"></i>
          </el-button>
          <el-dropdown-menu>
            {action.buttonList?.map((btn) => {
              let show = this.getShow(action)
              if (show) {
                return (
                  <el-dropdown-item
                    v-permissions={btn.permissions}
                    disabled={
                      _.isFunction(btn.disabled)
                        ? btn.disabled.call(this)
                        : btn.disabled
                    }
                    nativeOn={{
                      click: () => {
                        if (btn.click) {
                          btn.click.call(this, action)
                        }
                        handleEventList(
                          'click',
                          {
                            page: this.page,
                            vm: this,
                          },
                          action
                        )
                      },
                    }}
                  >
                    {_.isFunction(btn.name) ? (
                      btn.tipContent ? (
                        <el-popover
                          placement="left"
                          trigger="hover"
                          content={btn.tipContent}
                        >
                          <span slot="reference">{btn.name.call(this)}</span>
                        </el-popover>
                      ) : (
                        btn.name.call(this)
                      )
                    ) : btn.tipContent ? (
                      <el-popover
                        placement="left"
                        trigger="hover"
                        content={btn.tipContent}
                      >
                        <span slot="reference">{btn.name}</span>
                      </el-popover>
                    ) : (
                      btn.name
                    )}
                  </el-dropdown-item>
                )
              }
            })}
          </el-dropdown-menu>
        </el-dropdown>
      )
    },

    buildNavTool() {
      var that = this
      const navbarSlot = this.$scopedSlots.navbar
      const data = { tableData: that.tableData }
      let navtool = null
      navtool = (
        <vab-box-area>
          <vab-box-area-left-panel span={that.leftPanelSpan}>
            {that.genActionBtn({
              actions: that.navButtons,
            })}
          </vab-box-area-left-panel>
          <vab-box-area-right-panel span={that.rightPanelSpan}>
            {navbarSlot ? navbarSlot(data) : ''}
          </vab-box-area-right-panel>
        </vab-box-area>
      )
      return navtool
    },
  },
}
