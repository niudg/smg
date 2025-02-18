/* eslint-disable prettier/prettier */

export default {
  data() {
    return {
      iconTemp: false,
      pickerOptions: {
        selectableRange: '00:00:00 - 23:59:59',
      },
    }
  },
  computed: {
    displayFormat: {
      get() {
        return this.getFormat || this.$const.dateFormatMap['LOCALTIME']
      },
    },
    valueFormat: {
      get() {
        //HH:mm:ss:SSSの場合
        if (this.getValueFormatSss) {
          return this.$const.dateFormatMap['LOCALTIMESTMAP']
        }
        //HH:mmの場合
        if (this.getFormat) {
          if (this.getFormat != this.$const.dateFormatMap['LOCALTIME']) {
            return this.getFormat + ':00'
          }
        }
        //HH:mm:ss
        return this.$const.dateFormatMap['LOCALTIME']
      },
    },
    getFormat() {
      return this.$attrs?.format || this.config?.format
    },

    getValueFormatSss() {
      return this.valueFormatSss || this.config?.valueFormatSss
    },

    getEndDateProp() {
      return this.endDateProp || this.config?.endDateProp
    },

    getStartDateProp() {
      return this.startDateProp || this.config?.startDateProp
    },
  },
  mounted() {},
  methods: {
    focusInput() {
      let str = null
      if (this.getValueFormatSss) {
        str = this.$const.dateFormatMap['LOCALTIMESTMAP']
      } else {
        str = '00:00'
      }
      if (this.getEndDateProp) {
        let endDate = this.$baseLodash.get(this.form.model, this.getEndDateProp)
        if (!this.$baseLodash.isEmpty(endDate) && endDate != str) {
          this.pickerOptions.selectableRange = '00:00:00 - ' + endDate + ':00'
        }
      }
      if (this.getStartDateProp) {
        let startDate = this.$baseLodash.get(
          this.form.model,
          this.getStartDateProp
        )

        if (!this.$baseLodash.isEmpty(startDate) && startDate != str) {
          this.pickerOptions.selectableRange = startDate + ':00' + ' - 23:59:00'
        }
      }
      this.$forceUpdate()
    },
    setDateIcon() {
      if (this.innerValue == '' || this.innerValue == null) {
        return false
      }
      this.iconTemp = true
    },
    changeSetMode(value) {
      this.setModel(value)
      this.focusInput()
    },
  },
}
