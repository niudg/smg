<template>
  <div>
    <div class="week_main flex_start border_bottom_none font_set">
      {{ yearMonth }}
    </div>
    <div class="week_main">
      <div class="flex_center_align flex_start">
        <div
          :class="[
            'flex_center',
            'flex_center_align',
            disabled ? 'select_all_disabled' : 'select_all',
          ]"
          @click="selectAll"
        >
          すべての日を選択
        </div>
        <div class="cancel_all" style="margin-left: 6px" @click="cancelAll">
          クリア
        </div>
      </div>
      <div class="flex_start">
        <div class="flex_colum right_box">
          <div class="flex_start">
            <div class="shu_box flex_colum">
              <div class="left_checkbox flex_colum">
                <div
                  v-for="(item, index) in leftCheckBoxList"
                  :key="index"
                  class="left_checkbox_item flex_center_align flex_end"
                  @click="setSelectRow(item)"
                >
                  <div
                    class="check_box flex_center flex_center_align"
                    :class="{
                      active: item.state != 1,
                      white: !disabled,
                      grey: disabled,
                    }"
                  >
                    <svg-icon
                      v-if="item.state != 1"
                      :icon-class="item.state == 3 ? 'dui' : 'minimize_line'"
                      class="className box_disable"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex_colum right_box">
              <div class="day_box flex_start">
                <div
                  v-for="(item, index) in weeks"
                  :key="index"
                  class="day_item change_day flex_colum flex_center_align"
                  @click="setSelectWeek(item)"
                >
                  <div
                    class="check_box flex_center flex_center_align"
                    :class="{
                      active: item.state != 1,
                      white: !disabled,
                      grey: disabled,
                    }"
                  >
                    <svg-icon
                      v-if="item.state != 1"
                      :icon-class="item.state == 3 ? 'dui' : 'minimize_line'"
                      class="className box_disable"
                    />
                  </div>
                  <span class="day_title word">{{ item.name }}</span>
                </div>
              </div>
              <div class="day_box flex_start">
                <div
                  v-for="(item, index) in dayList"
                  :key="index"
                  class="day_item flex_center_align flex_center"
                  @click="setSelectDay(item, true)"
                >
                  <div v-if="item.val" class="flex_start flex_center_align">
                    <div class="day_title valname">{{ item.val }}</div>
                    <div
                      class="check_box flex_center flex_center_align"
                      :class="{
                        active: item.active,
                        white: !disabled,
                        grey: disabled,
                      }"
                    >
                      <svg-icon
                        v-if="item.active"
                        icon-class="dui"
                        class="className box_disable"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DateSetup',
    props: {
      time: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        dayList: [],
        weeks: [
          {
            name: '日',
            val: 0,
            state: '1',
          },
          {
            name: '月',
            val: 1,
            state: '1',
          },
          {
            name: '火',
            val: 2,
            state: '1',
          },
          {
            name: '水',
            val: 3,
            state: '1',
          },
          {
            name: '木',
            val: 4,
            state: '1',
          },
          {
            name: '金',
            val: 5,
            state: '1',
          },
          {
            name: '土',
            val: 6,
            state: '1',
          },
        ],
        leftCheckBoxList: [],
        disabled: false,
        yearMonth: '',
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initDay()
      })
    },
    methods: {
      // 获取年月
      initDay(time) {
        let date = null
        if (time) {
          date = this.$dayjs(time).format('YYYY-MM')
        } else if (this.time) {
          date = this.$dayjs(this.time).format('YYYY-MM')
        } else {
          date = this.$dayjs().format('YYYY-MM')
        }
        this.getOneDay(date)
      },
      // 获取当前月中的天数
      getOneDay(date) {
        let allDays = this.$dayjs(date).daysInMonth()
        let $index = this.$dayjs(date + '-01').day()
        let day = 0
        let num = Math.ceil((allDays + $index) / 7) * 7
        let arrList = Array.apply(null, { length: num })
        arrList.filter((i, index) => {
          if (index >= $index) {
            day++
            if (day <= allDays) {
              let week = this.$dayjs(date + `-${day}`).day()
              let data = {
                val: day,
                week: week,
                rowIndex: Math.floor(index / 7),
                active: false,
              }
              this.dayList.push(data)
            } else {
              this.dayList.push({})
            }
          } else {
            this.dayList.push({})
          }
        })
        let list = []
        Array.apply(null, { length: num / 7 }).map((item, index) => {
          list.push({
            rowIndex: index,
            state: '1',
          })
        })
        this.leftCheckBoxList = list
      },
      setSelectWeek(row) {
        if (this.disabled) return
        row.state = row.state == 1 ? 3 : row.state == 2 ? 3 : 1
        this.dayList.filter((item) => {
          if (item?.val && item.week == row.val) {
            item.active = row.state == 3 ? true : false
          }
        })
        this.leftCheckBoxList.filter((item) => {
          let list = this.dayList.filter((row) => item.rowIndex == row.rowIndex)
          if (list.every((item) => item.active == true)) {
            item.state = 3
          } else {
            if (list.some((day) => day.active == true)) {
              item.state = 2
            } else {
              item.state = 1
            }
          }
        })
      },
      setSelectRow(row) {
        if (!this.disabled) {
          row.state = row.state == 1 ? 3 : row.state == 2 ? 3 : 1
        }
        const days = this.dayList.filter((item) => {
          if (item?.val && item.rowIndex == row.rowIndex) {
            item.active = row.state == 3 ? true : false
            return item
          }
        })
        const weekend = days.map((v) => v.week)
        this.weeks.forEach((item) => {
          let dayList = this.dayList.filter((i) => i.week == item.val)
          if (row.rowIndex === 0 && weekend.includes(item.val)) {
            if (dayList.every((item) => item.active == true)) {
              item.state = 3
            } else {
              if (dayList.some((day) => day.active == true)) {
                item.state = 2
              } else {
                item.state = 1
              }
            }
          } else if (row.rowIndex !== 0) {
            if (dayList.every((item) => item.active == true)) {
              item.state = 3
            } else {
              if (dayList.some((day) => day.active == true)) {
                item.state = 2
              } else {
                item.state = 1
              }
            }
          }
        })
      },
      setSelectDay(row, type) {
        if (!this.disabled && type) {
          row.active = !row.active
        }
        let list = this.dayList.filter((item) => item.rowIndex == row.rowIndex)
        this.leftCheckBoxList.filter((item) => {
          if (item.rowIndex == row.rowIndex) {
            if (list.every((item) => item.active == true)) {
              item.state = 3
            } else {
              if (list.some((day) => day.active == true)) {
                item.state = 2
              } else {
                item.state = 1
              }
            }
          }
        })
        let dayList = this.dayList.filter((item) => item.week == row.week)
        let weekItem = this.weeks.find((item) => item.val == row.week)
        if (!weekItem) return
        if (dayList.every((item) => item.active == true)) {
          weekItem.state = 3
        } else {
          if (dayList.some((day) => day.active == true)) {
            weekItem.state = 2
          } else {
            weekItem.state = 1
          }
        }
      },
      selectAll() {
        if (this.disabled) return
        this.dayList.forEach((v) => {
          if (v.week || v.week === 0) {
            v.active = true
            this.setSelectDay(v, false)
          }
        })
      },
      cancelAll() {
        if (this.disabled) return
        this.dayList.forEach((v) => {
          if (v.week || v.week === 0) {
            v.active = false
            this.setSelectDay(v, false)
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .week_main {
    background: #fff;
    padding: 12px 16px;
    border: 1px solid #d1dae1;

    .select_all {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px 6px;
      width: 131px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #0060c2;
      border-radius: 3px;
      font-size: 14px;
      color: #0060c2;
      cursor: pointer;
    }

    .select_all_disabled {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px 6px;
      width: 131px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #848484;
      border-radius: 3px;
      font-size: 14px;
      color: #848484;
      cursor: default;
    }

    .cancel_all {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px 6px;
      width: 62px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #848484;
      border-radius: 3px;
      font-weight: 500;
      font-size: 14px;
      color: #848484;
      cursor: pointer;
    }

    .right_box {
      flex: 1;
    }
    .week_box {
      width: 100%;
      padding: 5px 0;
      .week_item {
        width: 14%;
        font-size: 13px;
        text-align: center;
        color: #666666;
        padding-bottom: 2px;
        &.noBg {
          width: 8%;
        }
        &.red {
          color: #ea5b5c;
        }
      }
    }
    .week_row {
      width: 100%;
      flex-direction: row;
      flex-wrap: nowrap;
      .week_inner_item {
        width: 14%;
        height: 52px;
        background: #f7f7f7;
        margin: 2px;
        border-radius: 3px;
        cursor: pointer;
        &.active {
          background: #ecf5ff;
          color: #0071ee;
        }
        &.noBg {
          width: 8%;
          background: none;
          justify-content: flex-end;
        }
        .word {
          font-weight: 500;
          font-size: 13px;
          color: #666666;
          display: flex;
          align-items: center;
          text-align: right;
          padding-right: 15px;
        }
      }
    }
  }
  .day_box {
    width: 100%;
    flex-wrap: wrap;
    .yuding {
      font-weight: 400;
      font-size: 12px;
      color: #848484;
      padding-right: 5px;
    }

    .day_item {
      width: 13.6%;
      height: 52px;
      position: relative;
      padding: 6px;
      box-sizing: border-box;
      background: #f7f7f7;
      cursor: pointer;
      margin: 2px;
      &.change_day {
        background: none;
        height: auto;
      }
      .day_title {
        font-weight: 500;
        font-size: 13px;
        text-align: center;
        color: #666666;
        display: block;
        text-align: left;
        &.word {
          padding-top: 10px;
        }
        &.valname {
          margin-right: 6px;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .check_box {
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 1px solid #cecece;
    border-radius: 3px;
    &.active {
      background: linear-gradient(45deg, #0060c2 14.64%, #4ba1ff 85.36%);
      border: none;

      .className {
        font-size: 14px;
      }
    }
  }
  .shu_box {
    width: 60px;
    margin-top: 60px;
    .left_checkbox_item {
      width: 100%;
      height: 52px;
      padding-right: 20px;
      padding: 6px;
      box-sizing: border-box;
      cursor: pointer;
      margin: 2px;
    }
  }

  .white {
    color: #ffffff;
    .box_disable {
      color: #ffffff;
    }
  }

  .grey {
    background-color: #efefef;
    .box_disable {
      color: #848484;
    }
  }

  .font_set {
    color: #003350;
    font-size: 16px;
    font-weight: 500;
  }
</style>
