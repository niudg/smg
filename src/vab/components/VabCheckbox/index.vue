<template>
  <el-form-item
    v-if="$attrs['label-postion'] == 'left'"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
  >
    <el-checkbox
      ref="checkbox"
      v-model="innerValue"
      :disabled="disabled"
      :indeterminate="isIndeterminate"
      :name="$attrs['prop']"
      :label="$attrs['label-checkbox']"
      @change="onChange"
    ></el-checkbox>
  </el-form-item>
  <el-form-item
    v-else-if="$attrs['prop']"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
  >
    <el-checkbox
      ref="checkbox"
      v-model="innerValue"
      :name="$attrs['prop']"
      :label="$attrs['label']"
      :disabled="disabled"
      :indeterminate="isIndeterminate"
      @change="onChange"
    ></el-checkbox>
  </el-form-item>
  <el-form-item
    v-else
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
  >
    <el-checkbox
      ref="checkbox"
      v-model="innerValue"
      :name="$attrs['prop']"
      :label="$attrs['label']"
      :disabled="disabled"
      :indeterminate="isIndeterminate"
      @change="onChange"
    ></el-checkbox>
  </el-form-item>
</template>
<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabCheckbox',
    componentName: 'VabCheckbox',
    mixins: [mixins],
    data() {
      return {
        type: 'boolean',
        isIndeterminate: null,
      }
    },
    methods: {
      getType() {
        return this.$attrs.type || 'boolean'
      },
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

      setValue(val) {
        if (this.codeEnum) {
          val = this.checkEnumFlag(val)
        }
        this.innerValue = val
      },

      setIndeterminate(immediate) {
        this.isIndeterminate = immediate
      },
    },
  }
</script>
