/* eslint-disable prettier/prettier */

export default {
  data() {
    let that = this
    return {
      formatType: 'date',
      formatMap: {
        datetime: 'yyyy-MM-dd HH:mm:ss',
        date: 'yyyy-MM-dd',
        month: 'yyyy-MM-01',
        year: 'yyyy',
      },

      iconTemp: false,
      pickerOptions: {
        disabledDate(time) {
          if (that.workYmDate) {
            return that.workYmDateCheck(time)
          }
          if (that.dateType) {
            return that.dateTypeCheck(time)
          }
          if (that.startDateProp || that.endDateProp) {
            return that.datePropCheck(time)
          }
        },
      },
    }
  },
  computed: {
    displayFormat: {
      get() {
        return this.getFormat || this.formatMap[this.formatType]
      },
    },
    valueFormat: {
      get() {
        return this.formatMap[this.formatType]
      },
    },
    getFormat() {
      return this.$attrs?.format || this.config?.format
    },
  },
  methods: {
    timeChange(val) {
      this.setModel(val)
    },
    setDateIcon() {
      if (this.innerValue == '' || this.innerValue == null || this.disabled) {
        this.iconTemp = false
      } else {
        this.iconTemp = true
      }
    },
    datePropCheck(time) {
      if (this.startDateProp) {
        let startDate = this.unForm
          ? this.startDateProp
          : this.$baseLodash.get(this.form.model, this.startDateProp)

        if (!this.$baseLodash.isEmpty(startDate)) {
          if (this.enableSameDate) {
            return this.$dayjs(time).isBefore(startDate)
          } else {
            return this.$dayjs(time).isSameOrBefore(startDate)
          }
        }
      }

      if (this.endDateProp) {
        let endDate = this.$baseLodash.get(this.form.model, this.endDateProp)
        if (!this.$baseLodash.isEmpty(endDate)) {
          if (this.enableSameDate) {
            return this.$dayjs(time).isAfter(endDate)
          } else {
            return this.$dayjs(time).isSameOrAfter(endDate)
          }
        }
      }
    },
    workYmDateCheck(time) {
      let workYm = this.$dayjs(this.workYmDate).format('YYYY/MM')
      let startTime = workYm + '/01'
      let day = this.$dayjs(`${startTime}`).daysInMonth()
      let endTime = workYm + '/' + day
      let dayTemp2 = false
      let dayTemp3 = false
      let dayTemp1 =
        this.$dayjs(time).isBefore(startTime) ||
        this.$dayjs(time).isAfter(endTime)
      if (this.endDateProp) {
        let endDate = this.$baseLodash.get(this.form.model, this.endDateProp)
        if (!this.$baseLodash.isEmpty(endDate)) {
          dayTemp2 = this.$dayjs(time).isSameOrAfter(endDate)
        }
      }
      if (this.startDateProp) {
        let startDate = this.$baseLodash.get(
          this.form.model,
          this.startDateProp
        )
        if (!this.$baseLodash.isEmpty(startDate)) {
          dayTemp3 = this.$dayjs(time).isSameOrBefore(startDate)
        }
      }
      return dayTemp1 || dayTemp2 || dayTemp3
    },
    getYearMonthsBetween(start, end) {
      let current = start.startOf('month')
      const result = []
      while (current.isBefore(end.endOf('month'))) {
        result.push(current.clone())
        current = current.add(1, 'month')
      }
      return result
    },
    lastDay(start, end, time, day) {
      const yearMonths = this.getYearMonthsBetween(
        this.$dayjs(start).startOf('month'),
        this.$dayjs(end).endOf('month')
      )
      return yearMonths.some(
        (row) =>
          this.$dayjs(row).format('YYYY/MM') ==
            this.$dayjs(time).format('YYYY/MM') &&
          day == this.$dayjs(row).daysInMonth()
      )
    },
    dateTypeCheck(time) {
      // start 1日, end 月の最後 interval 区间
      if (this.dateType == 'start') {
        let day = this.$dayjs(time).format('DD')
        if (this.minDate && this.maxDate) {
          return !(
            this.$dayjs(time).isBetween(
              this.minDate,
              this.maxDate,
              'day',
              '[)'
            ) && day == '01'
          )
        }
        let minDate = this.$dayjs(this.minDate).format('YYYY/MM')
        let timeYM = this.$dayjs(time).format('YYYY/MM')
        return !(minDate == timeYM && day == '01')
      }
      if (this.dateType == 'end') {
        let days = this.$dayjs(this.maxDate).format('DD')
        let day = this.$dayjs(time).format('DD')
        if (this.minDate && this.maxDate) {
          return !(
            this.$dayjs(time).isBetween(
              this.minDate,
              this.maxDate,
              'day',
              '(]'
            ) &&
            this.lastDay(
              this.$dayjs(this.minDate).format('YYYY/MM'),
              this.$dayjs(this.maxDate).format('YYYY/MM'),
              time,
              day
            )
          )
        }
        return !(days == day)
      }
      if (this.dateType == 'interval') {
        if (this.minDate && this.maxDate) {
          if (this.enableSameDate) {
            return !this.$dayjs(time).isBetween(
              this.minDate,
              this.maxDate,
              null,
              '[]'
            )
          } else {
            return !this.$dayjs(time).isBetween(this.minDate, this.maxDate)
          }
        }

        if (this.minDate) {
          if (this.enableSameDate) {
            return this.$dayjs(time).isBefore(this.minDate)
          } else {
            return this.$dayjs(time).isSameOrBefore(this.minDate)
          }
        }
        if (this.maxDate) {
          if (this.enableSameDate) {
            return this.$dayjs(time).isAfter(this.maxDate)
          } else {
            return this.$dayjs(time).isSameOrAfter(this.maxDate)
          }
        }
      }
    },
  },
}
