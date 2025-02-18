<template>
  <el-form-item
    :prop="$attrs['prop']"
    :label-width="$attrs['label-width']"
    :style="$attrs['style']"
  >
    <template #label>
      <el-button type="primary" @click="handleClick">
        {{ buttonName }}
      </el-button>
    </template>
    <el-input
      v-model="innerValue"
      v-input.num_alp
      maxlength="3"
      @input="setModel"
      @blur="handleBlur"
    />
    <template #error="{ error }">
      <el-tooltip class="item" effect="dark" :content="error" placement="left">
        <div class="el-form-item__error">{{ error }}</div>
      </el-tooltip>
    </template>
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabButtonInput',
    componentName: 'VabButtonInput',
    mixins: [mixins],
    props: {
      buttonName: {
        type: String,
        default: null,
      },
      index: {
        type: Number,
        default: 0,
      },
    },
    created() {
      if (this.$attrs['trigger']) {
        this.trigger = this.$attrs['trigger'].split(',')
      }
    },
    methods: {
      handleClick() {
        this.$emit('click', { row: this.rowItem, index: this.index })
      },
      handleBlur() {
        this.changeRowData(this.setRowItem)
        this.$emit('blur', { row: this.rowItem, index: this.index })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '@/vab/styles/component.scss';
</style>
