<template>
  <div>
    <el-row
      v-loading="lock"
      element-loading-spinner="el-icon-lock"
      class="vab-query-form"
      :gutter="0"
    >
      <slot name="header">
        <el-col :span="24">
          <div class="top-panel flex_space" :class="{ nobot: fold }">
            <div class="left_box flex_start flex_center_align">
              <!-- <img
                class="search_icon1"
                src="~@/assets/images/search_icon.png"
                alt=""
              /> -->
              <svg-icon
                icon-class="search_2_line"
                class="search_svg"
              ></svg-icon>
              <span class="title">検索条件</span>
            </div>
            <slot name="search_btn">
              <!-- <el-dropdown trigger="click" @command="handleCommand">
                <el-button class="right_box">
                  検索条件の登録／呼び出し
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="searchSave">
                    現在の検索条件を登録
                  </el-dropdown-item>
                  <el-dropdown-item command="searchOut">
                    検索条件の呼び出し・削除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              <!-- <el-button type="danger" :style="zIndex" @click="cancel">
                クリア
              </el-button> -->
            </slot>
          </div>
        </el-col>
      </slot>
      <el-col :span="24">
        <el-form
          ref="queryForm"
          v-bind="$attrs"
          class="form_query_box"
          :size="$attrs['size'] ? $attrs['size'] : 'mini'"
          :label-position="
            $attrs['label-position'] ? $attrs['label-position'] : 'left'
          "
          :model="model"
          :rules="rules"
          :type="'queryForm'"
          :validate-on-rule-change="false"
          @submit.native.prevent
        >
          <slot></slot>
        </el-form>
      </el-col>
    </el-row>
    <div class="flex_center btn_center" :class="borBottom ? '' : 'no_border'">
      <div class="flex_space buttons">
        <!-- icon="el-icon-refresh" -->
        <el-button
          type="info"
          class="comx_box sure_btn"
          :style="zIndex"
          @click="cancel"
        >
          リセット
        </el-button>
        <!-- icon="el-icon-search" -->
        <el-button
          type="primary"
          class="comx_box"
          :style="zIndex"
          @click="queryData"
        >
          検索
        </el-button>
      </div>
    </div>
    <search-save ref="searchSave"></search-save>
    <search-out
      ref="searchOut"
      @setQueryFormData="setQueryFormData"
    ></search-out>
  </div>
</template>

