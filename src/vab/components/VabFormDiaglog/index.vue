<template>
  <div>
    <el-drawer
      v-if="showType == 'drawer'"
      :before-close="handleClose"
      custom-class="drw-layer"
      direction="rtl"
      :title="$attrs.title"
      :visible.sync="dialogVisible"
    >
      <ValidationObserver ref="observer" class="observer">
        <el-form ref="form" :label-width="labelWidth" :model="model">
          <slot />
        </el-form>
      </ValidationObserver>
      <div class="drawer__footer">
        <el-button
          v-for="(btn, index) in buttons"
          :key="index"
          :icon="btn.icon"
          :type="btn.type"
          @click="handleClick(btn)"
        >
          {{ btn.title }}
        </el-button>
        <el-button @click="close">
          {{ $t('deliveryEdit.cancel') }}
        </el-button>
      </div>
    </el-drawer>
    <el-dialog
      v-if="showType == 'modal'"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-fullscreen="showFullscreen"
      :title="$attrs.title"
      :top="$attrs.top"
      :visible.sync="dialogVisible"
      :width="$attrs.width"
    >
      <div class="dialog-main-div">
        <ValidationObserver ref="observer">
          <el-form
            ref="form"
            label-position="left"
            :label-width="labelWidth"
            :model="model"
          >
            <slot />
          </el-form>
        </ValidationObserver>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="(btn, index) in buttons"
          :key="index"
          :icon="btn.icon"
          :type="btn.type"
          @click="handleClick(btn)"
        >
          {{ btn.title }}
        </el-button>
        <el-button @click="close">
          {{ $t('deliveryEdit.cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'VabFormDialog',
    props: {
      labelWidth: {
        type: String,
        default: '80px',
      },
      model: {
        type: Object,
        default: () => {},
      },
      showType: {
        type: String,
        default: 'modal',
      },
      buttons: {
        type: Array,
        default: () => [],
      },
      visible: {
        type: Boolean,
        default: false,
      },
      showFullscreen: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        dialogVisible: false,
      }
    },
    computed: {},
    watch: {
      visible: {
        handler(val) {
          this.dialogVisible = val
        },
      },
    },
    methods: {
      handleClose() {
        this.dialogVisible = false
        this.$emit('update:visible', false)
      },
      close() {
        this.reset()
      },
      handleClick(btn) {
        if (btn.needValidate) {
          this.$refs['observer'].validate().then(async (success) => {
            if (success) {
              await btn.click.call(this, this.model)
              this.$baseNotify(
                this.format(
                  this.$t(
                    `validateMessage.${this.$messageCode.I00000111.name}`
                  ),
                  '操作が成功'
                )
              )
              this.close()
            } else {
              return false
            }
          })
        }
      },
      reset() {
        requestAnimationFrame(() => {
          this.$refs.observer.reset()
        })
        this.$refs['form'].resetFields()
        this.dialogVisible = false
        this.$parent.dialogVisible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  ::v-deep {
    .el-dialog {
      max-height: 920px;
    }
    .el-dialog__body {
      overflow-y: auto;
      max-height: 800px;
    }
    .el-drawer__header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding-bottom: $base-padding;
      margin-bottom: #{math.div($base-margin, 4)} !important;
    }
    .drw-layer {
      .el-drawer__body {
        padding: 20px;
        display: flex;
        flex-direction: column;
        height: 100%;

        span.observer {
          flex: 1;
        }
      }
    }
  }
  .drawer__footer {
    display: flex;
    .el-button {
      flex: 1;
    }
  }
</style>
