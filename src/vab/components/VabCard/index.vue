<template>
  <el-card :body-style="bodyStyle" class="vab-card" :shadow="shadow">
    <template v-if="$slots.header || header" #header>
      <slot name="header">{{ header }}</slot>
      <el-button
        style="float: right; position: relative; bottom: 5px"
        type="text"
        size="medium"
        :icon="isShrink ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
        @click="shrink"
      ></el-button>
    </template>
    <div v-show="isShrink">
      <el-skeleton
        v-if="localSkeleton"
        animated
        :loading="skeletonShow"
        :rows="skeletonRows"
      >
        <template #default>
          <slot class="vab-card-transition" />
        </template>
      </el-skeleton>
      <slot v-else class="vab-card-transition" />
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'VabCard',
    inject: {
      pageComponent: {
        default: '',
      },
    },
    props: {
      header: {
        type: String,
        default: '',
      },
      bodyStyle: {
        type: Object,
        default: () => {
          return {}
        },
      },
      apiUrl: {
        type: String,
        default: '',
      },
      primaryKey: {
        type: String,
        default: '',
      },
      prop: {
        type: String,
        default: '',
      },
      queryParams: {
        type: Object,
        default: null,
      },
      shadow: {
        type: String,
        default: 'hover',
      },
      skeleton: {
        type: Boolean,
        default: true,
      },

      skeletonRows: {
        type: Number,
        default: 7,
      },
    },
    data() {
      return {
        params: null,
        localSkeleton: this.skeleton,
        skeletonShow: true,
        isShrink: true,
      }
    },
    created() {
      this.localSkeleton = false
    },
    methods: {
      shrink() {
        if (this.isShrink) {
          this.isShrink = false
        } else {
          this.isShrink = true
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .vab-card {
    ::v-deep .el-popover__reference-wrapper .el-button--mini {
      padding: 6px 3px !important;
    }
    &-transition {
      transition: $base-transition;
    }
  }
</style>
