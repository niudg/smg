<template>
  <div :class="['vab-anchor-link', active ? 'vab-anchor-link-active' : '']">
    <span
      :title="title"
      :class="[
        'vab-anchor-link-title',
        active ? 'vab-anchor-link-title-active' : '',
      ]"
      @click="handleClick"
    >
      {{ title }}
    </span>
    <slot />
  </div>
</template>
<script>
  export default {
    name: 'VabAnchorLink',
    inject: {
      vabAnchor: { default: () => ({}) },
      vabAnchorContext: { default: () => ({}) },
    },
    props: {
      href: {
        type: String,
        default: '#',
      },
      title: {
        type: String,
        default: '',
      },
      target: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        style: null,
        active: null,
      }
    },
    watch: {
      href(val, oldVal) {
        this.$nextTick(() => {
          this.vabAnchor.unregisterLink(oldVal)
          this.vabAnchor.registerLink(val)
        })
      },
      'vabAnchor.$data': {
        handler(newVal) {
          this.active = newVal.activeLink === this.href
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.vabAnchor.registerLink(this.href)
    },

    beforeDestroy() {
      this.vabAnchor.unregisterLink(this.href)
    },
    created() {
      this.style = {
        maxHeight: this.offsetTop
          ? `calc(100vh - ${this.offsetTop}px)`
          : '100vh',
        ...this.wrapperStyle,
      }
    },
    methods: {
      handleClick(e) {
        this.vabAnchor.scrollTo(this.href)
        const { scrollTo } = this.vabAnchor
        const { href, title } = this.$props
        if (this.vabAnchorContext.$emit) {
          this.vabAnchorContext.$emit('click', e, { title, href })
        }
        scrollTo(href)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .vab-anchor {
    &.fixed &-ink &-ink-ball {
      display: none;
    }

    &-link {
      padding: 7px 0 7px 16px;
      line-height: 1.143;

      &-title {
        position: relative;
        display: block;
        margin-bottom: 6px;
        //overflow: hidden;
        color: $base-color-black;
        cursor: pointer;
        //white-space: nowrap;
        word-wrap: break-word;
        transition: all 0.3s;

        &:only-child {
          margin-bottom: 0;
        }
      }
      &-active > &-title {
        color: #409eff;
      }
      &-link &-link {
        padding-top: 5px;
        padding-bottom: 5px;
      }
    }
  }
</style>
