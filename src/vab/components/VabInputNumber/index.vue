<template>
  <el-form-item
    ref="formItem"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
  >
    <el-input-number
      v-model="innerValue"
      v-bind="{ ...$attrs }"
      autocomplete="off"
      :controls="false"
      @change="(value) => setModel(value)"
    />
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabInputNumber',
    mixins: [mixins],
    props: {
      modelModifiers: {
        type: Object,
        default: () => ({ number: true }),
      },
    },
  }
</script>
