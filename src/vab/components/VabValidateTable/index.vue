<script>
  //let COLUMN_KEY_ID = 1
  import mixTable from '@/utils/mixTable'
  import editCell from './mixins/editCell.js'
  import RenderColumnVue from './components/renderColumn.vue'
  export default {
    name: 'VabValidateTable',
    components: { RenderColumnVue },
    mixins: [mixTable, editCell],
    provide() {
      return {
        tableRoot: this,
      }
    },
    inject: ['page'],
    props: {
      prop: {
        type: String,
        default: null,
      },
      rowIndex: {
        type: Number,
        default: null,
      },
      parentRow: {
        type: Object,
        default: null,
      },
      customClass: {
        type: Array,
        default: () => [''],
      },
      rowClassName: {
        type: [String, Function],
        default: null,
      },
      highlightCurrentRow: {
        type: Boolean,
        default: true,
      },
      maxHeight: {
        type: [Number, String],
        default: null,
      },
    },
    computed: {
      eListeners() {
        return {
          'cell-click': this.cellClick,
        }
      },
    },
    methods: {
      setCurrentRow(rowIndex) {
        this.$refs.table.setCurrentRow(this.dataSource[rowIndex])
      },

      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (!this.$baseLodash.isEmpty(this.mergeCfg)) {
          return this.mergeRows(
            rowIndex,
            columnIndex,
            this.dataSource,
            this.mergeCfg
          )
        } else {
          let arr = this.$baseLodash.isArray(this.spanColIndex)
            ? this.spanColIndex
            : [this.spanColIndex]
          if (arr.indexOf(columnIndex) !== -1) {
            if (column.rowSpan !== 0) {
              return {
                rowspan: row.rowspan,
                colspan: 1,
              }
            }
            return {
              rowspan: 0,
              colspan: 0,
            }
          }
        }
      },

      rowStyle_({ row, rowIndex }) {
        Object.defineProperty(row, 'rowIndex', {
          value: rowIndex,
          writable: true,
          enumerable: false,
        })
        return this.rowStyle
          ? this.rowStyle.call(null, {
              row,
              rowIndex,
            })
          : null
      },

      cellClassName_({ row, column, rowIndex, columnIndex }) {
        let cellName = this.cellClassName
          ? this.cellClassName.call(null, {
              row,
              column,
              rowIndex,
              columnIndex,
            })
          : ''
        if (this.isEditCell(row, column)) {
          cellName += ' edit-cell'
          if (this.editX === row.rowIndex && this.editY === column.property) {
            cellName += ' edit-active'
          }
        }
        return cellName
      },

      cancelEdit() {
        this.editX = null
        this.editY = null
      },

      toggleRowExpansion(row, expanded) {
        this.$refs.table.toggleRowExpansion(row, expanded)
      },
    },

    render() {
      const that = this
      // if (this.tableData && this.tableData.length > 0) {
      //   this.dataSource = this.tableData
      // }
      return (
        <div
          class={`vue-jsx-table-wrapper vab-validate-table ${that.customClass} `}
        >
          {that.buildNavTool()}
          <el-table
            highlight-current-row={this.highlightCurrentRow}
            data={this.dataSource}
            empty-text={this.$t(
              `validateMessage.${this.$messageCode.E00000104.name}`
            )}
            show-summary={this.showSummary}
            summary-method={this.getSummaries}
            row-class-name={this.rowClassName}
            row-style={this.rowStyle_}
            cell-class-name={this.cellClassName_}
            max-height={this.maxHeight}
            ref="table"
            row-key={this.rowKey}
            {...{
              props: this.$attrs,
              on: { ...this.$listeners, ...this.eListeners },
            }}
            span-method={
              this.spanColIndex == null && this.mergeCfg == null
                ? null
                : this.objectSpanMethod
            }
          >
            {this.sortedColumns.map((item) => {
              let hidden = false
              if (this.$baseLodash.has(item, 'hidden')) {
                hidden = item.hidden
              }
              if (this.$baseLodash.isFunction(item?.hidden)) {
                hidden = item.hidden()
              }
              if (!hidden) {
                //配置をマージする
                let columnConfig = Object.assign(
                  {},
                  item.type == 'actions'
                    ? that.actionCenterColumn
                    : that.defaultColumnConfig,
                  item
                )
                return <RenderColumnVue column={columnConfig} />
              }
            })}
          </el-table>
        </div>
      )
    },
  }
</script>

<style lang="scss" scoped>
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
  .vue-jsx-table-wrapper {
    position: relative;

    .el-table ::v-deep {
      .is-error {
        .el-form-item__error {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%;
        }
      }

      .diff-origin {
        background-color: #d6eeee !important;
      }
    }
    ::v-deep .diff .el-input__inner {
      background-color: #e4acc4 !important;
      color: #fff !important;
      &::-webkit-input-placeholder {
        color: #fff !important;
      }
    }

    ::v-deep {
      .chagne_btn {
        font-size: 13px;
        font-weight: 500;
        margin-right: 8px;
        // &:hover {
        //   background: #0071ee !important;
        //   border-color: #0071ee !important;
        // }
      }

      .chagne_btn.is-plain {
        .btnname {
          padding-left: 0px;
        }
        &.is-disabled {
          color: #a1a1a1;
          background: #efefef;
          border-color: #cecece !important;
          &:hover {
            color: #a1a1a1 !important;
            background: #efefef !important;
            border-color: #cecece !important;
          }
        }
      }
    }
  }
</style>
