<template>
  <el-drawer
    :visible.sync="visible"
    :size="drawerSize"
    :destroy-on-close="true"
    :direction="drawerDirection"
    :show-close="true"
    :wrapper-closable="drawerClose"
    :modal="drawerMask"
    :class="[
      'vab-global-drawer',
      { 'center-drawer': isCenterDrawer, 'custom-drawer': isCustomDrawer },
    ]"
    :style="customDrawerStyle"
    v-bind="$attrs"
  >
    <template v-if="enableTitle" #title>
      <slot name="title">{{ $attrs.title }}</slot>
      <div class="flex_end">
        <div class="drawer-header-actions">
          <el-button
            v-for="(action, index) in headerActionList"
            :key="index"
            :type="action.isClose ? '' : 'primary'"
            @click="handleHeaderAction(action)"
          >
            {{ action.name }}
          </el-button>
        </div>
      </div>
    </template>

    <div class="drawer-content">
      <slot />

      <template v-if="enableFooter">
        <div class="drawer-footer">
          <el-button
            v-for="(action, index) in footerActionList"
            :key="index"
            :type="action.isClose ? '' : 'primary'"
            @click="handleFooterAction(action)"
          >
            {{ action.name }}
          </el-button>
        </div>
      </template>
    </div>
  </el-drawer>
</template>

<script>
  import { handleEventList } from '@/utils/eventListHandler'
  export default {
    name: 'VabDrawer',
    componentName: 'VabDrawer',
    inject: {
      page: {
        default: '',
      },
    },
    inheritAttrs: false,
    props: {
      drawerClose: {
        type: Boolean,
        default: true,
      },
      drawerMask: {
        type: Boolean,
        default: true,
      },
      enableTitle: {
        type: Boolean,
        default: true,
      },
      enableFooter: {
        type: Boolean,
        default: false,
      },
      footerActionList: {
        type: Array,
        default: () => [],
      },
      headerActionList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        visible: false,
        currentView: null,
        componentProps: {},
        direction: {
          left: 'ltr',
          right: 'rtl',
          top: 'ttb',
          bottom: 'btt',
          center: 'center',
          custom: 'custom',
        },
      }
    },
    computed: {
      isCenterDrawer() {
        return this.$attrs['drawer-position'] === 'center'
      },
      drawerDirection() {
        let direction = this.direction[this.$attrs['drawer-position']] || 'ltr'
        if (direction === 'custom' || direction === 'center') {
          return 'ltr'
        }
        return direction
      },
      drawerSize() {
        const position = this.$attrs['drawer-position']
        const width = this.$attrs['drawer-width']
        if (['left', 'right'].includes(position)) {
          return width || '30%'
        }
        return null
      },
      isCustomDrawer() {
        return this.$attrs['drawer-position'] === 'custom'
      },
      customDrawerStyle() {
        const width = this.$attrs['drawer-width']
        const height = this.$attrs['drawer-height']
        return {
          '--drawer-width': width,
          '--drawer-height': height,
          '--drawer-margin-left': this.$attrs.mleft || '0px',
          '--drawer-margin-top': this.$attrs.mtop || '0px',
        }
      },
    },
    methods: {
      init() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      handleFooterAction(action) {
        if (action.eventList && action.eventList.length > 0) {
          handleEventList(
            'click',
            {
              page: this.page,
              vm: this,
            },
            {
              eventList: action.eventList,
            }
          )
        }
      },
    },
  }
</script>

<style lang="scss">
  .vab-global-drawer {
    .el-drawer {
      animation: drawer-fade-in 0.3s ease-in-out;

      .el-drawer__header {
        margin-bottom: 0;
        padding: 16px 20px;
        border-bottom: 1px solid #dcdfe6;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 16px;
          font-weight: 500;
        }

        .drawer-header-actions {
          margin-left: auto;
          display: flex;
          gap: 8px;
        }
      }

      .el-drawer__body {
        padding: 0;
        height: calc(100% - 55px);
        overflow: hidden;
      }
    }

    .drawer-content {
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 70px !important;
    }

    .drawer-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px 20px;
      text-align: right;
      background: #fff;
      border-top: 1px solid #dcdfe6;
    }

    @keyframes drawer-fade-in {
      0% {
        opacity: 0;
        transform: translate(0, 10px);
      }
      100% {
        opacity: 1;
        transform: translate(0, 0);
      }
    }

    &.center-drawer {
      .el-drawer {
        animation: drawer-fade-in-center 0.3s ease-in-out;
        left: 50% !important;
        top: 50% !important;
        transform: translate(-50%, -50%);
        margin: 0;
        position: fixed;
        width: var(--drawer-width);
        height: var(--drawer-height);

        .el-drawer__body {
          height: auto;
          max-height: 90vh;
        }
      }

      .drawer-content {
        height: auto;
        max-height: calc(90vh - 115px);
        overflow-y: auto;
        overflow-x: hidden;
      }

      @keyframes drawer-fade-in-center {
        0% {
          opacity: 0;
          transform: translate(-50%, -45%);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }
    }

    &.custom-drawer {
      .el-drawer {
        position: fixed;
        margin: 0;
        margin-left: var(--drawer-margin-left) !important;
        margin-top: var(--drawer-margin-top) !important;
        transform: none;
        width: var(--drawer-width);
        height: var(--drawer-height);

        .el-drawer__body {
          height: auto;
          max-height: calc(100vh - var(--drawer-margin-top) - 60px);
        }
      }

      .drawer-content {
        height: auto;
        max-height: calc(100vh - var(--drawer-margin-top) - 175px);
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
  }
</style>
