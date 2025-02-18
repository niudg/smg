<template>
  <el-form-item
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
  >
    <el-radio-group v-model="labelResult" :disabled="disabled">
      <el-radio
        v-for="(item, index) in labelList"
        :key="index"
        :label="item"
        :class="labelClass"
        @click.native.prevent="handleRadioChange(item)"
      ></el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabRadioGroup',
    mixins: [mixins],
    inject: {
      pageComponent: {
        default: '',
      },
    },
    data() {
      return {
        labelList: [],
        labelResult: null,
        labelMap: {},
        valueMap: {},
      }
    },
    watch: {
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
      this.$baseEventBus.$on('ComponentReset', () => {
        this.labelResult = []
        this.setModel(null)
      })
    },
    methods: {
      handleRadioChange(val) {
        if (this.disabled) return
        let value = null
        if (this.cancelRadio) {
          value = val == this.labelResult ? null : val
          this.changeModeData(value)
          this.labelResult = value
        } else {
          value = val
          this.changeModeData(value)
        }
      },
      changeModeData(value) {
        if (value) {
          this.resetField()
          this.setModel(this.labelMap[value])
          this.$emit('getVal', this.labelMap[value])
        } else {
          this.setModel(null)
          this.$emit('getVal', null)
        }
      },
      setValue(val) {
        setTimeout(() => {
          this.labelResult = this.valueMap[val]
        }, 0)
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
<style>
  .el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
    .el-radio__inner {
    box-shadow: 0 0 2px 2px #fff;
  }
</style>
