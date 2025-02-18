<template>
  <div>
    <div class="week_main border_d1dae1">
      <div class="week_main flex_start border_bottom font_set padding_12_16">
        {{ time }}
      </div>
      <vab-form ref="form" :model="form" :rules="rules" class="padding_12_16">
        <div class="flex_center_align flex_start">
          <vab-select
            label="全選択 / 解除"
            label-width="90px"
            prop="isSelected"
            :data-items="selectList"
            label-id="label"
            value-id="value"
            class="isSelect"
            placeholder="一括反映"
            :disabled="disabled"
            @change="setAll"
          />
        </div>
        <div class="lg-m-t">
          <vab-validate-table
            ref="table"
            prop="list"
            stripe
            border
            :columns="columns"
            :highlight-current-row="false"
          >
            <template #aBox="{ row, index }">
              <el-form-item
                label-width="0px"
                :prop="`list.${index}.week`"
                class="week_box"
              >
                <div class="title">{{ row.title }}</div>
                <el-select
                  v-model="row.week"
                  placeholder="一括反映"
                  :disabled="disabled"
                  @change="setWeek(row, index)"
                >
                  <el-option
                    v-for="item in selectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
          </vab-validate-table>
        </div>
      </vab-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DateSelectTime',
    props: {
      time: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        form: {
          list: [],
          isSelected: null,
        },
        rules: {},
        selectList: [
          {
            label: '〇',
            value: '〇',
          },
          {
            label: '×',
            value: '×',
          },
          {
            label: 'ー',
            value: 'ー',
            disabled: true,
          },
        ],
        headerSelectList: [],
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
        dayList: [],
        columns: [
          {
            label: '',
            width: 160,
            prop: 'title',
            align: 'center',
            slotScope: 'aBox',
          },
        ],
        propList: ['zero', 'one', 'two', 'three', 'four', 'five', 'six'],
        keyList: ['日', '月', '火', '水', '木', '金', '土'],
        yearMonth: '',
        disabled: false,
      }
    },
    computed: {
      disabledTableCell() {
        return (prop, row) => {
          let value = this.$baseLodash.get(row, prop)
          if (!value) {
            return true
          }
          return this.disabled
        }
      },
    },
    watch: {
      disabled(val) {
        this.columns.filter((item) => {
          item.disabled = val
          this.$set(item, 'disabled', val)
        })
      },
      'form.list': {
        handler(val) {
          console.log('form.list', val)
        },
        deep: true,
        immediate: true,
      },
    },
    beforeMount() {
      this.initColums()
    },
    mounted() {},
    methods: {
      initData() {
        this.initDay()
        this.registHeader()
      },
      initColums() {
        // 列属性の補足
        this.keyList.forEach((itm, idx) => {
          this.columns.push({
            label: itm,
            'min-width': 120,
            prop: `${this.propList[idx]}.value`,
            align: 'center',
            // disabled: (row) => this.disabledTableCell(this.propList[idx], row),
            config: () => ({
              dataItems: [
                {
                  text: '〇',
                  value: '〇',
                },
                {
                  text: '×',
                  value: '×',
                },
              ],
              editType: 'select',
              showTime: `${this.propList[idx]}.day`,
              onChange: this.isSelectedAble,
              align: 'center',
              disabled: (row) =>
                this.disabledTableCell(this.propList[idx], row),
              headerSlot: (column, index) => {
                return (
                  <div class="column_header">
                    <div style="margin-bottom:10px">{column.label}</div>
                    <vab-select
                      label-width="0"
                      data-items={this.selectList}
                      label-id="label"
                      value-id="value"
                      class="isSelect"
                      placeholder="一括反映"
                      type="dateSelect"
                      clearable={false}
                      disabled={this.disabled}
                      onChange={(value) => {
                        this.setHeaderDay(value, index)
                      }}
                    />
                  </div>
                )
              },
            }),
          })
        })
      },
      // 获取年月
      initDay() {
        this.form.list = []
        if (this.time) {
          this.getOneDay(this.$dayjs(this.time).format('YYYY-MM'))
        }
      },
      // 获取当前月中的天数
      getOneDay(date) {
        let allDays = this.$dayjs(date).daysInMonth()
        let $index = this.$dayjs(date + '-01').day()
        let day = 0
        let num = Math.ceil((allDays + $index) / 7) * 7
        let arrList = Array.apply(null, { length: num })
        let dayList = []
        arrList.filter((i, index) => {
          if (index >= $index) {
            day++
            if (day <= allDays) {
              let week = this.$dayjs(date + `-${day}`).day()
              let data = {
                day: day,
                week: week,
                rowIndex: Math.floor(index / 7),
                value: null,
              }
              dayList.push(data)
            } else {
              dayList.push({})
            }
          } else {
            dayList.push({})
          }
        })
        let dayChangeList = []
        while (dayList.length) {
          dayChangeList.push(dayList.slice(0, 7))
          dayList = dayList.slice(7, dayList.length)
        }

        dayChangeList.filter((rowList) => {
          let data = {
            title: null,
          }
          rowList.filter((item, index) => {
            if (!this.$baseLodash.isEmpty(item)) {
              data[this.propList[index]] = {
                ...item,
              }
            } else {
              data[this.propList[index]] = null
            }
          })
          this.form.list.push(data)
        })
      },
      registHeader() {
        this.headerSelectList = []
        if (this.$refs.table.$children) {
          this.$refs.table.$children[1].$children.filter((item) => {
            if (item.$vnode.tag.indexOf('ElTableHeader') > -1) {
              this.headerSelectList = item.$children
            }
          })
        }
      },
      // 全選択 / 解除
      setAll(val) {
        if (val === 'ー') return
        this.form.list.forEach((item) => {
          for (const name of this.propList) {
            if (!this.$baseLodash.isNull(item[name]) && item[name]['day']) {
              item[name]['value'] = val
            }
            item['week'] = val
          }
        })
        //el-header
        this.headerSelectList.forEach((item) => {
          item.innerValue = val
        })

        //クリア
        this.$refs.table.cancelEdit()
      },
      // 表のchangeイベント
      setHeaderDay(row, index) {
        if (row === 'ー') return
        this.form.list.forEach((itm) => {
          if (itm[this.propList[index - 1]]) {
            itm[this.propList[index - 1]]['value'] = row
          }
        })
        this.checkAll()
        this.checkWeek()
        //クリア
        this.$refs.table.cancelEdit()
      },
      // 表のchangeイベント
      setWeek(row, index) {
        this.form.list.filter((item) => {
          Object.keys(item).filter((key) => {
            if (
              item[key] &&
              item[key]['day'] &&
              item[key]['rowIndex'] == index
            ) {
              item[key]['value'] = row.week
            }
          })
        })
        this.checkAll()
        this.checkHeader()
        //クリア
        this.$refs.table.cancelEdit()
      },
      // 表のchangeイベント
      isSelectedAble() {
        this.checkWeek()
        this.checkAll()
        this.checkHeader()
        // クリア
        this.$refs.table.cancelEdit()
      },
      checkWeek() {
        let arr = []
        for (const data of this.form.list) {
          for (const key of this.propList) {
            if (data[key] && data[key]['value']) {
              arr.push(data[key]['value'])
            }
            let y = arr.every((i) => i === '〇')
            let n = arr.every((i) => i === '×')
            let str = 'ー'
            if (y) {
              str = '〇'
            } else if (n) {
              str = '×'
            }
            data['week'] = str
          }
          arr = []
        }
        //クリア
        this.$refs.table.cancelEdit()
      },
      checkHeader() {
        let obj = {
          zero: [],
          one: [],
          two: [],
          three: [],
          four: [],
          five: [],
          six: [],
        }
        Object.keys(obj).filter((item, index) => {
          obj[item] = this.getTypeList(null, item)
          let y = obj[item].every((i) => i === '〇')
          let n = obj[item].every((i) => i === '×')
          let str = 'ー'
          if (y) {
            str = '〇'
          } else if (n) {
            str = '×'
          }
          this.headerSelectList[index].innerValue = str
        })
        //クリア
        this.$refs.table.cancelEdit()
      },
      getTypeList(s, prop) {
        let list = []
        this.form.list.filter((item) => {
          if (prop) {
            if (item[prop]) {
              list.push(item[prop]['value'])
            }
          } else {
            Object.keys(item).filter((key) => {
              if (item[key] && key != 'week') {
                list.push(item[key]['value'])
              }
            })
          }
        })
        if (prop) {
          return list
        }
        return list.filter((item) => item == s)
      },
      // 表のchangeイベント
      checkAll() {
        let allDays = this.$dayjs(this.time).daysInMonth()
        let list = this.getTypeList('〇')
        if (list.length === allDays) {
          this.form.isSelected = '〇'
          return
        }
        list = this.getTypeList('×')
        if (list.length === allDays) {
          this.form.isSelected = '×'
          return
        }
        this.form.isSelected = 'ー'
        //クリア
        this.$refs.table.cancelEdit()
      },
      // 値を与える
      givenValue(str) {
        if (!str) return
        let strList = str.split('')
        this.form.list.filter((item) => {
          Object.keys(item).filter((key) => {
            if (item[key] && item[key]['day']) {
              item[key]['value'] = this.getValueStr(
                strList[item[key]['day'] - 1]
              )
            }
          })
        })
        this.isSelectedAble()
      },
      getValueStr(s) {
        return ['×', '〇'][s]
      },
      // データの整理
      organizeData() {
        let list = this.$baseLodash.cloneDeep(this.form.list)
        let changeList = []
        list.filter((item) => {
          Object.keys(item).filter((key) => {
            if (item[key] && item[key]['day']) {
              changeList.push(item[key]['value'])
            }
          })
        })
        let str = changeList.join('').replace(/〇/g, '1').replace(/×/g, '0')
        return str
      },
      cancelAll() {
        this.setAll('×')
        this.form.isSelected = '×'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .week_main {
    background: #fff;
    // padding: 12px 16px;
    //border: 1px solid #d1dae1;

    .shu_box {
      min-width: 60px;
      margin-top: 50px;
      margin-right: 25px;

      .left_checkbox_item {
        width: 100%;
        height: 52px;
        padding-right: 20px;
        padding: 6px;
        box-sizing: border-box;
        cursor: pointer;
        margin: 2px;
      }
      .week_name {
        margin-left: 6px;
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
        }
      }
    }
  }

  ::v-deep {
    .el-select {
      .el-input__inner {
        text-align: center !important;
        &::placeholder {
          text-align: left !important;
        }
      }
    }

    .isSelect {
      .el-input__inner {
        //width: 98px;
        padding-left: 20px;
      }
    }

    .el-table__cell {
      &:last-child {
        border-right: none !important;
      }
      &:nth-child(2) {
        background: #fdf7f9 !important;
      }
      &:nth-child(8) {
        background: #ecf5ff !important;
      }
    }

    .week_box {
      .el-form-item__content {
        display: flex;
      }

      .title {
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  }
</style>
