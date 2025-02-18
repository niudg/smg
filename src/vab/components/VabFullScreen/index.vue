<template>
  <vab-icon
    v-if="theme.showFullScreen"
    ref="fullScreen"
    :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
    @click="click"
  />
</template>

<script>
  import { mapGetters } from 'vuex'
  import screenfull from 'screenfull'

  export default {
    name: 'VabFullScreen',
    data() {
      return {
        isFullscreen: false,
      }
    },
    computed: {
      ...mapGetters({
        theme: 'settings/theme',
      }),
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.destroy()
    },
    methods: {
      click() {
        if (!screenfull.isEnabled) {
          this.$baseMessage(
            this.format(
              this.$t(`validateMessage.${this.$messageCode.I00000111.name}`),
              '全画面表示に失敗'
            ),
            'error',
            'vab-hey-message-error'
          )
        }
        screenfull.toggle()
        this.$emit('refresh')
      },
      change() {
        this.isFullscreen = screenfull.isFullscreen
      },
      init() {
        if (screenfull.isEnabled) screenfull.on('change', this.change)
      },
      destroy() {
        if (screenfull.isEnabled) screenfull.off('change', this.change)
      },
    },
  }
</script>
