<script>
  import _ from 'lodash'
  import mixins from './mixins'
  import addEventListener from '@/utils/addEventListener'
  import enumList from '@/vab/constants/datasource'
  export default {
    name: 'VSelect',
    mixins: [mixins],

    data() {
      return {
        dataSource: [],
        list: [],
      }
    },

    computed: {
      effect: {
        get: function () {
          if (this.config.refProp) {
            return this.$baseLodash.get(
              this.pageComponent.form,
              this.config.refProp
            )
          }
          return null
        },
      },
    },

    watch: {
      effect: {
        handler(val) {
          this.handleChange(null)
          if (this.config.refField) {
            if (!val) {
              this.localDisabled = true
            } else {
              this.localDisabled = false
            }
            this.list = this.$baseLodash.filter(this.dataSource, {
              [this.config.refField]: val,
            })
          }
        },
        immediate: true,
      },
    },
    async mounted() {
      await this.fetchData()
    },
    methods: {
      handleChange(value) {
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
      },

      async fetchData() {
        if (this.config.dataItems) {
          if (_.isFunction(this.config.dataItems)) {
            let res = await this.config.dataItems(this.row, this.config)
            this.dataSource = res
            if (this.effect) {
              this.list = this.$baseLodash.filter(this.dataSource, {
                [this.config.refField]: this.effect,
              })
            } else {
              this.list = res
            }

            //promiseをページコンポネントインスタンスに反映する
            if (this.pageComponent) {
              this.pageComponent.registerPromise(res)
            }
          } else {
            this.dataSource = this.config.dataItems
            this.list = this.config.dataItems
          }

          if (_.isObject(this.config.filter)) {
            this.dataSource = _.filter(
              this.config.dataItems,
              this.config.filter
            )
            this.list = _.filter(this.config.dataItems, this.config.filter)
          }
        } else {
          if (_.isString(this.config.filter)) {
            this.list = _.get(enumList['divisionList'], this.config.filter)
          }
        }
      },
    },
    render() {
      addEventListener(document.getElementById('app'), 'scroll', () => {
        this.$refs['select']?.blur()
      })

      let labelId = this.config?.labelId || this.labelId
      let valueId = this.config?.valueId || this.valueId

      let value = _.get(this.row, this.column.prop)
      let disabled = this.getDisabled() || this.localDisabled
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
        className = 'diff'
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
          <ElSelect
            ref="select"
            class={className}
            value={value}
            disabled={disabled}
            clearable={this.config?.clearable}
            placeholder={this.config?.placeholder}
            onClear={() => {
              this.handleChange(null)
            }}
            onChange={(value) => {
              this.handleChange(value)
            }}
          >
            {this.list.map((item) => {
              return (
                <ElOption
                  label={item[labelId]}
                  value={item[valueId]}
                  disabled={item['disabled']}
                >
                  {this.config?.template ? this.config.template(item) : null}
                </ElOption>
              )
            })}
          </ElSelect>
        </ElFormItem>
      )
    },
  }
</script>
