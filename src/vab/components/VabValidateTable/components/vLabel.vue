<script>
  import _ from 'lodash'
  import mixins from './mixins'
  let numeral = require('numeral')
  export default {
    name: 'VLabel',
    mixins: [mixins],
    render() {
      let value = _.get(this.row, this.column.prop)
      let format = this.config.format
      let className = ''
      //let zero = this.config.zero ?? false
      if (this.config.type == 'number') {
        className = 'number'
        format = format ?? '0,0'
        value = numeral(value).format(format)
      }
      if (this.config.type == 'float') {
        className = 'number'
        value = numeral(value).format(format)
      }

      if (
        this.config.diff &&
        this.config.diff(
          this.tableRoot.tableData,
          this.row,
          this.column,
          this.prop.split('.'),
          value
        )
      ) {
        className += ' diff'
      }

      return (
        <ElFormItem
          prop={this.prop}
          rules={this.explainValidate()}
          label-width="0"
          scopedSlots={{
            error: (error) => {
              return (
                <el-tooltip
                  class="item"
                  effect="dark"
                  content={error.error}
                  placement="left"
                >
                  <div class="el-form-item__error">{error.error}</div>
                </el-tooltip>
              )
            },
          }}
        >
          <div class={className}>{value}</div>
        </ElFormItem>
      )
    },
  }
</script>
