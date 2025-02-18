import Vue from 'vue'
import { getData } from '@/utils/dataSync'
import { getEnumText, valueModifies } from '@/utils/index'
import { convertToRules } from '@/utils/validate'
import { getPropByPath } from 'element-ui/src/utils/util'
import _ from 'lodash'
let numeral = require('numeral')
export default {
  inject: {
    pageComponent: {
      default: '',
    },
  },
  props: {
    validate: {
      type: String,
      default: null,
    },
    dataType: {
      type: String,
      default: 'server',
    },
    dataKey: {
      type: String,
      default: 'divisionList',
    },
    dataItems: {
      type: Array,
      default: null,
    },
    requestParam: {
      type: Object,
      default: () => ({}),
    },
    labelClass: {
      type: String,
      default: '',
    },
    valueId: {
      type: [String, Number],
      default: 'value',
    },
    labelId: {
      type: [String, Number],
      default: 'text',
    },
    filter: {
      type: [String, Object],
      default: null,
    },
    sortBy: {
      type: String,
      default: null,
    },
    enableCache: {
      type: Boolean,
      default: false,
    },
    resultType: {
      type: String,
      default: 'Array',
    },
    startDateProp: {
      type: String,
      default: null,
    },
    endDateProp: {
      type: String,
      default: null,
    },
    enableSameDate: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: '',
    },
    labelShow: {
      type: Boolean,
      default: true,
    },
    nullable: {
      type: Boolean,
      default: false,
    },
    codeEnum: {
      type: Object,
      default: null,
    },
    modelModifiers: {
      type: Object,
      default: () => ({}),
    },
    selectValue: {
      type: [String, Number],
    },
    directive: {
      type: Boolean,
      default: false,
    },
    showAfter: {
      type: String,
      default: null,
    },
    textEllipsis: {
      type: Boolean,
      default: false,
    },
    unForm: {
      type: Boolean,
      default: false,
    },

    //message
    tipContent: {
      type: String,
      default: '',
    },

    rowItem: {
      type: Object,
      default: () => {},
    },
    workYmDate: {
      type: [String, Number],
      default: null,
    },
    minDate: {
      type: [String, Number],
      default: null,
    },
    maxDate: {
      type: [String, Number],
      default: null,
    },
    dateType: {
      type: String,
      default: '',
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },

    defaultValue: {
      type: Date,
      default: () => {
        return new Date()
      },
    },
    skipDisabled: {
      type: Boolean,
      default: false,
    },
    cancelRadio: {
      type: Boolean,
      default: false,
    },
    valueFormatSss: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    //画面のFROMを取得する
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'ElForm') {
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
    //非活性の設置
    disabled() {
      if (this.localDisabled) {
        return true
      }

      if (_.has(this.$attrs, 'disabled')) {
        if (
          _.get(this.$attrs, 'disabled') === true ||
          _.get(this.$attrs, 'disabled') === ''
        ) {
          return true
        }
      }
      return false
    },

    propsValue() {
      if (this.$attrs.prop) {
        var props = this.$attrs.prop.split(',')
        if (props.length > 1) {
          return props
            .map((propAttr) => _.get(this.form.model, propAttr))
            .join('|')
        }
      }
      return _.get(this.form.model, this.$attrs.prop)
    },

    explainBooleanRule() {
      return (rule) => {
        return rule[this.$route?.query?.type || 'create'] || false
      }
    },
  },
  data() {
    return {
      innerValue: null,
      innerValues: [],
      dataSource: [],
      type: null,
      trigger: 'blur',
      localDisabled: false,
    }
  },

  watch: {
    'form.model': {
      handler() {
        if (this.$attrs.prop) {
          this.createModel()
        }
      },
      immediate: true,
    },
    dataItems: {
      handler(newVal) {
        this.fillList(newVal)
      },
    },
    propsValue: {
      handler(val) {
        if (Array.isArray(val)) {
          this.innerValues = val
        } else {
          this.setInnerValue(val)
        }
      },
      deep: true,
      immediate: true,
    },

    /**
     * 検証規則変わるの場合
     * @param {*} newValue
     * @param {*} oldValue
     */
    validate(newValue, oldValue) {
      if (newValue != oldValue) {
        this.resetValidate(newValue)
      }
    },
  },
  beforeMount() {
    let vm = this
    let prop = this.$attrs.prop
    //照会の場合
    if (this.$const.viewMode.includes(this.$route?.query.type)) {
      if (_.has(this.form.rules, prop)) {
        this.$delete(this.form.rules, prop)
        this.form.clearValidate(prop)
      }
      return
    }
    if (this.validate) {
      let label = this.$attrs.label
      let labelError = this.$attrs['label-error']
      let type = this.type
      if (this.form.rules) {
        const { rules } = convertToRules(
          this.validate,
          labelError || label,
          type,
          vm.trigger
        )
        this.$set(
          this.form.rules,
          prop,
          _.concat(this.form.rules[prop] || [], rules)
        )
      }
    }
  },
  mounted() {
    if (
      this.$const.viewMode.includes(this.$route?.query.type) &&
      !this.skipDisabled
    ) {
      this.localDisabled = true
    }
  },
  created() {
    this.$baseEventBus.$on('ComponentReset', this.handleFieldReset)
    this.$on('fieldReset', this.handleFieldReset)
  },
  methods: {
    validateField(cb) {
      this.$children[0].validate('', cb)
    },
    resetField() {
      this.$children[0].resetField()
    },
    clearValidate() {
      this.$children[0].clearValidate()
    },

    resetValidate(validate) {
      let prop = this.$attrs.prop
      let label = this.$attrs.label
      let labelError = this.$attrs['label-error']
      let type = this.type

      if (!validate) {
        this.$delete(this.form.rules, prop)
        this.form.clearValidate(prop)
      } else {
        const { keys, rules } = convertToRules(
          validate,
          label || labelError,
          type,
          this.trigger
        )
        if (!_.isEmpty(this.form.rules[prop])) {
          keys.forEach((key) => {
            let index = this.form.rules[prop].findIndex((rule) =>
              Object.keys(rule).find((ruleKey) => ruleKey == key)
            )
            if (index > -1) {
              this.$delete(this.form.rules[prop], index)
            }
          })
        }

        if (!_.isEmpty(rules)) {
          this.$set(this.form.rules, prop, rules)
        }
      }
    },

    setInnerValue(val) {
      if (this.$attrs['min'] && !val) {
        val = this.$attrs['min']
      }

      //フォーマットがある場合、numeralをフォーマットする
      if (this.$attrs.type == 'number') {
        this.className = 'number'
        let format = this.$attrs.format ?? '0,0'
        // if (Number(val) != 0) {

        // }
        if (val != null) {
          let zero = this.$attrs.zero ?? true
          if (zero) {
            val = numeral(val).format(format)
          } else {
            val = val.toString()
          }
        }
      }
      if (this.$attrs.format == 'enum') {
        val = getEnumText(val, this.codeEnum)
      }
      // if (this.type == 'boolean' || this.$attrs.type == 'boolean') {
      //   console.info(this.$attrs.prop)
      //   val = checkEnumFlag(val)
      // }

      if (this.type == 'time') {
        val = this.formatTimeMsel(val, 'HH:mm')
      }
      if (this.type == 'dayTime') {
        val = this.formatDayTime(val)
      }

      if (this.type == 'boolean') {
        if (this.codeEnum) {
          val = this.checkEnumFlag(val)
        }
      }
      if (this.$attrs.type == 'dateSelect') {
        if (this.$baseLodash.isUndefined(val)) {
          return
        }
      }

      if (this.innerValue === val) {
        return
      }
      //this.setValue(val)
      this.innerValue = val
    },

    fetchData() {
      if (this.dataItems) {
        this.dataSource = this.dataItems || []
        this.fillList(this.dataSource)
      } else {
        let key =
          this.dataType == 'local' ? this.dataKey : `/${this.dataKey}/found`
        var promise = getData({
          enableCache: this.enableCache,
          key: key,
          dataType: this.dataType,
          requestParam: this.requestParam,
        }).then((res) => {
          let list = null
          if (_.has(res, 'list')) {
            list = res.list
          } else {
            list = res
          }
          if (_.isString(this.filter)) {
            list = _.get(list, this.filter)
          }
          if (_.isObject(this.filter)) {
            list = _.filter(list, this.filter)
          }
          if (list) {
            this.dataSource = list
            this.fillList(list)
          }

          return list
        })
        //promiseをページコンポネントインスタンスに反映する
        if (this.pageComponent) {
          this.pageComponent.registerPromise(promise)
        }
      }
    },
    fillList(list) {
      if (this.labelList) {
        this.labelList = []
        list.forEach((res) => {
          this.labelList.push(res[this.labelId])
          this.labelMap[res[this.labelId]] = res[this.valueId]
          this.valueMap[res[this.valueId]] = res[this.labelId]
          if (!_.isEmpty(this.innerValues)) {
            this.setValue(this.innerValues)
          }
          if (!_.isEmpty(this.innerValue)) {
            this.setValue(this.innerValue)
          }
        })
      }
    },

    setPropItem(propPath) {
      let model = { ...this.form.model }
      let prop = propPath.split('.')[0]
      _.set(model, propPath, null)

      let origin = null
      if (_.isPlainObject(model[prop])) {
        origin = Vue.observable({ ...model[prop] })
      } else {
        origin = model[prop]
      }
      this.$set(this.form.model, prop, origin)
    },

    createModel() {
      if (this.$attrs.prop && !_.has(this.form.model, this.$attrs.prop)) {
        this.$attrs.prop
          .split(',')
          .forEach((propPath) => this.setPropItem(propPath))
      }
    },
    setModel(value, propAttr = this.$attrs.prop) {
      if (this.form && propAttr) {
        let prop = getPropByPath(this.form.model, propAttr, true)
        if (this.$attrs.type == 'number') {
          if (value) {
            let negative = this.$attrs.negative ?? false
            //負の数の場合
            if (negative) {
              value = value.replace(/[^\d+-]/g, '')
              value = value
                .replace('-', '$#$')
                .replace(/-/g, '')
                .replace('$#$', '-')
            } else {
              value = value.replace(/\D/g, '')
            }
          }
          value =
            !_.isNull(value) && !_.isEmpty(value) && !_.isNaN(value)
              ? numeral(value).value()
              : null
        }
        let tmpModifiers = this.modelModifiers
        if (this.type == 'boolean') {
          tmpModifiers['boolean'] = true
        }

        value = valueModifies(tmpModifiers, value)
        // if (value == '') {
        //   value = null
        // }
        //prop.o[prop.k] = valueModifies(tmpModifiers, value)
        this.$set(prop.o, prop.k, value)
        // const ob = prop.o.__ob__
        // if (ob) {
        //   ob.dep.notify()
        // }
      }
      this.$emit('change', value)
    },
    handleChange(val) {
      if (this.$attrs.prop) {
        if (this.$attrs.prop?.indexOf(',') !== -1) {
          this.$attrs.prop.split(',').forEach((propAttr, index) => {
            this.setModel(val ? val.split('|')[index] : null, propAttr)
          })
        } else {
          this.setModel(val)
        }
      }
      this.$emit('change', { page: this.page, vm: this })
      this.$emit('update:selectValue', val)
    },
    handleFocus(value) {
      this.$emit('focus', value)
      this.$emit('update:selectValue', value)
    },
    handleBlur(val) {
      if (this.$attrs.type == 'number') {
        let val = this.innerValue || ''
        let negative = this.$attrs.negative ?? false
        //負の数の場合
        if (negative) {
          val = val.replace(/[^\d+-]/g, '')
          val = val.replace('-', '$#$').replace(/-/g, '').replace('$#$', '-')
        } else {
          val = val.replace(/\D/g, '')
        }
        let format = this.$attrs.format ?? '0,0'
        let zero = this.$attrs.zero ?? true
        if (zero && !_.isNull(val) && !_.isEmpty(val) && !_.isNaN(val)) {
          this.innerValue = this.numeral(val).format(format)
        } else {
          this.innerValue = val.replace(/^0+/g, '')
        }
        if (this.$attrs.maxlength) {
          //substring
          if (
            this.innerValue &&
            this.innerValue.length > this.$attrs.maxlength
          ) {
            this.innerValue = _.trim(
              this.innerValue.slice(0, this.$attrs.maxlength),
              ','
            )
            this.setModel(this.innerValue)
          }
        }
      }
      this.$emit('blur', val)
    },
    handleFieldReset() {
      if (!this.localDisabled) {
        this.innerValue = null
        this.innerValues = null
        this.setModel(null)
      }
    },

    changeRowData(setRowItem) {
      if (this.rowItem) {
        setRowItem(this.rowItem)
      }
    },
    setRowItem(rowItem) {
      let prop = this.$attrs['prop'].split('.')
      rowItem[prop[prop.length - 1]] = this.innerValue
    },

    setValue(val) {
      this.innerValue = val
    },

    getType() {
      return this.$attrs.type
    },
  },
}
