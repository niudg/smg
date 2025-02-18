<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :size="size"
    :before-close="handleClose"
    :destroy-on-close="true"
    class="vab-global-dialog"
  >
    <div class="dialog-content">
      <component :is="currentView" v-if="visible" v-bind="componentProps" />
    </div>
  </el-dialog>
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

      return Promise.reject(new Error(`Component ${view} not found`))
    }
  }

  export default {
    name: 'VabGlobalDialog',
    data() {
      return {
        visible: false,
        title: '',
        direction: 'rtl',
        size: '60%',
        currentView: null,
        componentProps: {},
      }
    },
    methods: {
      async show({
        title = '',
        direction = 'rtl',
        size = '60%',
        route,
        query = {},
      }) {
        this.direction = direction
        this.size = size
        this.componentProps = { query }

        try {
          // 加载组件
          const component = await loadView(route)()
          this.currentView = component.default
          this.title = this.currentView?.name ?? title
          this.visible = true
        } catch (error) {
          console.error('Failed to load component:', error)
        }
      },

      handleClose(done) {
        this.visible = false
        this.currentView = null
        this.componentProps = {}
        done()
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
