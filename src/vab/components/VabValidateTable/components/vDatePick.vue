<script>
  import _ from 'lodash'
  import mixins from './mixins'
  import mixinDate from '@/utils/mixinDatePicker'
  export default {
    name: 'VDatePicker',
    mixins: [mixins, mixinDate],
    data() {
      return {}
    },

    render() {
      let disabled = this.getDisabled()
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
          <ElDatePicker
            class={
              this.config.type
                ? `${this.config.type} date-picker-icon`
                : 'date-picker-icon'
            }
            type="date"
            disabled={disabled}
            value={_.get(this.row, this.column.prop)}
            valueFormat={this.valueFormat}
            format={this.displayFormat}
            {...{
              nativeOn: {
                mouseenter: (e) => {
                  e.target.children.forEach((item) => {
                    let valueTemp =
                      _.get(this.row, this.column.prop) == '' ||
                      _.get(this.row, this.column.prop) == null
                    if (!valueTemp && !disabled) {
                      if (item.className == 'el-input__prefix') {
                        item.style.display = 'none'
                      }
                    }
                  })
                },
                mouseleave: (e) => {
                  e.target.children.forEach((item) => {
                    if (item.className == 'el-input__prefix') {
                      item.style.display = 'flex'
                    }
                  })
                },
              },
            }}
            onInput={(value) => {
              _.set(this.row, this.column.prop, value)
              if (this.config.onInput) {
                this.config.onInput(
                  this.tableRoot.tableData,
                  this.row,
                  this.column,
                  this.prop.split('.'),
                  value,
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
<style lang="scss" scoped>
  .date-picker-icon {
    width: 100%;
    &.date-close {
      ::v-deep {
        .el-input__prefix {
          display: none !important;
        }
      }
      .el-icon-date {
        display: none;
      }
    }
    ::v-deep {
      .el-input__inner {
        padding-right: 25px !important;
        padding-left: 12px !important;
      }

      .el-input__prefix {
        right: 5px;
        left: initial;
      }
    }
  }
</style>
