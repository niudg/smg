<script>
  import _ from 'lodash'
  import mixins from './mixins'
  import mixinDate from '@/utils/mixinTimePicker'
  export default {
    name: 'VDatePicker',
    mixins: [mixins, mixinDate],
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
          <ElTimePicker
            class={['date-picker-icon', this.iconTemp ? 'date-close' : '']}
            disabled={disabled}
            value={_.get(this.row, this.column.prop)}
            valueFormat={this.valueFormat}
            format={this.displayFormat}
            autocomplete="off"
            picker-options={this.pickerOptions}
            {...{
              nativeOn: {
                mouseover: () => this.setDateIcon,
                mouseleave: () => (this.iconTemp = false),
              },
            }}
            onInput={(value) => {
              _.set(this.row, this.column.prop, value)
              if (this.config.onChange) {
                this.config.onChange(
                  this.tableRoot.tableData,
                  this.row,
                  this.column,
                  this.prop.split('.'),
                  value,
                  this
                )
              }
              //this.focusInput()
            }}
            //onFocus={this.focusInput}
          />
        </ElFormItem>
      )
    },
  }
</script>
<style lang="scss" scoped>
  .lable-hidden {
    ::v-deep {
      .el-form-item__label {
        display: none;
        width: 0px !important;
      }
      .el-form-item__content {
        margin-left: 0px !important;
      }
    }
  }
  .date-picker-icon {
    width: 90px !important;

    ::v-deep {
      .el-input__prefix {
        padding-left: 0px !important;
      }
      .el-input__inner {
        padding: 5px !important;
        text-align: left !important;
        font-size: 14px;
        font-weight: 400;
      }
    }
    .el-icon-date {
      display: none;
    }
  }
</style>
