<script>
  import _ from 'lodash'
  import mixins from './mixins'
  import { formatCurrency } from '@/utils/index'
  let numeral = require('numeral')
  export default {
    name: 'VInput',
    mixins: [mixins],
    render() {
      let disabled = this.getDisabled()
      let value = _.get(this.row, this.column.prop)
      let format = this.config.format
      let className = ''
      let negative = this.config.negative ?? false
      //let zero = this.config.zero ?? false
      if (this.config.type == 'number') {
        className = 'number'
        format = format ?? '0,0'
        if (_.isNumber(value)) {
          value = numeral(value).format(format)
        }
      }
      if (this.config.type == 'float') {
        className = 'number'
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
          <ElInput
            ref="input"
            v-specialChar
            class={className}
            value={value}
            disabled={disabled}
            maxlength={this.config.maxlength}
            onInput={(v) => {
              let val = v
              if (val) {
                if (this.config.type == 'number') {
                  //負の数の場合
                  if (negative) {
                    val = val.replace(/[^\d+-]/g, '')
                    val = val
                      .replace('-', '$#$')
                      .replace(/-/g, '')
                      .replace('$#$', '-')
                  } else {
                    val = val.replace(/\D/g, '')
                  }

                  if (this.config.maxlength) {
                    if (Number(val)) {
                      val = numeral(val).format((format = format ?? '0,0'))
                    }
                    //substring
                    if (val.length > this.config.maxlength) {
                      val = _.trim(val.slice(0, this.config.maxlength), ',')
                    }
                  }
                  if (val != '-') {
                    val = numeral(val).value()
                    val = _.toInteger(val)
                  }
                }
                if (this.config.type == 'float') {
                  val = val.replace(/[^\d.]/g, '')
                  val = val.replace(/^\./g, '')
                  val = val
                    .replace('.', '$#$')
                    .replace(/\./g, '')
                    .replace('$#$', '.')

                  let n = this.config.precision || 1
                  var d = new Array(Number(n)).fill(`\\d`).join('')
                  var reg = new RegExp(`^(\\-)*(\\d+)\\.(${d}).*$`, 'ig')
                  val = val.replace(reg, '$1$2.$3')
                }
              } else {
                val = null
              }
              _.set(this.row, this.column.prop, val)
            }}
            onBlur={(e) => {
              let val = e.target.value
              if (val) {
                if (this.config.type == 'number') {
                  if (negative) {
                    val = val.replace(/[^\d+-]/g, '')
                    val = val
                      .replace('-', '$#$')
                      .replace(/-/g, '')
                      .replace('$#$', '-')
                  } else {
                    val = val.replace(/\D/g, '')
                  }

                  if (val != '-') {
                    val = numeral(val).value()
                    val = _.toInteger(val)
                  }
                }
                if (this.config.type == 'float') {
                  e.target.value = formatCurrency(val)
                }
              } else {
                val = null
              }

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
