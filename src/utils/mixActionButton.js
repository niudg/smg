import _ from 'lodash'
import { handleEventList } from '@/utils/eventListHandler'
export default {
  directives: {
    disabled: {
      bind: function (el) {
        setTimeout(() => {
          el.children.forEach((item) => {
            if (item.className.indexOf('el-button') > -1) {
              item.removeAttribute('disabled')
              item.classList.remove('is-disabled')
            }
          })
          var disable = false
          el.children.forEach((item) => {
            if (item.className.indexOf('el-dropdown-menu') > -1) {
              const sonTags = item.children
              let noneLen = 0
              let eleList = []
              sonTags.forEach((son) => {
                let li = son.children
                eleList = [...eleList, ...li]
              })
              if (eleList.length > 0) {
                eleList.forEach((item) => {
                  if (item.style.display == 'none' || item.innerText == '') {
                    noneLen++
                  }
                })
              }
              if (eleList.length == 0 || noneLen == eleList.length) {
                disable = true
              }
            }
          })
          if (disable) {
            el.children.forEach((item) => {
              if (item.className.indexOf('el-button') > -1) {
                item.setAttribute('disabled', true)
                item.classList.add('is-disabled')
              }
            })
          }
        }, 0)
      },
      update: function (el) {
        setTimeout(() => {
          el.children.forEach((item) => {
            if (item.className.indexOf('el-button') > -1) {
              item.removeAttribute('disabled')
              item.classList.remove('is-disabled')
            }
          })
          var disable = false
          el.children.forEach((item) => {
            if (item.className.indexOf('el-dropdown-menu') > -1) {
              const sonTags = item.children
              let noneLen = 0
              let eleList = []
              sonTags.forEach((son) => {
                let li = son.children
                eleList = [...eleList, ...li]
              })
              if (eleList.length > 0) {
                eleList.forEach((item) => {
                  if (item.style.display == 'none' || item.innerText == '') {
                    noneLen++
                  }
                })
              }
              if (eleList.length == 0 || noneLen == eleList.length) {
                disable = true
              }
            }
          })
          if (disable) {
            el.children.forEach((item) => {
              if (item.className.indexOf('el-button') > -1) {
                item.setAttribute('disabled', true)
                item.classList.add('is-disabled')
              }
            })
          }
        }, 0)
      },
    },
  },
  data() {
    return {
      genBtnMap: {
        btn: this.genSingleBtn,
        btnGroup: this.genBtnGroup,
      },
    }
  },

  methods: {
    getShow(config) {
      const { column, row, $index, prop } = config
      let show = true
      if (this.$baseLodash.has(column, 'show')) {
        if (this.$baseLodash.isFunction(column.show)) {
          show = column.show.call(this, row, $index, column, prop)
        } else {
          show = column.show
        }
      }

      return show
    },

    /**
     *ボタン
     * */
    genSingleBtn(config) {
      let vm = this
      const { row, $index, prop, column, action } = config
      if (!this.getShow(column, row, $index, prop)) {
        return null
      }

      return (
        <el-button
          type="primary"
          class="changebtn mini"
          v-permissions={action.permissions}
          disabled={
            _.isFunction(action.disabled)
              ? action.disabled.call(this, row)
              : action.disabled
          }
          on={{
            click: () => {
              handleEventList(
                'click',
                {
                  page: this.page,
                  vm: this,
                },
                {
                  ...action,
                  config: config,
                }
              )
              vm.$emit('action-button-click', action)
            },
          }}
        >
          {action.name}
        </el-button>
      )
    },
    /**
     *ボタングループ
     */
    genBtnGroup(config) {
      const { row, $index, prop, column, action } = config
      return (
        <el-dropdown trigger="click">
          <el-button type="primary" class="changebtn mini">
            {action.name}
            <i class="el-icon-arrow-down"></i>
          </el-button>
          <el-dropdown-menu>
            {action.buttonList?.map((btn) => {
              let show = this.getShow(column, row, $index, prop)
              if (show) {
                return (
                  <el-dropdown-item
                    v-permissions={btn.permissions}
                    disabled={
                      _.isFunction(btn.disabled)
                        ? btn.disabled.call(this, row)
                        : btn.disabled
                    }
                    nativeOn={{
                      click: () => {
                        if (btn.click) {
                          btn.click.call(
                            this,
                            this.tableData,
                            row,
                            $index,
                            column,
                            prop
                          )
                        }
                        handleEventList(
                          'click',
                          {
                            page: this.page,
                            vm: this,
                          },
                          {
                            ...btn,
                            config: config,
                          }
                        )
                      },
                    }}
                  >
                    {_.isFunction(btn.name) ? (
                      btn.tipContent ? (
                        <el-popover
                          placement="left"
                          trigger="hover"
                          content={btn.tipContent}
                        >
                          <span slot="reference">
                            {btn.name.call(this, row)}
                          </span>
                        </el-popover>
                      ) : (
                        btn.name.call(this, row)
                      )
                    ) : btn.tipContent ? (
                      <el-popover
                        placement="left"
                        trigger="hover"
                        content={btn.tipContent}
                      >
                        <span slot="reference">{btn.name}</span>
                      </el-popover>
                    ) : (
                      btn.name
                    )}
                  </el-dropdown-item>
                )
              }
            })}
          </el-dropdown-menu>
        </el-dropdown>
      )
    },

    genActionBtn(config) {
      const { actions } = config
      if (actions.length > 0) {
        return actions.map((action) => {
          config.action = action
          return this.genBtnMap[action.btnChangeType](config)
        })
      }
      return null
    },
  },
}
