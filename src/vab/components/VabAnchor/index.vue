<template>
  <div :class="affix ? 'toc-affix' : ''">
    <div class="vab-anchor-wrapper">
      <div class="vab-anchor">
        <div class="vab-anchor-ink" :style="style">
          <span
            ref="inkNode"
            :class="['vab-anchor-ink-ball', activeLink ? 'visible' : '']"
          ></span>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
  const sharpMatcherRegx = /#([^#]+)$/
  import addEventListener from '@/utils/addEventListener'
  import scrollTo from '@/utils/scrollTo'
  import getScroll from '@/utils/getScroll'

  function getOffsetTop(element, container) {
    if (!element) {
      return 0
    }

    if (!element.getClientRects().length) {
      return 0
    }

    const rect = element.getBoundingClientRect()

    if (rect.width || rect.height) {
      if (container === window) {
        container = element.ownerDocument.documentElement
        return rect.top - container.clientTop
      }
      return rect.top - container.getBoundingClientRect().top - 120
    }

    return rect.top
  }

  export default {
    name: 'VabAnchor',
    provide() {
      return {
        vabAnchor: {
          registerLink: (link) => {
            if (!this.links.includes(link)) {
              this.links.push(link)
            }
          },
          unregisterLink: (link) => {
            const index = this.links.indexOf(link)
            if (index !== -1) {
              this.links.splice(index, 1)
            }
          },
          $data: this.$data,
          scrollTo: this.handleScrollTo,
        },
        vabAnchorContext: this,
      }
    },
    props: {
      offsetTop: {
        type: Number,
        default: null,
      },
      bounds: {
        type: Number,
        default: null,
      },
      affix: {
        type: Boolean,
        default: true,
      },
      showInkInFixed: {
        type: Boolean,
        default: false,
      },
      getContainer: {
        type: Function,
        default: () => {
          return document.getElementById('app')
        },
      },
      wrapperStyle: {
        type: Object,
        default: null,
      },
      getCurrentAnchor: {
        type: Function,
        default: undefined,
      },
      targetOffset: {
        type: Number,
        default: null,
      },
    },
    data() {
      return {
        links: [],
        activeLink: null,
        style: null,
      }
    },
    created() {
      this.style = {
        maxHeight: this.offsetTop
          ? `calc(100vh - ${this.offsetTop}px)`
          : '100vh',
        ...this.wrapperStyle,
      }
    },
    updated() {
      this.$nextTick(() => {
        if (this.scrollEvent) {
          const { getContainer } = this
          const currentContainer = getContainer()
          if (this.scrollContainer !== currentContainer) {
            this.scrollContainer = currentContainer
            this.scrollEvent.remove()
            this.scrollEvent = addEventListener(
              this.scrollContainer,
              'scroll',
              this.handleScroll
            )
            this.handleScroll()
          }
        }
        this.updateInk()
      })
    },
    mounted() {
      this.$nextTick(() => {
        const { getContainer } = this
        this.scrollContainer = getContainer()
        this.scrollEvent = addEventListener(
          this.scrollContainer,
          'scroll',
          this.handleScroll
        )
        this.handleScroll()
      })
    },
    beforeDestroy() {
      if (this.scrollEvent) {
        this.scrollEvent.remove()
      }
    },
    methods: {
      getCurrentActiveLink(offsetTop = 0, bounds = 5) {
        const { getCurrentAnchor } = this

        if (typeof getCurrentAnchor === 'function') {
          return getCurrentAnchor()
        }
        const activeLink = ''
        if (typeof document === 'undefined') {
          return activeLink
        }

        const linkSections = []
        const { getContainer } = this
        const container = getContainer()
        this.links.forEach((link) => {
          const sharpLinkMatch = sharpMatcherRegx.exec(link.toString())
          if (!sharpLinkMatch) {
            return
          }
          const target = document.getElementById(sharpLinkMatch[1])
          if (target) {
            const top = getOffsetTop(target, container)
            if (top < offsetTop + bounds) {
              linkSections.push({
                link,
                top,
              })
            }
          }
        })

        if (linkSections.length) {
          const maxSection = linkSections.reduce((prev, curr) =>
            curr.top > prev.top ? curr : prev
          )
          return maxSection.link
        }
        return this.links[0]
      },
      setCurrentActiveLink(link) {
        const { activeLink } = this
        if (activeLink !== link) {
          Object.assign(this.$data, { activeLink: link })
          this.$forceUpdate()
          this.$emit('change', link)
        }
      },

      handleScroll() {
        if (this.animating) {
          return
        }
        const { offsetTop, bounds, targetOffset } = this
        const currentActiveLink = this.getCurrentActiveLink(
          targetOffset !== undefined ? targetOffset : offsetTop || 0,
          bounds
        )
        this.setCurrentActiveLink(currentActiveLink)
      },

      handleScrollTo(link) {
        const { offsetTop, getContainer, targetOffset } = this
        this.setCurrentActiveLink(link)
        const container = getContainer()
        const scrollTop = getScroll(container, true)
        const sharpLinkMatch = sharpMatcherRegx.exec(link)
        if (!sharpLinkMatch) {
          return
        }
        const targetElement = document.getElementById(sharpLinkMatch[1])
        if (!targetElement) {
          return
        }

        const eleOffsetTop = getOffsetTop(targetElement, container)
        let y = scrollTop + eleOffsetTop
        y -= targetOffset !== undefined ? targetOffset : offsetTop || 0
        this.animating = true

        scrollTo(y, {
          callback: () => {
            this.animating = false
          },
          getContainer,
        })
      },
      updateInk() {
        if (typeof document === 'undefined') {
          return
        }
        const linkNode = this.$el.getElementsByClassName(
          `vab-anchor-link-active`
        )[0]
        if (linkNode) {
          this.$refs.inkNode.style.top = `${
            linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5
          }px`
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .toc-affix {
    width: 80px;
    position: fixed;
    top: calc(
      #{$base-nav-height} + #{$base-tabs-height} + #{$base-padding} * 2 + 55px
    );
    right: 15px;
  }

  $vab-border-width: 1px;

  .vab-anchor {
    position: relative;
    padding-left: $vab-border-width;
    &-wrapper {
      margin-left: -4px;
      padding-left: 4px;
      overflow: auto;
    }
    &-ink {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      &::before {
        position: relative;
        display: block;
        width: $vab-border-width;
        height: 100%;
        margin: 0 auto;
        background-color: $base-border-color-base;
        content: ' ';
      }
      &-ball {
        position: absolute;
        left: 50%;
        display: none;
        width: 8px;
        height: 8px;
        background-color: $base-color-white;
        border: 2px solid #409eff;
        border-radius: 8px;
        transform: translateX(-50%);
        transition: top 0.3s ease-in-out;
        &.visible {
          display: inline-block;
        }
      }
    }
  }
</style>
