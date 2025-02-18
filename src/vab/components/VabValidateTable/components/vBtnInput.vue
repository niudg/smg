<script>
  import _ from 'lodash'
  import mixins from './mixins'
  export default {
    name: 'VBtnInput',
    mixins: [mixins],
    render() {
      let disabled = this.getDisabled()
      let value = _.get(this.row, this.column.prop)
      let className = ''
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
          label-width={this.config['label-width'] ?? '100px'}
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
          <template slot="label">
            <ElButton
              type="primary"
              disabled={disabled}
              onClick={() => {
                if (this.config.onClick) {
                  this.config.onClick(
                    this.tableRoot.tableData,
                    this.row,
                    this.column,
                    this.prop.split('.'),
                    this
                  )
                }
              }}
            >
              {this.config.btnName}
            </ElButton>
          </template>
          <ElInput
            ref="input"
            v-specialChar
            class={className}
            value={value}
            disabled={disabled || this.config.selectOnly}
            maxlength={this.config.maxlength}
            onInput={(v) => {
              let val = v
              _.set(this.row, this.column.prop, val)
            }}
            onBlur={(e) => {
              let val = e.target.value
              if (this.config.onInput) {
                this.config.onInput(
                  this.tableRoot.tableData,
                  this.row,
                  this.column,
                  this.prop.split('.'),
                  val,
                  this
                )
              }
            }}
          />
        </ElFormItem>
      )
    },
  }
</script>
