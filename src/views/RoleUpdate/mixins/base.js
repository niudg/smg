import request from '@/utils/request'
import * as api from '@/init/RoleUpdate'
export default {
  data() {
    return {
      form: {},
      rules: {},
    }
  },
  async mounted() {
    await this.syncComponentTask()
    await this.nestRequest(api.default)
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
