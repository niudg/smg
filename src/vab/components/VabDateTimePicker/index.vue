<template>
  <el-form-item
    v-if="$attrs['prop']"
    class="unset"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
    :class="[!labelShow ? 'lable-hidden' : '']"
  >
    <el-date-picker
      :id="$attrs['prop']"
      ref="datepicker"
      v-model.trim="innerValue"
      type="datetime"
      v-bind="{ ...$attrs }"
      :class="['date-picker-icon', iconTemp ? 'date-close' : '']"
      :picker-options="pickerOptions"
      :default-value="defaultValue"
      :disabled="disabled"
      :format="displayFormat"
      :value-format="valueFormat"
      autocomplete="off"
      @mouseenter.native="setDateIcon"
      @mouseleave.native="iconTemp = false"
      @change="(value) => timeChange(value)"
      @blur="(value) => handleBlur(value)"
    />
    <template #error="{ error }">
      <el-tooltip class="item" effect="dark" :content="error" placement="left">
        <div
          class="el-form-item__error"
          :class="{ error_box: $attrs['error'] == 'true' }"
        >
          {{ error }}
        </div>
      </el-tooltip>
    </template>
  </el-form-item>
  <el-form-item
    v-else
    :label-width="$attrs['label-width']"
    :label="$attrs['label']"
    :class="[!labelShow ? 'lable-hidden' : '']"
  >
    <el-date-picker
      ref="datepicker"
      type="datetime"
      :value="$attrs['value']"
      v-bind="{ ...$attrs }"
      :class="['date-picker-icon', iconTemp ? 'date-close' : '']"
      :picker-options="pickerOptions"
      :format="displayFormat"
      :disabled="disabled"
      :value-format="valueFormat"
      autocomplete="off"
      @mouseenter.native="setDateIcon"
      @mouseleave.native="iconTemp = false"
    />
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  import mixinDate from '@/utils/mixinDatePicker'
  export default {
    name: 'VabDateTimePicker',
    componentName: 'VabDateTimePicker',
    mixins: [mixins, mixinDate],
    created() {
      this.formatType = 'datetime'
    },
  }
</script>

<style lang="scss" scoped>
  .lable-hidden {
    ::v-deep {
      .el-form-item__label {
        display: none;
        width: 0px !important;
      }
      .el-form-item__content {
        margin-left: 0px !important;
      }
    }
  }
  .date-picker-icon {
    width: 100%;
    &.date-close {
      ::v-deep {
        .el-input__prefix {
          display: none !important;
        }
      }
      .el-icon-date {
        display: none;
      }
    }
    ::v-deep {
      .el-input__inner {
        padding-right: 25px !important;
        padding-left: 5px !important;
      }

      .el-input__prefix {
        right: 5px;
        left: initial;
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import '@/vab/styles/component.scss';
</style>
