<template>
  <footer class="vab-footer">
    <div class="flex_space logo_box flex_center_align">
      <!-- <img class="logo_img" src="~@/assets/images/logo.png" /> -->
      <div class="flex_space">
        <!-- <div class="fot_word mg no_img flex_center_align">
          <svg-icon
            icon-class="tryangle_right1"
            class="fot_word_svg"
          ></svg-icon>
          <span>TOMOONI利用約款</span>
        </div>
        <div class="fot_word no_img flex_center_align">
          <svg-icon
            icon-class="tryangle_right1"
            class="fot_word_svg"
          ></svg-icon>
          <span>Works特約</span>
        </div> -->
      </div>
    </div>
    <div class="flex_center flex_center_align bn_box">
      <span class="bn">Copyright C&J CO., LTD. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'VabMainFooter',
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .vab-footer {
    background: $base-color-white;
    min-height: 70px;
    align-items: center;
    justify-content: center;
    padding: 0 $base-padding 0 $base-padding;
    color: rgba(0, 0, 0, 0.45);
    background: $base-color-white;
    border-top: 1px dashed $base-border-color;
  }
  .bn_box {
    .bn {
      font-weight: 400;
      color: #848484;
      padding: 20px 0;
    }
  }
  .logo_box {
    padding: 4px 32px;
    width: 100%;
    box-sizing: border-box;
  }
  .fot_word {
    font-weight: 400;
    font-size: 12px;
    color: #004c82;
    padding-left: 15px;
    &.mg {
      // margin-right: 30px;
      margin-right: 24px;
    }
  }
  .logo_img {
    height: 50px;
    width: auto;
  }
</style>
