<template>
  <el-form-item
    v-if="$attrs['label-postion'] == 'left'"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
  >
    <el-radio
      v-model="innerValue"
      :label="true"
      :disabled="disabled"
      @change="onChange"
    >
      {{ $attrs['label'] }}
    </el-radio>
  </el-form-item>
  <el-form-item
    v-else
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
  >
    <el-radio
      :id="$attrs['prop']"
      :value="$attrs['value']"
      :label="$attrs['radio-label']"
      :disabled="disabled"
      @change="onChange"
    >
      {{ $attrs['label'] }}
    </el-radio>
  </el-form-item>
</template>
<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabRadio',
    componentName: 'VabRadio',
    mixins: [mixins],
    created: function () {
      this.type = 'boolean'
      this.$baseEventBus.$on('ComponentReset', () => {
        this.setModel(null)
      })
    },
    methods: {
      onChange(value) {
        let val = value
        if (this.codeEnum) {
          if (value) {
            val = this.codeEnum.enum_1.value
          } else {
            if (this.nullable) {
              val = null
            } else {
              if (this.$baseLodash.has(this.codeEnum, 'enum_0')) {
                val = this.codeEnum.enum_0.value
              } else {
                val = this.codeEnum.enum_blank.value
              }
            }
          }
        }
        this.handleChange(val)
      },
    },
  }
</script>
