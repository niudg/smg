<template>
  <div>
    <div class="week_main">
      <div class="week_box flex_space">
        <div
          v-for="(item, index) in weeks"
          :key="index"
          :class="[index == 0 ? 'noBg' : '', item.val == '0' ? 'red' : '']"
          class="week_item"
        >
          {{ item.name }}
        </div>
      </div>
      <div
        v-for="(row, rowIndex) in rowList"
        :key="rowIndex"
        class="week_row flex_center_align"
      >
        <div
          v-for="(item, index) in row.weekList"
          :key="index"
          class="week_inner_item flex_center_align flex_center"
          :class="[
            index == 0 ? 'noBg' : '',
            item.active === '1' ? 'active' : '',
          ]"
          @click="changeItem(item)"
        >
          <span v-if="index == 0" class="word">{{ row.name }}</span>
          <svg-icon
            v-if="item.active === '1' && index != 0"
            icon-class="check_fill"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Week',
    data() {
      return {
        weeks: [
          {
            name: '',
            val: -1,
          },
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
        rowList: [],
      }
    },
    mounted() {
      for (let index = 1; index < 6; index++) {
        let data = {
          name: `第${index}週`,
          weekList: [],
        }
        Array(8)
          .fill({})
          .filter((item, index) => {
            data.weekList.push({
              weekVal: index,
              active: false,
            })
          })
        this.rowList.push(data)
      }
    },
    methods: {
      changeItem() {
        // item.active = item.active === '1' ? '0' : '1'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .week_main {
    .week_box {
      width: 100%;
      padding: 5px 0;
      .week_item {
        width: 13.14%;
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
        width: 13.14%;
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
</style>
