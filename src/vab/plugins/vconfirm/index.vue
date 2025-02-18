<template>
  <el-dialog
    class="mode"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    custom-class="confirm-dialog"
    top="5vh"
    width="320px"
    :visible.sync="show"
    center
    append-to-body
  >
    <div class="content">{{ msg }}</div>
    <div slot="footer" class="dialog-footer flex_end">
      <div
        class="flex_start flex_center_align"
        :style="{
          width: !enableCancel ? '100%' : 'auto',
        }"
      >
        <div
          v-if="enableCancel"
          class="quxiao"
          :class="{ pd_25: msgWidth !== '104px' }"
          @click="handleCancel"
        >
          {{ noText ? noText : 'キャンセル' }}
        </div>
        <el-button
          class="changebtn auto"
          :style="{
            backgroundColor: yesColor,
            borderColor: yesColor,
            width: !enableCancel ? '100%' : msgWidth,
          }"
          @click="handleConfirm"
        >
          {{ yesText }}
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Confirm',
    props: {
      msg: {
        type: String,
        default: '',
      },
      msgWidth: {
        type: String,
        default: '104px',
      },
      yesText: {
        type: String,
        default: '確定',
      },
      noText: {
        type: String,
        default: '',
      },
      yesColor: {
        type: String,
        default: '',
      },
      enableCancel: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        show: false,
      }
    },
    methods: {
      handleCancel() {
        this.remove()
        this.show = false
      },
      handleConfirm() {
        this.handleCancel()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .quxiao {
    font-weight: 500;
    font-size: 14px;
    color: #848484;
    padding: 0 30px;
    cursor: pointer;
  }
  .m20 {
    margin: 0 20px;
  }
  .w104 {
    width: 104px;
  }
  .mode {
    display: flex;
    align-items: center;
  }
  .content {
    font-size: 14px;
    color: #000000;
    line-height: 24px;
  }

  .pd_25 {
    padding: 0 25px;
  }
</style>
