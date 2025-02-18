import _ from 'lodash'
import { getValueByPath } from 'element-ui/src/utils/util'
import { getData } from '@/utils/dataSync'
export default {
  methods: {
    /**
     * 変更可テーブルの新規処理
     * @param {*} prop
     * @param {*} keys
     */
    addTableItem({ prop, columns, callback }) {
      var item = {}
      columns.forEach((element) => {
        _.set(item, element.prop, null)
      })
      let value = getValueByPath(this.form, prop)
      if (!_.isArray(value)) {
        throw new Error(`${prop}は配列ではない、確認お願いします。`)
      }
      value.push(item)
      if (callback) {
        callback()
      }
    },

    /**
     * 変更可テーブルの削除処理
     * @param {*} tableData
     * @param {*} row
     * @param {*} $index
     * @param {*} column
     * @param {*} prop
     */
    deleteTableItem({ $index, prop, callback }) {
      this.$confirm({
        msg: this.format(
          this.$t(`validateMessage.${this.$messageCode.I00000466.name}`),
          '削除'
        ),
        yesTex: '確定',
        yes: () => {
          this.form[prop[0]].splice($index, 1)
          if (callback) {
            callback()
          }
        },
      })
    },

    /**
     *
     * @param {*} row
     * @param {*} config
     * @returns
     */
    async commonGetDataItems(row, config) {
      if (_.has(this.$data, `${config.dataKey}List`)) {
        return this.$data[`${config.dataKey}List`]
      }

      let key =
        config.dataType == 'local'
          ? config.dataKey
          : `/v1/api/${config.dataKey}/found`
      let res = await getData({
        enableCache: true,
        key: key,
        dataType: config.dataType || 'server',
        requestParam: config.requestParam || {},
      })

      let list = []
      if (_.has(res, 'list')) {
        list = res.list || []
      }
      list = res || []
      this.$baseLodash.set(this.$data, `${config.dataKey}List`, list)
      return res
    },

    explainBtnDataSet(dataSet) {
      debugger
      let primaryKey = dataSet['primary-key']
      let apiUrl = dataSet['api-url']
      let params = ''
      if (primaryKey) {
        params = primaryKey
          .split(',')
          .map((key) => this.$route.query[key] || this.$attrs.query[key])
          .join('/')
      }
      return {
        apiUrl: params ? `${apiUrl}/${params}` : apiUrl,
        apiMethod: dataSet['api-method'],
        redirectUrl: dataSet['redirect-url'],
        actionName: dataSet['action-name'],
      }
    },
  },
}
