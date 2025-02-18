<template>
  <div class="drawer-content">
    <component
      :is="currentView"
      ref="currentViewRef"
      v-bind="componentProps"
      :key="componentKey"
    />
  </div>
</template>

<script>
  // 使用 require.context 加载所有视图组件
  const viewModules = require.context('@/views', true, /\/index\.vue$/)

  // 组件加载函数
  const loadView = (view) => {
    return () => {
      // 构建组件路径
      const componentPath = `./${view}/index.vue`
      // 检查组件是否存在
      if (viewModules.keys().includes(componentPath)) {
        return Promise.resolve(viewModules(componentPath))
      }
    }
  }

  export default {
    name: 'VabLoadPage',
    data() {
      return {
        currentView: null,
        componentProps: {},
        show: false,
        componentKey: 0,
      }
    },
    methods: {
      async load({ route, query = {}, mode = {} }) {
        this.componentProps = { query, mode }
        try {
          // 更新 key 以强制重新渲染
          this.componentKey = Date.now()

          // 加载组件
          const component = await loadView(route)()
          this.currentView = component.default
          this.$nextTick(() => {
            const children = this.$refs.currentViewRef.$children || []
            const vabDrawer = children.find(
              (child) => child.$options.name === 'VabDrawer'
            )
            if (vabDrawer) {
              vabDrawer.init()
            }
          })
        } catch (error) {
          console.error('Failed to load component:', error)
        }
      },
    },
  }
</script>

<style lang="scss">
  .vab-global-drawer {
    .el-drawer {
      .el-drawer__header {
        margin-bottom: 0;
        padding: 16px 20px;
        border-bottom: 1px solid #dcdfe6;

        span {
          font-size: 16px;
          font-weight: 500;
        }
      }

      .el-drawer__body {
        padding: 0;
        height: calc(100% - 55px);
        overflow: auto;
      }
    }

    .drawer-content {
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
</style>
