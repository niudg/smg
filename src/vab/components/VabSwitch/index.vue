<template>
  <el-form-item
    v-if="$attrs['prop']"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
  >
    <el-switch
      v-model="innerValue"
      :disabled="$attrs['disabled']"
      @change="onChange"
    />
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabSwitch',
    componentName: 'VabSwitch',
    mixins: [mixins],

    data() {
      return {}
    },
    created() {},
    methods: {
      onChange(value) {
        this.setModel(value)
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '@/vab/styles/component.scss';
</style>
