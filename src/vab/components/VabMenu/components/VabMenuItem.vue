<template>
  <el-menu-item
    :index="itemOrMenu.path"
    :disabled="collapse"
    @click="handleLink"
  >
    <!-- <vab-icon
      v-if="itemOrMenu.meta && itemOrMenu.meta.icon"
      :icon="itemOrMenu.meta.icon"
      :is-custom-svg="itemOrMenu.meta.isCustomSvg"
      :title="translateTitle(itemOrMenu.meta.title)"
    /> -->
    <span
      :title="translateTitle(itemOrMenu.meta.title)"
      class="w142 margin_right_8"
    >
      {{ translateTitle(itemOrMenu.meta.title) }}
    </span>
    <svg-icon
      v-if="itemOrMenu.meta.icon && !collapse"
      :icon-class="itemOrMenu.meta.icon"
      style="font-size: 18px"
    />
    <el-tag
      v-if="itemOrMenu.meta && itemOrMenu.meta.badge"
      effect="dark"
      type="danger"
    >
      {{ itemOrMenu.meta.badge }}
    </el-tag>
    <span
      v-if="itemOrMenu.meta && itemOrMenu.meta.dot"
      class="vab-dot vab-dot-error"
    >
      <span />
    </span>
  </el-menu-item>
</template>

<script>
  import { routerMode, linkPath } from '@/config'
  import { translateTitle } from '@/utils/i18n'
  import { isExternal } from '@/utils/validate'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'VabMenuItem',
    props: {
      itemOrMenu: {
        type: Object,
        default() {
          return null
        },
      },
    },
    computed: {
      ...mapGetters({
        device: 'settings/device',
        visitedRoutes: 'tabs/visitedRoutes',
        collapse: 'settings/collapse',
      }),
    },
    methods: {
      translateTitle,
      ...mapActions({
        foldSideBar: 'settings/foldSideBar',
        delVisitedRoute: 'tabs/delVisitedRoute',
        setReloadPage: 'notify/setReloadPage',
      }),
      toLastTab() {
        const latestView = this.visitedRoutes.slice(-1)[0]
        if (latestView) this.$router.push(latestView)
        else this.$router.push('/')
      },
      handleLink() {
        const routePath = this.itemOrMenu.path
        const target = this.itemOrMenu.meta.target
        if (target == '_blank') {
          if (this.itemOrMenu.name == 'tomooni') {
            if (linkPath) {
              window.open(linkPath, '_blank')
            }
            return
          } else if (this.itemOrMenu.name == 'hyperlink') {
            window.open('./link/index.html', '_blank')
            return
          } else if (isExternal(routePath)) {
            window.open(routePath)
          } else if (this.$route.fullPath !== routePath)
            routerMode === 'hash'
              ? window.open('/#' + routePath)
              : window.open(routePath)
        } else {
          if (isExternal(routePath)) window.location.href = routePath
          else if (this.$route.path !== routePath) {
            if (this.device === 'mobile') this.foldSideBar()

            // if (this.visitedRoutes.length > 5) {
            //   this.$baseMessage(
            //     'タブ数(6)が上限に達しました。開いていたタブを閉じてください',
            //     'error'
            //   )
            //   return

            // }
            this.$router.push(this.itemOrMenu.path)
          } else {
            this.setReloadPage({
              name: this.itemOrMenu.name,
              value: false,
            })
            this.$baseEventBus.$emit('reload-router-view')
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-tag {
      float: right;
      height: 16px;
      padding-right: 4px;
      padding-left: 4px;
      margin-top: #{math.div($base-menu-item-height - 16, 2)};
      line-height: 16px;
      border: 0;
    }
  }

  .vab-dot {
    float: right;
    margin-top: #{math.div($base-menu-item-height - 6, 2) + 1};
  }
</style>
