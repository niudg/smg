<template>
  <div>
    <div v-if="showPlaceHolder" :style="stylePlaceHolder" />
    <div
      ref="scroll-affix"
      :style="affixStyle"
      :class="
        showPlaceHolder
          ? 'scroll-affix-container'
          : 'scroll-affix-container pd0'
      "
    >
      <slot
        v-bind="{
          affixed: getAffixed,
        }"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VabAffix',
    props: {
      offsetTop: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        affixStyle: {
          position: 'initial',
          top: 'initial',
        },

        // プレースホルダ
        stylePlaceHolder: {},

        // プレースホルダアリア
        showPlaceHolder: false,

        // インスタンス
        instance: '',

        // インスタンスの初期状態の位置を記録するために使用されます
        defaultInstancePosition: '',
      }
    },
    computed: {
      getAffixed() {
        return this.affixStyle.position === 'fixed'
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.instance = this.$refs['scroll-affix']
        this.createAffix()
      })
    },
    beforeDestroy() {
      document
        .getElementById('app')
        .removeEventListener('scroll', this.scrollListener)
    },
    methods: {
      getInstanceRect() {
        return this.instance.getBoundingClientRect()
      },

      getContainerScrollTop() {
        return document.getElementById('app').scrollTop
      },

      createAffix() {
        this.defaultInstancePosition = this.getInstanceRect().top
        this.beforeListener()
        document
          .getElementById('app')
          .addEventListener('scroll', this.scrollListener)
      },

      setFixedForInstance() {
        const instanceRect = this.getInstanceRect()

        if (instanceRect.width > 0) {
          this.affixStyle = {
            position: 'fixed',
            top: `${this.offsetTop}px`,
            zIndex: '999',
            width: `${instanceRect.width}px`,
            border: '1px solid #ccc',
            'border-radius': '5px',
            'box-shadow': '0 2px 12px 0 rgb(0 0 0 / 10%)',
          }
          this.$emit('change', true)
        }
      },

      // 固定後にインスタンスの空白のプレースホルダーを設定するために使用されます
      setPlaceHolder() {
        this.showPlaceHolder = true
        const instanceRect = this.getInstanceRect()
        this.stylePlaceHolder = {
          width: `${instanceRect.width}px`,
          height: `${instanceRect.height}px`,
        }
      },
      beforeListener() {
        // 次回ページに入ったときにスクロールバーの位置がインスタンスを超えていることがわかった場合は、すぐに修正されます
        if (this.defaultInstancePosition < this.offsetTop) {
          this.setFixedForInstance()
          this.setPlaceHolder()
        }

        this.defaultInstancePosition =
          this.getContainerScrollTop() + this.defaultInstancePosition
      },
      scrollListener() {
        const offsetTop = this.getInstanceRect().top
        // インスタンスとトップの間の距離がちょうど近い場合 (0px+トップの距離を設定)、すぐに修正されます
        if (offsetTop < this.offsetTop) {
          this.setFixedForInstance()
          this.setPlaceHolder()
        }

        const containerScrollTop = this.getContainerScrollTop()
        const isArrivalDefault =
          this.defaultInstancePosition - this.offsetTop >= containerScrollTop

        // インスタンスの初期位置からセットトップ距離を差し引いた値が、スクロールバーでスクロールした距離にちょうど近い場合 (つまり、上にスクロールした場合) && インスタンスが既に固定状態にある場合は、固定を解除します
        if (isArrivalDefault && this.affixStyle.position === 'fixed') {
          this.affixStyle = {}
          this.showPlaceHolder = false
          this.stylePlaceHolder = {}
          this.$emit('change', false)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .scroll-affix-container {
    position: initial;
    top: initial;
    background-color: #fff;
    padding: 10px;
  }

  .pd0 {
    padding: 0;
    padding-right: 50px;
  }
</style>
