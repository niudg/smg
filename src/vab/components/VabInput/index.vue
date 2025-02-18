<template>
  <el-form-item
    ref="formItem"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :style="$attrs['style']"
  >
    <template v-if="$attrs['label']" #label>
      <el-popover
        v-if="tipContent"
        placement="top-start"
        trigger="hover"
        :content="tipContent"
      >
        <span slot="reference">
          <vab-icon icon="information-line" />
          {{ $attrs['label'] }}
        </span>
      </el-popover>
      <span v-else>{{ $attrs['label'] }}</span>
    </template>
    <el-input
      v-if="$attrs['prop']"
      :id="$attrs['prop']"
      ref="elInput"
      v-model.trim="innerValue"
      v-specialChar
      :class="className"
      :disabled="disabled"
      :maxlength="$attrs['maxlength']"
      autocomplete="off"
      :placeholder="$attrs['placeholder']"
      @input="(value) => setModel(value)"
      @blur="handleBlur"
    >
      <template v-if="$slots.append" slot="append">
        <slot name="append"></slot>
      </template>
    </el-input>
    <el-input
      v-else
      v-specialChar
      :placeholder="$attrs['placeholder']"
      :value="$attrs['value']"
      :disabled="disabled"
      :maxlength="$attrs['maxlength']"
      autocomplete="off"
    >
      <template v-if="$slots.append" slot="append">
        <slot name="append"></slot>
      </template>
    </el-input>
    <template #error="{ error }">
      <el-tooltip class="item" effect="dark" :content="error" placement="left">
        <div class="el-form-item__error">{{ error }}</div>
      </el-tooltip>
    </template>
    <div v-if="showAfter" class="input_after">{{ showAfter }}</div>
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabInput',
    componentName: 'VabInput',
    mixins: [mixins],
    data() {
      return {
        className: null,
      }
    },
    created() {
      if (this.$attrs['trigger']) {
        this.trigger = this.$attrs['trigger'].split(',')
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import '@/vab/styles/component.scss';
</style>
