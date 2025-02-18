<template>
  <el-form-item
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
    :class="[!labelShow ? 'lable-hidden' : '']"
  >
    <el-time-picker
      ref="timepicker"
      v-model.trim="innerValue"
      v-bind="{ ...$attrs }"
      :class="['date-picker-icon', iconTemp ? 'date-close' : '']"
      autocomplete="off"
      :clearable="false"
      :format="displayFormat"
      :picker-options="pickerOptions"
      :value-format="valueFormat"
      @mouseover.native="setDateIcon"
      @mouseleave.native="iconTemp = false"
      @change="(value) => changeSetMode(value)"
      @focus="focusInput"
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
</template>

<script>
  import mixins from '@/utils/mixForm'
  import mixinTime from '@/utils/mixinTimePicker'
  export default {
    name: 'VabTimePicker',
    mixins: [mixins, mixinTime],
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
    width: 90px !important;

    ::v-deep {
      .el-input__prefix {
        padding-left: 0px !important;
      }
      .el-input__inner {
        padding: 5px !important;
        text-align: left !important;
        font-size: 14px;
        font-weight: 400;
      }
    }
    .el-icon-date {
      display: none;
    }
  }
</style>
