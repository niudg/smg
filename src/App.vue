<template>
  <div id="app" ref="appRef" @scroll="handleScroll">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      scrollTo() {
        return this.$store.getters['settings/scrollTop']
      },
      localTime() {
        return this.$store.getters['settings/localTime']
      },
      indexName() {
        return this.$route.name
      },
    },
    watch: {
      localTime() {
        this.$nextTick(() => {
          if (this.indexName == 'Index') {
            this.$refs.appRef.scrollTo({
              top: this.scrollTo,
            })
          }
        })
      },
    },
    mounted() {},
    methods: {
      handleScroll(event) {
        if (this.indexName == 'Index') {
          this.$store.dispatch('settings/setScrollTop', event.target.scrollTop)
        }
      },
    },
  }
</script>
