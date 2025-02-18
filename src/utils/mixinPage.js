/* eslint-disable prettier/prettier */
import _ from 'lodash'
import Vue from 'vue'
import { mapActions } from 'vuex'
import getPageTitle from '@/utils/pageTitle'
import plugins from '@/plugins/index'
import eventHandle from '@/utils/mixEventHandle'
import { BEHAVIOR_TYPE } from '@/constants/actionEnum'
export default {
  watch: {
    $route: 'setPageType',
  },
  mixins: [eventHandle],
  data() {
    return {
      initialValue: {},
      tasks: [],
      id: null,
      type: null,
      //照会モード
      isViewMode: false,
      //承認前変更モード
      isUpdateMode: false,
      //登録モード
      isAddMode: false,

      // actionMap: {
      //   redirect: (parmas) => this.toListPage(parmas),
      // },
    }
  },
  provide() {
    return {
      pageComponent: this,
      page: this,
    }
  },
  activated() {
    this.closeTooltip()
  },
  mounted() {
    this.setPageType()
    this.closeTooltip()
  },
  methods: {
    ...mapActions({
      changeTabsMeta: 'tabs/changeTabsMeta',
    }),

    handleMeta(name, meta) {
      if (meta.title) document.title = getPageTitle(meta.title)
      setTimeout(() => {
        this.changeTabsMeta({ name, meta })
      }, 50)
    },
    // 設定ページtype
    setPageType() {
      this.type = this.$route?.query?.type
      switch (this.type) {
        //照会フラグ
        case 'view':
          this.isViewMode = true
          break
        //変更フラグ
        case 'update':
          this.isUpdateMode = true
          break
        default:
          this.isAddMode = true
          break
      }
      //IDを取得する
      this.id = this.$route?.query?.id
    },
    registerPromise(p) {
      if (p) {
        this.tasks.push(p)
      }
    },

    //複数の非同期を処理する
    async syncComponentTask() {
      if (this.tasks.length > 0) {
        return await Promise.all(this.tasks)
      }
    },
    //データをフォームダーターに反映する
    mergeFormData(prop, data) {
      let form = this.$refs['form']
      this.setFormData(form, prop, data)
    },

    setFormData(form, prop, data) {
      if (prop) {
        this.$baseLodash.set(
          this.initialValue,
          prop,
          this.$baseLodash.cloneDeep(data)
        )

        this.$baseLodash.set(form?.model, prop, data)
        Vue.observable({ ...form?.model[prop] })
      } else {
        this.$baseLodash.forOwn(data, (value, key) => {
          this.$baseLodash.set(
            this.initialValue,
            key,
            this.$baseLodash.cloneDeep(value)
          )
          this.$set(form?.model, key, value)
        })
      }
    },

    //最初データを保存する
    setInitialValue(prop, data) {
      this.$baseLodash.set(
        this.initialValue,
        prop,
        this.$baseLodash.cloneDeep(data)
      )
    },

    pageScrollToTop() {
      document.getElementById('app').scrollTop = 0
    },
    closeTooltip() {
      this.$nextTick(() => {
        let list = document.getElementsByClassName('el-tooltip__popper')
        if (list.length > 0) {
          list[list.length - 1].style.display = 'none'
        }
      })
    },

    async customFormValidate() {
      return new Promise((resolve) => {
        resolve()
      })
    },

    handleOnSubmit(formRef = 'form', actionName) {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          this.$refs[`${formRef}`].validate(async (valid, obj) => {
            if (!valid) {
              this.getFormIsValid(obj)
              return reject('invalidate')
            }

            await this.customFormValidate()

            this.$confirm({
              msg: this.format(
                this.$t(`validateMessage.${this.$messageCode.I00000466.name}`),
                actionName
              ),
              yes: () => {
                resolve()
              },
              no: () => {
                reject('cancel')
              },
            })
          })
        })
      })
    },

    getFormIsValid(obj) {
      var a = []
      for (let key in obj) {
        a.push(obj[key][0].message)
      }
      this.$message({
        message: a[0],
        type: 'error',
      })
      return false
    },

    successMessage(actionName) {
      this.msgSuccess(
        this.format(
          this.$t(`validateMessage.${this.$messageCode.I00000111.name}`),
          `${actionName}成功`
        )
      )
    },
    //
    successCallBack(key) {
      return plugins[key]
    },

    /**
     * フォーム対象の比較
     * @param {*} form
     * @returns
     */
    compareForm(form) {
      if (_.isEmpty(form)) {
        return null
      }
      if (_.isEmpty(this.initialValue)) {
        this.addOperationTypeForObj(form)
        return form
      } else {
        return this.compareObj(this.initialValue || {}, form)
      }
    },

    /**
     * リスト対象の比較処理
     * @param {*} form
     * @param {*} modelListKey
     * @param {*} compareKeys 比較KEY
     * @param {*} identifyKey 主キー
     * @returns
     */
    commpareModelList(form, modelListKey, compareKeys, identifyKey) {
      if (_.isEmpty(form)) {
        return
      }

      let modelList = {
        originArr: this.$baseLodash.get(this.initialValue, modelListKey),
        targetArr: this.$baseLodash.get(form, modelListKey),
        identifyKey: identifyKey,
        keys: compareKeys,
      }
      let result = this.compareArr(modelList)
      this.$baseLodash.set(form, modelListKey, result)
    },

    /**
     *
     * @param {*} api
     */
    async nestRequest(api) {
      let func = api.func
      let primaryKeys = api.primaryKeys
      let dto = {}
      let vm = this
      primaryKeys.forEach((primaryKey) => {
        let mode = this.$attrs?.mode
        if (
          mode &&
          mode == BEHAVIOR_TYPE.pageMode &&
          this.$attrs.query[primaryKey]
        ) {
          dto[primaryKey] = this.$attrs.query[primaryKey]
        } else {
          if (this.$route.query[primaryKey]) {
            dto[primaryKey] = this.$route.query[primaryKey]
          }
        }
      })
      if (Object.keys(dto).length > 0) {
        let res = await func(dto)
        if (!_.isEmpty(res)) {
          vm.mergeFormData(null, res)
          if (!_.isEmpty(api.children)) {
            recursion(vm, api.children, res)
          }
        }
      }

      /**
       * 递归请求处理
       * @param {*} vm
       * @param {*} children
       * @param {*} data
       */
      async function recursion(vm, children, data) {
        var tasks = children.map(async (item) => {
          let func = item.func
          let params = item.params
          let dto = {}
          params.forEach((param) => {
            if (data[param.from]) {
              dto[param.to] = data[param.from]
            }
          })
          if (Object.keys(dto).length > 0) {
            let res = await func(dto)
            if (!_.isNil(res)) {
              vm.mergeFormData(item.prop, res)
              if (!_.isEmpty(item.children)) {
                await recursion(
                  vm,
                  item.children,
                  _.isArray(res) ? res[0] : res
                )
              }
            }
            return res
          }
        })
        await Promise.all(tasks)
      }
    },

    loadInitData(keys) {
      return keys.some((item) => this.$route.query[item])
    },

    enhanceComponent(component, mixin) {
      component.mixins = component.mixins || []
      component.mixins.push(mixin)
    },
  },
}
