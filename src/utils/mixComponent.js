//import request from '@/utils/request'
let format = require('string-format')
import _ from 'lodash'
import download from '@/utils/download'
export default {
  props: {
    dialogTitle: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: null,
    },
    codeEnum: {
      type: Object,
      default: () => {
        return {
          code: null,
          value: null,
          text: null,
        }
      },
    },
    gutter: {
      type: Number,
      default: 0,
    },
    span1: {
      type: Number,
      default: 4,
    },
    span2: {
      type: Number,
      default: 20,
    },
    span3: {
      type: Number,
      default: 1,
    },
    multiSelect: {
      type: Boolean,
      default: true,
    },
    selectedable: {
      type: Boolean,
      default: true,
    },
    componentcd: {
      type: [String, Array],
      default: null,
    },
    componentname: {
      type: [String, Array],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    getParams: {
      type: Function,
      default: null,
    },
    validate: {
      type: Function,
      default: null,
    },
    // 清除校验
    clearValidate: {
      type: Boolean,
      default: false,
    },
    showAfter: {
      type: Boolean,
      default: false,
    },
    //ダイアログ用TIP
    tip: {
      type: String,
      default: '',
    },
    tipContent: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    nameEditable: {
      type: Boolean,
      default: false,
    },
    codeEditable: {
      type: Boolean,
      default: true,
    },
    errorMessage: {
      type: [Function, String],
      default: null,
    },
  },
  computed: {
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'ElForm') {
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
  },
  data() {
    return {
      dialogVisible: false,
      localInputVal: this.$baseLodash.isArray(this.componentcd)
        ? this.componentcd.length == 1
          ? this.componentcd[0]
          : ''
        : this.componentcd,
      localInputName: this.$baseLodash.isArray(this.componentname)
        ? this.componentname.length == 1
          ? this.componentname[0]
          : ''
        : this.componentname,

      list: [],
      itmCdList: [],
      rules: [
        {
          validator: this.remote,
          trigger: ['blur'],
        },
      ],
      showList: false,
      localDisabled: this.disabled,
      remoteUrl: null,
      validated: false,
      codeField: null,
      codeField1: null,
      nameField: null,
      requestParams: null,
      localClearValidate: !this.clearValidate,
    }
  },

  watch: {
    disabled: function (val) {
      if (this.$const.viewMode.includes(this.$route?.query?.type)) {
        this.localDisabled = true
      } else {
        this.localDisabled = val
      }
    },
  },
  created() {
    //this.$baseEventBus.$on('ComponentReset', this.reset)
    this.$on('fieldReset', this.reset)
  },
  mounted() {
    if (this.$const.viewMode.includes(this.$route?.query?.type)) {
      this.localDisabled = true
    }
  },
  methods: {
    initParams() {},
    handleLocalInputVal(val) {
      this.validated = false
      this.$store?.dispatch('settings/setSearchIndex', val ? 9999 : 0)
      this.$emit('clearOtherData')
    },
    handleBlur(event) {
      let val = event.target.value
      if (!val) {
        this.reset()
      } else {
        this.$emit('update:componentcd', this.multiSelect ? [val] : val)
      }
    },
    handleNameBlur(event) {
      let val = event.target.value
      this.$emit('update:componentname', this.multiSelect ? [val] : val)
    },
    callValidate() {
      this.form.validateField(this.prop)
    },
    closeValidate() {
      this.validated = true
    },
    setValue(code, name) {
      this.localInputVal = code
      this.localInputName = name
      this.$emit('update:componentcd', this.multiSelect ? [code] : code)
      this.$refs['elFormItem']?.clearValidate()
    },
    setList(list) {
      if (list.length > 1) {
        this.showList = true
        this.list = list
        this.localInputVal = ''
        this.localInputName = ''
      }
      this.closeValidate()
    },
    setDisabled(disabled) {
      this.localDisabled = disabled
    },
    selectDep() {
      this.initParams()
      this.dialogVisible = true
    },
    getSelection(val) {
      this.showList = val.data.length > 1 ? true : false
      let code = ''
      if (val.data.length == 1) {
        if (val.codeField1) {
          code = val.data[0][val.codeField1]
        }
        code += val.data[0][val.codeField]

        this.localInputVal = code
        this.localInputName = this.$baseLodash.includes(val.nameField, '.')
          ? this.$baseLodash.get(val.data[0], val.nameField)
          : val.data[0][val.nameField]
      } else if (val.data.length > 1) {
        this.localInputVal = '<複数>'
        this.localInputName = '<複数>'
      } else {
        this.localInputVal = ''
        this.localInputName = ''
      }
      this.list = val.data
      let componentcd = this.$baseLodash.map(val.data, val.codeField)
      let componentname = this.$baseLodash.map(val.data, val.nameField)
      this.$emit('update:componentcd', this.multiSelect ? componentcd : code)
      this.$emit(
        'update:componentname',
        this.multiSelect ? componentname : this.localInputName
      )
      this.validated = false
      this.$refs['elFormItem']?.clearValidate()
      this.$emit('getData', val)

      //制御必要の場合、validateFieldを実行する
      if (!this.clearValidate) {
        this.form.validateField(this.prop)
      }
    },
    reset() {
      this.localInputVal = ''
      this.localInputName = ''
      this.list = []
      this.showList = false
      this.validated = false
      this.$emit('update:componentcd', null)
      this.$emit('update:componentname', null)
      this.$emit('getData', null)
    },

    resetValidated() {
      this.validated = false
    },

    async getOne(val) {
      return val
    },

    async callCustomValidate(value, model, callback) {
      let result = null
      //拡張された検証メソッドを呼び出す
      if (this.$baseLodash.isFunction(this.validate)) {
        let f = this.validate.call(this, model)
        if (f instanceof Promise) {
          result = await f
        } else {
          result = f
        }

        if (this.$baseLodash.get(result, 'error')) {
          this.$emit('blur', { value: value, hasError: true })
          callback(new Error(format(result.message, this.codeEnum.code)))
          return result
        }
      }
      return null
    },

    async remote(rule, value, callback) {
      if (this.validated) {
        return callback()
      }

      try {
        let model = null
        value = this.localInputVal
        if (this.required) {
          if (this.$baseLodash.isEmpty(value)) {
            this.localInputName = ''
            this.$emit('blur', { value: value, hasError: true })
            return callback(
              new Error(
                this.errorMessage ||
                  this.format(
                    this.$t(
                      `validateMessage.${this.$messageCode.E00000001.name}`
                    ),
                    this.codeEnum.code
                  )
              )
            )
          }
        }
        if (this.$baseLodash.isEmpty(value)) {
          return callback()
        }
        //複数選択の場合
        if (this.multiSelect) {
          //カスタマイズメソッドを呼び出す
          let result = await this.callCustomValidate(value, value, callback)
          if (result != null) {
            return callback()
          }

          // 名前を取得するために CDによってデータベースから名前を取得する
          if (this.showList == false) {
            model = await this.getOne(value)
            if (model) {
              let code = _.get(model, this.codeField)
              let name = _.get(model, this.nameField)
              this.setValue(code, name)
              this.$emit('update:componentcd', [code])
              this.$emit('update:componentname', name)
              this.validated = true
            } else {
              //this.setValue(value, null)
              this.$emit('update:componentname', null)
              this.localInputName = null
            }
            this.$emit('getData', { data: [model] })
          }
          return callback()
        } else {
          model = await this.getOne(value)
          if (!model) {
            this.setValue(value, null)
            this.$emit('update:componentcd', value)
            this.$emit('update:componentname', null)
          }
          this.$emit('getData', { data: [model] })
        }

        if (!model) {
          //エラー情報表示の場合、直接表示する
          if (!this.clearValidate) {
            this.$emit('update:componentcd', value)
            this.$emit('update:componentname', null)
            this.localInputName = ''
            this.$emit('blur', { value: value, hasError: true })
            return callback(
              new Error(
                format(
                  this.$t(
                    `validateMessage.${this.$messageCode.E00000007.name}`
                  ),
                  this.codeEnum.value,
                  this.codeEnum.table
                )
              )
            )
          }
        } else {
          //カスタマイズメソッドを呼び出す
          let result = await this.callCustomValidate(value, model, callback)
          if (result != null) {
            return result
          }

          let code = ''
          if (model) {
            if (this.codeField1) {
              code = _.get(model, this.codeField1)
            }
            code = code + _.get(model, this.codeField)
            let name = _.get(model, this.nameField)
            this.setValue(code, name)
            this.$emit('update:componentcd', code)
            this.$emit('update:componentname', name)
          }
        }
        this.validated = true
        callback()
        this.$emit('blur', { value: value, hasError: false, model: model })
      } catch {
        download.redirect()
      }
    },
  },
}
