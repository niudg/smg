export default {
  name: 'TableSlot',
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: Object,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
    prop: {
      type: String,
      default: null,
    },
  },
  render: (h, ctx) => {
    let params = {
      tableData: ctx.injections.tableRoot.tableData,
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index,
      prop: ctx.props.prop,
    }
    if (ctx.props.column.render) {
      return ctx.props.column.render(h, params)
    } else {
      if (!ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slotScope]) {
        return
      }
      return h(
        'div',
        {},
        ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slotScope](
          params
        )
      )
    }
  },
}
