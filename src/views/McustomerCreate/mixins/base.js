import request from '@/utils/request'

export default {
  data() {
    return {
      form: {
        customerIdMTenentModelList: [],
      },
      rules: {},
    }
  },
  async mounted() {
    await this.syncComponentTask()

    await this.commonInitData()
  },
  methods: {
    handleClick() {},
    handleActionButtonClick() {},
    handleToolBarButtonClick() {},
    commonInitData() {},
    async commonSubmit(dataSet) {
      const { actionName, apiUrl, apiMethod } = this.explainBtnDataSet(dataSet)

      await this.handleOnSubmit('form', actionName)

      let clone = this.$baseLodash.cloneDeep(this.form)

      this.commpareModelList(
        clone,
        'customerIdMTenentModelList',
        [
          'code',
          'name',
          'address',
          'contactPerson',
          'contactPersonTelephone',
          'contactPersonEmail',
          'dbSchema',
          'cacheCode',
          'description',
          'validStatus',
        ],
        'id'
      )

      clone = this.compareForm(clone)

      await request({
        url: apiUrl,
        method: apiMethod,
        data: clone,
      })

      // this.successMessage(actionName)

      // this.successCallBack('closePage')({
      //   name: this.$route.name,
      // })

      // this.successCallBack('toListPage')({
      //   name: redirectUrl,
      //   refresh: redirectUrl,
      //   close: this.$route.name,
      // })
    },
  },
}
