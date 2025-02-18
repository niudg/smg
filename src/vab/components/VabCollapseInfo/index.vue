<template>
  <div class="tableInfo">
    <div class="flex_space ts_box flex_center_align">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="flex_end up_box flex_center_align">
        <slot name="file"></slot>
        <div
          class="arrow_box flex_center_align flex_center"
          @click="fold = !fold"
        >
          <!-- <img
            class="arrow_img"
            src="~@/assets/images/up.png"
            :class="{ rote: fold }"
          /> -->
          <svg-icon
            icon-class="up_line"
            class="arrow_svg"
            :class="{ rote: fold }"
          />
        </div>
      </div>
    </div>
    <template v-if="!fold">
      <slot name="row"></slot>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'VabCollapseInfo',
    props: {
      up: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        fold: false,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .tableInfo {
    border: 1px solid #d1dae1;
    border-radius: $base-border-radius3;
    overflow: hidden;
    .ts_box {
      background: #fff;
      padding: 0px 12px;
      .title {
        font-weight: 500;
        font-size: 16px;
        color: #003350;
      }
      .up_box {
        .upload_title {
          font-weight: 500;
          font-size: 14px;
          text-decoration-line: underline;
          color: #004c82;
          padding-right: 40px;
          background: url('~@/assets/images/r1.png') 83% center no-repeat;
          // background: url('~@/assets/images/rcqr_1.png') 83% center no-repeat;
          display: inline-block;
          cursor: pointer;
          &.up {
            background: url('~@/assets/images/r1.png') 83% center no-repeat;
          }
        }
        .slot_link {
          font-weight: 500;
          font-size: 14px;
          text-decoration-line: underline;
          color: #004c82;
          padding-right: 40px;
          // background: url('~@/assets/images/rcqr_1.png') 78% center no-repeat;
          background: url('~@/assets/images/r1.png') 78% center no-repeat;
          display: inline-block;
          cursor: pointer;
          &.up {
            background: url('~@/assets/images/r1.png') 78% center no-repeat;
          }
        }
        .arrow_box {
          width: 44px;
          height: 44px;
          cursor: pointer;
        }
        .arrow_img {
          width: 24px;
          height: 24px;
        }
        .arrow_svg {
          font-size: 24px;
          color: #919191;
        }
      }
    }
  }
  .rote {
    transform: rotate(180deg);
  }
  .upload_title_change {
    font-weight: 500;
    font-size: 14px;
    text-decoration-line: underline;
    color: #004c82;
    display: inline-block;
    cursor: pointer;
    &.mr20 {
      margin-right: 20px;
    }
    .external {
      width: 14px;
      margin-left: 5.75px;
    }
  }
</style>
