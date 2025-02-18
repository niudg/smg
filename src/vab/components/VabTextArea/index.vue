<template>
  <el-form-item
    ref="formItem"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
    :style="$attrs['style']"
  >
    <el-input
      v-model="innerValue"
      v-specialChar
      v-bind="$attrs"
      type="textarea"
      autocomplete="off"
      :disabled="disabled"
      @input="(value) => setModel(value)"
    >
      <template v-if="$slots.append" slot="append">
        <span v-for="item in $slots.append" :key="item.text">
          {{ item.text }}
        </span>
      </template>
    </el-input>
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabTextarea',
    mixins: [mixins],
  }
</script>
