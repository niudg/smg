<template>
  <el-form-item
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
    :style="$attrs['style']"
  >
    <div class="flex_start tim_box flex_center_align">
      <div class="day_box width_60">
        <el-input
          v-model="innerValue"
          v-specialChar
          :disabled="disabled"
          @focus="focusInput"
          @blur="blurInput"
        />
      </div>
    </div>
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
  // let format = require('string-format')
  import mixins from '@/utils/mixForm'
  export default {
    name: 'VabTimeInput',
    mixins: [mixins],
    props: {
      startTimeProp: {
        type: [String, Number],
        default: null,
      },
      endTimeProp: {
        type: [String, Number],
        default: null,
      },
      day: {
        type: [String, Number],
        default: null,
      },
      rowItem: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        focus: false,
        type: 'time',
      }
    },
    mounted() {
      this.$watch('disabled', (val) => {
        if (val) {
          this.form.clearValidate([this.$attrs['prop']])
          this.innerValue = null
          this.setModel(null)
        }
      })
    },
    methods: {
      changeRowData(setRowItem) {
        if (this.rowItem) {
          setRowItem(this.rowItem)
        }
      },
      setRowItem(rowItem) {
        let prop = this.$attrs['prop'].split('.')
        rowItem[prop[prop.length - 1]] = this.innerValue
      },
      focusInput(e) {
        let val = e.target.value
        if (val) {
          if (val.length < 5) {
            val = val.padEnd(4, '0')
          }
          if (val.indexOf(':') != -1) {
            let timeVal = val.split(':')
            this.innerValue = timeVal[0] + '' + timeVal[1]
            this.setModel(timeVal)
          }
        } else {
          this.innerValue = null
          this.setModel(null)
        }
      },
      formatInput(val) {
        if (!val) return
        let hh = ''
        let mm = ''
        if (val.length < 4) {
          if (val.slice(0, 2) < 10) {
            val = val.padStart(2, '0')
          }
          val = val.padEnd(4, '0')
        }
        if (val.indexOf(':') == -1) {
          hh = +val.slice(0, 2) < 24 ? val.slice(0, 2) : '23'
          mm = +val.slice(2, 4) <= 59 ? val.slice(2, 4) : '59'
        } else {
          const [HH, MM] = val.split(':').map((val) => parseInt(val))
          hh = HH < 24 ? HH.padStart(2, 0) : '23'
          mm = MM <= 59 ? MM.padEnd(2, 0) : '59'
        }
        let newTime = hh + mm
        if (this.startTimeProp) {
          const [startHh, startMm] = this.startTimeProp
            .split(':')
            .map((val) => parseInt(val))
          const startTime =
            startHh.toString().padStart(2, 0) + startMm.toString().padEnd(2, 0)
          if (Number(newTime) < Number(startTime)) {
            hh = startHh.toString().padStart(2, 0)
            mm = startMm.toString().padEnd(2, 0)
          }
        }
        if (this.endTimeProp) {
          const [endHh, endMm] = this.endTimeProp
            .split(':')
            .map((val) => parseInt(val))
          const endTime =
            endHh.toString().padStart(2, 0) + endMm.toString().padEnd(2, 0)
          if (Number(newTime) > Number(endTime)) {
            hh = endHh.toString().padStart(2, 0)
            mm = endMm.toString().padEnd(2, 0)
          }
        }
        return hh + ':' + mm
      },
      blurInput(e) {
        let val = e.target.value
        if (val) {
          this.innerValue = this.formatInput(val)
          this.setModel(this.innerValue)
        } else {
          this.innerValue = null
          this.setModel(null)
        }
        this.changeRowData(this.setRowItem)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .icon {
    color: #0071ee;
    font-size: 16px;
    cursor: pointer;
  }
  .day_box {
    width: 50px;
  }
  .suffix {
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    padding-left: 6px;
    &.week {
      font-size: 12px;
    }
  }
  .disabled {
    color: #a1a1a1;
  }
</style>
<style lang="scss" scoped>
  @import '@/vab/styles/component.scss';
</style>