<script>
  function broadcast(componentName, eventName, params) {
    this.$children.forEach((child) => {
      var name = child.$options.componentName
      if (name === componentName || name?.indexOf('Vab') > -1) {
        child.$emit.apply(child, [eventName].concat(params))
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]))
      }
    })
  }
  import { handleEventList } from '@/utils/eventListHandler'
  export default {
    name: 'VabQueryForm',
    componentName: 'VabQueryForm',
    inject: {
      page: {
        default: '',
      },
    },
    props: {
      model: {
        type: Object,
        default: () => {},
      },
      rules: {
        type: Object,
        default: () => {},
      },
      enableQuerySave: {
        type: Boolean,
        default: true,
      },
      borBottom: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        fold: false,
        dialogVisible: false,
        drawerTable: false,
        form: {},
        lock: false,
      }
    },
    computed: {
      zIndex() {
        return {
          position: 'relative',
          'z-index': this.$store.getters['settings/zIndex'],
        }
      },
    },
    watch: {
      // 状況により、$route.query を$route.paramsにする
      $route: {
        handler(newRouter) {
          if (this.$baseLodash.has(newRouter.query, 'lock')) {
            this.lock = true
          } else {
            this.lock = false
          }
        },
        immediate: true,
      },
    },
    mounted() {},
    created() {},
    methods: {
      // 展示検索
      setQueryFormData(data) {
        this.$refs['queryForm'].resetFields()
        this.broadcast('CommonSelect', 'fieldReset', null)
        this.setFormDataList(data, this.$refs['queryForm'])
      },
      validate(callback) {
        return this.$refs['queryForm'].validate((valid) => {
          if (valid) {
            callback(valid)
          } else {
            return false
          }
        })
      },
      validateTable() {
        return new Promise((resolve, reject) => {
          this.$refs['queryForm'].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          })
        })
      },
      // 検索条件の保存／呼び出し
      handleCommand(command) {
        let formJson = this.getSearchJson(this.$refs['queryForm'])
        this.$refs[command].initData(formJson)
      },
      queryData() {
        this.$store.dispatch('settings/setSearchIndex', 0)
        this.$refs['queryForm'].validate((valid) => {
          if (valid) {
            handleEventList(
              'search',
              {
                page: this.page,
                vm: this,
              },
              {
                eventList: this.$attrs['event-list'],
              }
            )
          } else {
            return false
          }
        })
      },
      cancel() {
        this.$emit('beforeCancel')
        handleEventList(
          'clear',
          {
            page: this.page,
            vm: this,
          },
          {
            eventList: this.$attrs['event-list'],
          }
        )
        this.$refs['queryForm'].resetFields()
        this.$store.dispatch('settings/setSearchIndex', 0)
        this.broadcast('CommonSelect', 'fieldReset', null)
        this.$emit('cancel')
        if (this.lock) {
          this.$baseEventBus.$emit('reload-router-view')
        }
      },
      deleteData() {
        this.$confirm(
          this.format(
            this.$t(`validateMessage.${this.$messageCode.I00000466.name}`),
            '削除'
          ),
          '確認',
          {
            confirmButtonText: '確定',
            cancelButtonText: 'キャンセル',
            type: 'warning',
          }
        )
          .then(() => {})
          .catch(() => {})
      },
      deleteLock() {},
      broadcast(componentName, eventName, params) {
        let ths = this.$refs['queryForm']
        broadcast.call(ths, componentName, eventName, params)
      },
      worksClearForm() {
        this.$refs['queryForm'].resetFields()
        this.$store.dispatch('settings/setSearchIndex', 0)
        this.broadcast('CommonSelect', 'fieldReset', null)
      },
      updataOver(row) {
        row.searchCondition = this.searchCondition
        row.showInput = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .vab-query-form {
    background: $base-color-white;
    border: 1px solid $base-border-color;
    border-radius: $base-border-radius3;
    .form_query_box {
      padding: 12px;
    }
    ::v-deep {
      .el-icon-lock {
        font-size: 60px !important;
      }

      .el-form-item:first-child {
        // margin: #{math.div($base-margin, 2)} !important;
        margin: 4px 0;
        .el-form-item--mini.el-form-item {
          margin: 0;
        }
      }

      .el-form-item + .el-form-item {
        // margin: 10 10px #{math.div($base-margin, 2)} 10px !important;

        .el-button {
          margin: 0 0 0 10px !important;
        }
      }

      .top-panel {
        padding: 10px 15px;
        border-bottom: 1px solid $base-border-color;
        &.nobot {
          border-bottom: none;
        }
        .left_box {
          .title {
            font-size: 16px;
            color: #003350;
            padding-left: 4px;
            flex: 1;
          }
          .search_icon1 {
            width: 18px;
            height: 18px;
          }
        }
        .right_box {
          background: #ffffff;
          border: 1px solid #848484;
          border-radius: 3px;
          padding: 5px 10px;
          cursor: pointer;
          font-weight: 500;
          font-size: $base-font-size-middle;
          color: #848484;
          &:hover {
            border: 1px solid #a1a1a1;
            color: #a1a1a1;
          }
        }
      }
    }
  }

  .btn_center {
    padding: 12px 0;
    border-bottom: 1px solid $base-border-color;
    .buttons {
      width: 250px;
      .comx_box {
        width: 120px;
        height: 32px;
        border-radius: 3px;
        font-weight: 500;
        font-size: $base-font-size-middle;
        text-align: center;
        cursor: pointer;
        &.sure_btn {
          background: #ffffff;
          border: 1px solid #848484;
          color: #848484;
          &:hover {
            border: 1px solid #a1a1a1;
            color: #a1a1a1;
          }
        }
        &.search_bth {
          background: #0060c2;
          border: 1px solid #0060c2;
          color: #ffffff;
          &:hover {
            background: #0171ee;
            border: 1px solid #0171ee;
          }
        }
      }
    }
  }
  .noborder {
    padding: 0 20px;
    .vab-query-form {
      border: none;
      border-bottom: 1px solid $base-border-color;
    }
    .btn_center {
      border: none;
    }
  }
  .text {
    color: #1890ff;
    cursor: pointer;
  }
  ::v-deep .el-drawer__header {
    font-size: 18px;
  }

  ::v-deep .el-icon-delete {
    color: $base-color-red;
  }
</style>
