<script>
  import TableSlot from './slot'
  import { formatCell } from '@/utils/index'
  import mixins from './mixins'
  import _ from 'lodash'
  import VLabel from './vLabel.vue'
  import VInput from './vInput.vue'
  import VCheckbox from './vCheckbox.vue'
  import VDatepicker from './vDatePick.vue'
  import VDatetimepicker from './vDateTimePick.vue'
  import VTimepicker from './vTimePick.vue'
  import VBtnInput from './vBtnInput.vue'
  import VSelect from './vSelect.vue'

  export default {
    name: 'RenderColumn',
    components: { TableSlot },
    mixins: [mixins],
    inject: ['tableRoot', 'page'],
    props: {
      column: {
        type: Object,
        default: () => {},
      },
    },

    methods: {},

    render(h) {
      const that = this
      const editComponents = {
        label: (params) => h(VLabel, { props: params }),
        // h(
        //   'div',
        //   { class: params.config?.type == 'number' ? 'number' : null },
        //   params.config?.format
        //     ? this.numeral(_.get(params.row, params.column.prop)).format(
        //         params.config?.format
        //       )
        //     : _.get(params.row, params.column.prop)
        // ),
        input: (params) => h(VInput, { props: params }),
        select: (params) => h(VSelect, { props: params }),
        date: (params) => h(VDatepicker, { props: params }),
        datetime: (params) => h(VDatetimepicker, { props: params }),
        time: (params) => h(VTimepicker, { props: params }),
        checkbox: (params) => h(VCheckbox, { props: params }),
        btnInput: (params) => h(VBtnInput, { props: params }),
      }

      /**
       * 編集できる
       */
      function genEditTypeRender(col) {
        let config = column.config()
        let headerSlot = null
        if (column.required) {
          headerSlot = ({ column }) => {
            return <span class="required">{column.label}</span>
          }
        } else {
          if (config.headerSlot) {
            headerSlot = ({ column, $index }) => {
              return config.headerSlot.call(this, column, $index)
            }
          }
        }

        let defalutSlot = ({ row, column, $index }) => {
          let isCan = !that.getDisabled()

          if (isCan) {
            that.tableRoot.setEditMap({
              x: $index,
              y: col.prop,
            })
          }

          if (
            isCan &&
            that.tableRoot.editX === row.rowIndex &&
            that.tableRoot.editY === column.property
          ) {
            let rules = config.rules
            let prop = `${that.tableRoot.prop}.${$index}.${column.property}`
            return (
              <p>
                {showDay(row)}
                {editComponents[config.editType]({
                  prop: prop,
                  row: row,
                  config: config,
                  column: col,
                  rules: rules,
                })}
              </p>
            )
          } else {
            let value =
              col.formatter && typeof col.formatter === 'function'
                ? col.formatter(_.get(row, col.prop), row, column)
                : formatCell(_.get(row, col.prop), config.type, config.format)

            return (
              <p>
                {showDay(row)}
                <div class="edit-type">{value}</div>
              </p>
            )
          }
        }

        let showDay = (row) => {
          if (config.showTime) {
            let day = _.get(row, config.showTime)
            return <div class="day">{day}</div>
          }
        }
        return (
          <el-table-column
            label={column.label}
            prop={column.prop}
            width={column.width}
            min-width={column['min-width']}
            fixed={column.fixed}
            sortable={column.sortable}
            align={column.align}
            header-align={column.headerAlign ? column.headerAlign : 'left'}
            selectable={column.selectable}
            class-name={column.className}
            show-overflow-tooltip
            key={column.prop}
            scopedSlots={{
              default: defalutSlot,
              header: headerSlot,
            }}
          ></el-table-column>
        )
      }

      // 自定义渲染
      function genCustomRender(column) {
        let config = column.config()
        let defalutSlot = ({ row, $index }) => {
          let rules = config.rules
          let prop = `${that.tableRoot.prop}.${$index}.${column.prop}`

          let ctrl = null
          if (_.isFunction(config.ctrl)) {
            ctrl = config.ctrl(row)
          } else {
            ctrl = config.ctrl
          }

          if (editComponents[ctrl]) {
            return editComponents[ctrl]({
              prop: prop,
              row: row,
              config: config,
              column: column,
              rules: rules,
            })
          }
          // return
        }

        let headerSlot = null
        if (column.required) {
          headerSlot = ({ column }) => {
            return <span class="required">{column.label}</span>
          }
        } else {
          if (config.headerSlot) {
            headerSlot = ({ column, $index }) => {
              return config.headerSlot.call(this, column, $index)
            }
          } else {
            headerSlot = ({ column }) => {
              let result = config.tipContent ? (
                <el-popover
                  placement="top-start"
                  trigger="hover"
                  content={config.tipContent}
                >
                  <span slot="reference">
                    <vab-icon
                      icon="information-line"
                      style="margin-right:5px"
                    />
                    {column.label}
                  </span>
                </el-popover>
              ) : (
                column.label
              )
              return result
            }
          }
        }

        return (
          <el-table-column
            label={column.label}
            prop={column.prop}
            width={column.width}
            min-width={column['min-width']}
            fixed={column.fixed}
            align={column.align}
            header-align={column.headerAlign ? column.headerAlign : 'left'}
            scopedSlots={{
              default: defalutSlot,
              header: headerSlot,
            }}
          ></el-table-column>
        )
      }

      //   插槽
      function genSlot(column) {
        let headerSlot = null
        let required = false
        let config = null
        if (that.$baseLodash.isFunction(column.required)) {
          required = column.required.call(that)
        } else {
          required = column.required
        }

        if (required) {
          headerSlot = ({ column }) => {
            return <span class="required">{column.label}</span>
          }
        } else {
          if (_.has(column, 'config')) {
            config = column.config()
            if (config.headerSlot) {
              headerSlot = ({ column, $index }) => {
                return config.headerSlot.call(this, column, $index)
              }
            }
          }
        }
        return (
          <el-table-column
            label={column.label}
            prop={column.prop}
            width={column.width}
            min-width={column['min-width']}
            fixed={column.fixed}
            sortable={column.sortable}
            align={column.align}
            header-align={column.headerAlign ? column.headerAlign : 'left'}
            scopedSlots={{
              default: ({ row, $index }) => {
                let prop = `${that.tableRoot.prop}.${$index}.${column.prop}`
                return (
                  <table-slot
                    row={row}
                    column={column}
                    index={$index}
                    prop={prop}
                    parent={that}
                  ></table-slot>
                )
              },
              header: headerSlot,
            }}
          ></el-table-column>
        )
      }

      function genExpand(column) {
        return (
          <el-table-column
            label={column.label}
            type="expand"
            fixed={column.fixed}
            scopedSlots={{
              default: ({ row, $index }) => {
                if (column.render) {
                  return column.render(row, column, $index)
                } else {
                  return (
                    <table-slot
                      row={row}
                      column={column}
                      index={$index}
                    ></table-slot>
                  )
                }
              },
            }}
          ></el-table-column>
        )
      }

      function genCommonColumn(column) {
        let headerSlot = null
        if (column.required) {
          headerSlot = ({ column }) => {
            return <span class="required">{column.label}</span>
          }
        }
        return (
          <el-table-column
            label={column.label}
            prop={column.prop}
            type={column.type}
            width={column.width}
            min-width={column['min-width']}
            fixed={column.fixed}
            sortable={column.sortable}
            align={column.align}
            header-align={column.headerAlign ? column.headerAlign : 'left'}
            selectable={column.selectable}
            class-name={column.className}
            formatter={
              column.formatter
                ? column.formatter
                : (row, col, cellValue) => {
                    let config = { type: null, format: null }
                    if (_.isFunction(column.config)) {
                      config = column.config()
                    }
                    return formatCell(cellValue, config.type, config.format)
                  }
            }
            scopedSlots={{
              header: headerSlot,
            }}
            show-overflow-tooltip
          ></el-table-column>
        )
      }

      function genChildrenColumn(column) {
        return (
          <el-table-column align={column.align} label={column.label}>
            {column.children.map((item) => {
              let columnConfig = Object.assign(
                {},
                that.tableRoot.defaultColumnConfig,
                item
              )
              let hidden = false
              if (that.$baseLodash.has(item, 'hidden')) {
                hidden = item.hidden
              }

              if (that.$baseLodash.isFunction(item?.show)) {
                hidden = !item.show.call(that)
              }
              if (!hidden) {
                return renderColumn(columnConfig)
              }
            })}
          </el-table-column>
        )
      }

      function genActionsColumn(column) {
        //let disabled = that.getDisabled()
        return (
          <el-table-column
            label={column.label}
            prop={column.prop}
            type={column.type}
            width={column.width}
            min-width={column['min-width']}
            fixed={column.fixed}
            align={column.align}
            header-align={column.headerAlign ? column.headerAlign : 'left'}
            scopedSlots={{
              default: ({ row, $index }) => {
                let prop = that.tableRoot.prop
                  ? `${that.tableRoot.prop}.${$index}`
                  : null
                let actions = column.actionsList
                return that.genActionBtn({
                  row,
                  $index,
                  prop,
                  column,
                  actions,
                })
              },
            }}
          ></el-table-column>
        )
      }

      function renderColumn(column) {
        if (column.type === 'expand') {
          return genExpand(column)
        }

        if (column.type === 'actions') {
          return genActionsColumn(column)
        }

        if (column.slotScope) {
          return genSlot(column)
        }

        if (column.config && column.config().editType) {
          return genEditTypeRender(column)
        }

        if (column.config && column.config().ctrl) {
          return genCustomRender(column)
        }

        if (column.children) {
          return genChildrenColumn(column)
        }

        return genCommonColumn(column)
      }

      const column = this.column
      return renderColumn(column)
    },
  }
</script>
<style>
  .required::before {
    content: '*';
    color: #ff4d4f;
    margin-right: 4px;
  }
  .edit-type {
    height: 40px;
    line-height: 40px;
  }
  .day {
    position: absolute;
    left: 4px;
    top: 4px;
  }

  .el-dropdown {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
