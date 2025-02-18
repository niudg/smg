<script>
  import _ from 'lodash'
  import mixins from './mixins'
  import { checkEnumFlag } from '@/utils/validate'
  export default {
    name: 'VCheckbox',
    mixins: [mixins],
    data() {
      return {}
    },

    render() {
      let disabled = this.getDisabled()
      let val = _.get(this.row, this.column.prop)
      val = checkEnumFlag(val)
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
          <ElCheckbox
            disabled={disabled}
            value={val}
            onChange={(value) => {
              let val = value
              if (this.config.codeEnum) {
                if (value) {
                  val = this.config.codeEnum.enum_1.value
                } else {
                  if (this.$baseLodash.has(this.config.codeEnum, 'enum_0')) {
                    val = this.config.codeEnum.enum_0.value
                  }
                  if (this.$baseLodash.has(this.config.codeEnum, 'enum_9')) {
                    val = this.config.codeEnum.enum_9.value
                  }
                  if (
                    this.$baseLodash.has(this.config.codeEnum, 'enum_blank')
                  ) {
                    val = this.config.codeEnum.enum_blank.value
                  }
                }
              }
              _.set(this.row, this.column.prop, val)
              if (this.config.onChange) {
                this.config.onChange(
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
