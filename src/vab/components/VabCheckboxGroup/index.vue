<template>
  <el-form-item
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
  >
    <el-checkbox-group
      v-model="labelResult"
      :disabled="disabled"
      :class="customClass"
      @change="handleCheckChange"
    >
      <el-checkbox
        v-for="(item, index) in labelList"
        :key="index"
        :label="item"
        :class="labelClass"
      ></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabCheckboxGroup',
    componentName: 'VabCheckboxGroup',
    mixins: [mixins],
    inject: {
      pageComponent: {
        default: '',
      },
    },
    props: {
      enableConvert: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        labelList: [],
        labelResult: [],
        labelMap: {},
        valueMap: {},
        type: 'array',
      }
    },
    watch: {
      innerValues(val) {
        if (val && val.length > 0) {
          this.$nextTick(() => {
            this.setValue(val)
          })
        }
      },
      innerValue(val) {
        if (val) {
          this.$nextTick(() => {
            this.setValue(val)
          })
        }
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      //チェックボックスの変更イベント
      handleCheckChange(val) {
        let vals = val.map((item) => this.labelMap[item])
        if (this.enableConvert) {
          vals = JSON.stringify(vals)
        }
        this.setModel(vals)
      },

      setValue(val) {
        if (val) {
          if (this.$baseLodash.isString(val) && this.enableConvert) {
            val = JSON.parse(val)
          }
          this.labelResult = val.map((item) => this.valueMap[item])
        }
      },
      handleFieldReset() {
        if (!this.disabled) {
          this.labelResult = []
          this.setModel(null)
        }
      },
    },
  }
</script>
