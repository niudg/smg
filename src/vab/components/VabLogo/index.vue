<template>
  <div
    class="logo-container"
    :class="{
      ['logo-container-' + theme.layout]: true,
    }"
  >
    <router-link to="/">
      <span class="logo">
        <!-- 使用自定义svg示例 -->
        <!-- <vab-icon v-if="logo" :icon="logo" is-custom-svg /> -->
        <!-- <svg-icon icon-class="upload" /> -->
        <img style="margin-right: 10px" src="~@/assets/logo.png" />
      </span>
      <span
        class="title"
        :class="{ 'hidden-xs-only': theme.layout === 'horizontal' }"
      >
        {{ title }}
      </span>
    </router-link>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'VabLogo',
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        title: 'settings/title',
        theme: 'settings/theme',
        collapse: 'settings/collapse',
      }),
    },
    methods: {
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
        toggleCollapse: 'settings/toggleCollapse',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  @mixin container {
    position: relative;
    height: $base-top-bar-height;
    overflow: hidden;
    line-height: $base-top-bar-height;
    background: transparent;
  }

  @mixin logo {
    display: inline-block;
    width: 32px;
    height: 32px;
    color: $base-title-color;
    vertical-align: middle;
  }

  @mixin title {
    display: inline-block;
    margin-left: 5px;
    overflow: hidden;
    font-size: 20px;
    line-height: 55px;
    color: $base-title-color;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .logo-container {
    &-horizontal,
    &-common {
      @include container;

      .logo {
        svg,
        img {
          @include logo;
        }
      }

      .title {
        @include title;
      }
    }

    &-vertical,
    &-column,
    &-comprehensive,
    &-float {
      @include container;

      height: $base-logo-height;
      line-height: $base-logo-height;
      text-align: center;

      .logo {
        svg,
        img {
          @include logo;
        }
      }

      .title {
        @include title;
        max-width: $base-left-menu-width - 60;
      }
    }

    &-column {
      background: $base-column-second-menu-background !important;

      .logo {
        position: fixed;
        top: 0;
        display: block;
        width: $base-left-menu-width-min;
        height: $base-logo-height;
        margin: 0;
        background: $base-column-first-menu-background;
      }

      .title {
        padding-right: 15px;
        padding-left: 15px;
        margin-left: $base-left-menu-width-min !important;
        color: $base-color-black !important;
        background: $base-column-second-menu-background !important;
        @include title;
      }
    }
  }
</style>
