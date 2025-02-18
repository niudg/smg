<template>
  <div>
    <el-row class="vab-query-form" :gutter="0">
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
    <div class="flex_center btn_center">
      <div class="buttons flex_space">
        <el-button class="sure_btn comx_box" @click="cancel">クリア</el-button>
        <el-button class="search_bth comx_box" @click="queryData">
          検索
        </el-button>
      </div>
    </div>
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
  export default {
    name: 'VabQueryFormMode',
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
    },
    data() {
      return {
        fold: false,
        dialogVisible: false,
        drawerTable: false,
        form: {},
      }
    },
    created() {},
    methods: {
      handleCommand(command) {
        this.$refs[command].initData()
      },
      queryData() {
        this.$refs['queryForm'].validate((valid) => {
          if (valid) {
            this.$emit('search')
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      broadcast(componentName, eventName, params) {
        let ths = this.$refs['queryForm']
        broadcast.call(ths, componentName, eventName, params)
      },
      cancel() {
        //this.$baseEventBus.$emit('ComponentReset')
        this.$emit('beforeCancel')
        this.$refs['queryForm'].resetFields()
        this.broadcast('CommonSelect', 'fieldReset', null)
        this.$emit('cancel')
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
      .el-form-item:first-child {
        // margin: #{math.div($base-margin, 2)} !important;
        //margin: 4px 0;
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
            flex: 1;
            padding-left: 7px;
            font-size: 16px;
            color: #003350;
          }
          .search_icon1 {
            width: 18px;
            height: 18px;
          }
        }
        .right_box {
          padding: 5px 10px;
          font-size: $base-font-size-middle;
          font-weight: 500;
          color: #848484;
          cursor: pointer;
          background: #ffffff;
          border: 1px solid #848484;
          border-radius: 3px;
          &:hover {
            color: #a1a1a1;
            border: 1px solid #a1a1a1;
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
        font-size: $base-font-size-middle;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
        border-radius: 3px;
        &.sure_btn {
          color: #848484;
          background: #ffffff;
          border: 1px solid #848484;
          &:hover {
            color: #a1a1a1;
            border: 1px solid #a1a1a1;
          }
        }
        &.search_bth {
          color: #ffffff;
          background: #0060c2;
          border: 1px solid #0060c2;
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
