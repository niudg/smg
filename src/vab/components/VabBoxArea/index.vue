<template>
  <el-row class="vab-box-area flex_center_align" :gutter="0">
    <slot />
  </el-row>
</template>

<script>
  export default {
    name: 'VabBoxArea',
  }
</script>

<style lang="scss" scoped>
  @mixin panel {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    padding: 8px 0;
  }

  .vab-box-area {
    ::v-deep {
      .el-form-item:first-child {
        margin: 0 0 #{math.div($base-margin, 2)} 0 !important;
      }

      .el-form-item + .el-form-item {
        margin: 0 0 #{math.div($base-margin, 2)} 0 !important;

        .el-button {
          margin: 0 0 0 10px !important;
        }
      }

      .top-panel {
        @include panel;
      }

      .bottom-panel {
        @include panel;
        border-top: 1px solid #dcdfe6;
      }

      .left-panel {
        @include panel;
      }

      .right-panel {
        @include panel;
        justify-content: flex-end;
      }
    }
  }
</style>
