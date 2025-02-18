<template>
  <div class="flex_start tim_box flex_center_align time">
    <div
      v-if="weekShow"
      :class="['box_select', { hover_select: !$attrs['disabled'] }]"
      @click="svgClick"
    >
      <svg-icon
        class="icon"
        icon-class="select"
        :class="{ disabled: $attrs['disabled'] }"
      />
    </div>
    <div class="day_box">
      <el-form-item
        :label-width="$attrs['label-width']"
        :prop="$attrs['prop']"
        :label="$attrs['label']"
        :style="$attrs['style']"
      >
        <el-input
          v-model="innerValue"
          v-input.intp
          maxlength="2"
          :disabled="$attrs['disabled']"
          @focus="focusValue"
          @input="(value) => inputInput(value)"
        />
      </el-form-item>
    </div>
    <div class="suffix">日</div>
    <div v-if="week && !workChange" class="week suffix">（{{ week }}）</div>
  </div>
</template>

<script>
  import mixins from '@/utils/mixForm'
  import debounce from 'lodash/debounce'
  export default {
    name: 'VabTime',
    mixins: [mixins],
    props: {
      ym: {
        type: [String, Number],
        default: null,
      },
      weekShow: {
        type: Boolean,
        default: false,
      },
      //スケジュール変更ですか
      workChange: {
        type: Boolean,
        default: false,
      },
      rowItem: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        type: 'dayTime',
        weeks: [
          {
            name: '日',
            val: 0,
          },
          {
            name: '月',
            val: 1,
          },
          {
            name: '火',
            val: 2,
          },
          {
            name: '水',
            val: 3,
          },
          {
            name: '木',
            val: 4,
          },
          {
            name: '金',
            val: 5,
          },
          {
            name: '土',
            val: 6,
          },
        ],
        week: '',
      }
    },
    mounted() {},
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
      formatDayTime(val) {
        if (!val) {
          this.week = null
          return
        }
        let ym = null
        if (this.$baseLodash.isEmpty(this.ym)) {
          ym = this.$dayjs().format('YYYY-MM')
        } else {
          ym = this.$dayjs(this.ym + val).format('YYYY/MM/DD')
        }
        if (val.length > 2 && val.indexOf('/') != -1) {
          val = this.$dayjs(val).format('DD')
        }
        let day = this.$dayjs(`${this.ym}/01`).daysInMonth()
        if (Number(val) > day) {
          val = val.toString().slice(0, val.toString().length - 1)
        }
        if (val == '' || val == null) {
          this.week = ''
        } else {
          this.setWeek(val, ym)
        }
        return val
      },
      setWeek(val, ym) {
        if (val && val != 0) {
          let week = this.$dayjs(ym).day()
          let weekItem = this.$baseLodash.find(
            this.weeks,
            (item) => week == item.val
          )
          if (this.$baseLodash.isUndefined(weekItem)) return
          this.week = weekItem.name
        }
      },
      svgClick() {
        this.$emit('svgClick')
      },
      sendValue(val) {
        this.$emit('sendValue', val)
      },
      focusValue(val) {
        this.$emit('focusValue', val)
      },
      inputInput: debounce(function (val) {
        if (val) {
          this.innerValue = this.formatDayTime(val)
          this.setModel(this.innerValue)
        } else {
          this.innerValue = null
          this.setModel(null)
        }
        this.changeRowData(this.setRowItem)
      }, 600),
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
    width: 45px;
    margin-left: 10px;
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
    cursor: default;
  }
</style>
