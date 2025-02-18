/* eslint-disable prettier/prettier */
//import { handleTabs } from '@/utils/routes'
//let numeral = require('numeral')
import { mapActions } from 'vuex'
export default {
  data() {
    return {}
  },

  computed: {
    refreshPageList() {
      return this.$store.getters['notify/refreshPageList']
    },
    reloadPage() {
      return this.$store.getters['notify/reloadPage'][this.$route.name] ?? false
    },
    autoReload() {
      return this.$store.getters['notify/autoReload'][this.$route.name] ?? true
    },
  },

  watch: {
    $route: {
      handler(router) {
        if (
          this.$baseLodash.keys(router.query).length > 0 &&
          router.name == this.$options.name
        ) {
          this.$nextTick(() => {
            if (this.autoReload) {
              this.$store.dispatch('notify/setAutoReload', {
                name: this.$options.name,
                value: false,
              })
              this.fetchData && this.fetchData()
            }
          })
          return
        }
      },
      immediate: true,
    },
  },

  beforeDestroy() {
    this.$store.dispatch('notify/setReloadPage', {
      name: this.$options.name,
      value: false,
    })
    this.$store.dispatch('notify/setAutoReload', {
      name: this.$options.name,
      value: true,
    })
  },
  mounted() {
    this.getVabTable()
    this.closeTooltip()
    this.closePopover()
  },
  activated() {
    if (
      this.$baseLodash.includes(
        this.refreshPageList,
        this.$baseLodash.toUpper(this.$route.name)
      )
    ) {
      this.$nextTick(() => {
        this.fetchData()
      })
      this.delRefresh(this.$route.name)
    }
    this.closeTooltip()
    this.closePopover()
  },

  methods: {
    ...mapActions({
      delRefresh: 'notify/delRefresh',
    }),
    getComponentList(vm, componentName, result = []) {
      vm.$children.forEach((child) => {
        var name = child.$options.componentName
        if (name == componentName) {
          result.push(child)
        } else {
          this.getComponentList(child, componentName, result)
        }
      })
      return result
    },
    getVabTable() {
      let vabTableList = this.getComponentList(this, 'VabTable') ?? []
      let vabQueryFormList = this.getComponentList(this, 'VabQueryForm') ?? []
      if (vabTableList.length == 0 || vabQueryFormList.length == 0) return
      vabTableList[0].vmQueyForm = vabQueryFormList[0]
    },
    closeTooltip() {
      this.$nextTick(() => {
        let list = document.getElementsByClassName('el-tooltip__popper')
        if (list.length > 0) {
          list[list.length - 1].style.display = 'none'
        }
      })
    },

    closePopover() {
      this.$nextTick(() => {
        let list = document.getElementsByClassName('el-popover')
        // console.info(list)
        if (list.length > 0) {
          list[list.length - 1].style.display = 'none'
        }
      })
    },

    // 商品コンポネート選択すると、商品CDを商品明細コンポネートへ渡す
    getGoodList(val) {
      const data = val?.data
      this.$refs.itemDetailCdList.setItmcdList(data)
    },

    //商品CDリストを取得する
    getItemCdList(data) {
      if (!data) {
        return null
      }
      data = this.$baseLodash.compact(data)
      if (data.length == 0) {
        return null
      }
      return this.$baseLodash.uniq(this.$baseLodash.map(data, 'itmcd'))
    },

    //商品明細コンポネートの商品CDを設置する
    setItemCd(data) {
      if (!data) {
        return null
      }
      let itmCds = this.$baseLodash.uniq(this.$baseLodash.map(data, 'itmcd'))
      if (itmCds.length == 1) {
        this.$refs.itemDetailCdList.setItmcd(itmCds[0])
      }
    },

    //商品明細コンポネートの処理
    handleItemDetailCdList(val) {
      let itemCdList = null
      let data = val?.data
      if (!data) {
        return
      }
      data = this.$baseLodash.compact(data)
      if (data.length == 0) {
        return
      }
      itemCdList = this.$baseLodash.uniq(this.$baseLodash.map(data, 'itmcd'))
      if (this.$baseLodash.isEmpty(this.queryForm.itemCdList)) {
        this.queryForm.itemCdList = itemCdList
        if (itemCdList && itemCdList.length == 1) {
          //商品コンポネートにコードと商品名を設置する
          this.$refs.itemCdList?.setValue(
            data[0].itmcd,
            data[0].itmcdModel?.itmnm
          )
          this.$refs.itemCdList?.closeValidate()
        }
      }
      if (itemCdList && itemCdList.length == 1) {
        this.$refs.itemDetailCdList.setItmcdList(
          [{ itmcd: data[0].itmcd, itmnm: data[0].itmcdModel?.itmnm }],
          false
        )
        this.$refs.itemDetailCdList?.closeValidate()
      }
    },

    commentIsRequitred(val, key = '') {
      let approvalCommentIsNull = this.$baseLodash.some(val, (o) => {
        if (
          this.$baseLodash.isNull(o[key]) ||
          this.$baseLodash.isEmpty(o[key])
        ) {
          return o
        }
      })
      if (approvalCommentIsNull) {
        this.msgInfo(
          this.format(
            this.$t(`validateMessage.${this.$messageCode.E00000001.name}`),
            '承認コメント'
          )
        )
        return false
      }
      return true
    },
    setTimeNull(list) {
      if (this.$baseLodash.isArray(list) && list.length > 0) {
        list.filter((item) => {
          item.changeDate = null
          item.changeTime = null
        })
      }
    },
  },
}
