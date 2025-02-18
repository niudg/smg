<template>
  <div>
    <div class="week_main">
      <vab-form ref="form" :model="form" :rules="rules">
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
                  @change="setWeek(row)"
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
    name: 'DateSelect',
    props: {
      time: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
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
      }
    },
    watch: {
      disabled(val) {
        this.columns.filter((item) => {
          item.disabled = val
          this.$set(item, 'disabled', val)
        })
      },
    },
    beforeMount() {
      // 列属性の補足
      this.keyList.forEach((itm, idx) => {
        this.columns.push({
          label: itm,
          'min-width': 120,
          prop: this.propList[idx],
          align: 'center',
          disabled: this.disabled,
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
            onChange: this.isSelectedAble,
            align: 'center',
            disabled: this.disabled,
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
    mounted() {
      this.initDom()
      this.registHeader()
    },
    methods: {
      // 初期化form
      initDom() {
        for (let i = 0; i < 5; i++) {
          this.form.list.push({
            title: `第${i + 1}週`,
            week: null,
            zero: null,
            one: null,
            two: null,
            three: null,
            four: null,
            five: null,
            six: null,
          })
        }
      },
      registHeader() {
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
        this.form.list.forEach((itm) => {
          for (const name of this.propList) {
            itm[name] = val
            itm['week'] = val
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
          itm[this.propList[index - 1]] = row
        })
        this.checkAll()
        this.checkWeek()
        //クリア
        this.$refs.table.cancelEdit()
      },
      // 表のchangeイベント
      setWeek(row) {
        this.propList.forEach((itm) => {
          this.form.list[row.rowIndex][itm] = row.week
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
        //クリア
        this.$refs.table.cancelEdit()
      },
      checkWeek() {
        let arr = []
        for (const data of this.form.list) {
          for (const key of this.propList) {
            arr.push(data[key])
            let y = arr.every((i) => i === '〇')
            let n = arr.every((i) => i === '×')
            let not = arr.every((i) => !i || i === '')
            data['week'] = y ? '〇' : n ? '×' : not ? '' : 'ー'
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
        for (const data of this.form.list) {
          for (const key of this.propList) {
            obj[key].push(data[key])
          }
        }
        Object.keys(obj).forEach((itm, idx) => {
          let y = obj[itm].every((i) => i === '〇')
          let n = obj[itm].every((i) => i === '×')
          let not = obj[itm].every((i) => !i || i === '')
          this.headerSelectList[idx].innerValue = y
            ? '〇'
            : n
            ? '×'
            : not
            ? ''
            : 'ー'
        })
        //クリア
        this.$refs.table.cancelEdit()
      },
      // 表のchangeイベント
      checkAll() {
        let yes = []
        let no = []
        let not = []
        for (let key of this.form.list) {
          for (const name of this.propList) {
            if (key[name] === '〇') {
              yes.push(key)
            } else if (key[name] === '×') {
              no.push(key)
            } else if (!key[name] || key[name] === '') {
              not.push(key)
            }
          }
        }
        if (yes.length === 35) {
          this.form.isSelected = '〇'
        } else if (no.length === 35) {
          this.form.isSelected = '×'
        } else if (not.length === 35) {
          this.form.isSelected = ''
        } else {
          this.form.isSelected = 'ー'
        }
        //クリア
        this.$refs.table.cancelEdit()
      },
      // 値を与える
      givenValue(str) {
        let arr = []
        const valueObj = ['×', '〇']
        if (!this.$baseLodash.isNull(str)) {
          for (let i = 0; i < str.length; i += 7) {
            arr.push(str.substr(i, 7))
          }
          this.form.list.forEach((obj, idx) => {
            this.propList.forEach((k, j) => {
              obj[k] = valueObj[arr[idx][j]]
            })
          })
          this.isSelectedAble()
        }
      },
      // データの整理
      organizeData() {
        const obj = {
          〇: 1,
          '×': 0,
        }
        let arr = []
        let dayList = this.form.list.map((d) => {
          let v = {
            zero: d.zero ? obj[d.zero] : 0,
            one: d.one ? obj[d.one] : 0,
            two: d.two ? obj[d.two] : 0,
            three: d.three ? obj[d.three] : 0,
            four: d.four ? obj[d.four] : 0,
            five: d.five ? obj[d.five] : 0,
            six: d.six ? obj[d.six] : 0,
          }
          arr.push(Object.values(v))
          return arr.flat(Infinity).join('')
        })

        return dayList[dayList.length - 1]
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
    padding: 12px 16px;
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
