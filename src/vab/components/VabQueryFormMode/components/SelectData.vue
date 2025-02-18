<template>
  <div class="flex_start flex_wrap">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="flex_start flex_center_align item_box_s"
    >
      <span class="sub_title">{{ item.title }}：</span>
      <div
        v-for="(son, sonindex) in item.children"
        :key="sonindex"
        class="sub_buttom flex_start flex_center_align"
        @click="delet(item, sonindex, son.value, index)"
      >
        <div class="name">{{ son.name }}</div>
        <div class="del_inner flex_center_align flex_center">
          <!-- <img src="~@/assets/images/close.png" alt="" /> -->
          <svg-icon icon-class="close_line" class="del_inner_svg"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SelectData',
    data() {
      return {
        list: [],
      }
    },
    watch: {
      'list.children'(val) {
        console.log('val', val)
      },
    },
    methods: {
      setData(data) {
        this.list.filter((item, index) => {
          if (item.title == data.title) {
            this.list.splice(index, 1)
          }
        })
        this.list.push(data)
      },
      delet(row, index, value, rowIndex) {
        row.children.splice(index, 1)
        if (row.children.length == 0) {
          row.svm.clear()
          this.list.splice(rowIndex, 1)
        } else {
          row.svm.setInnerValue(row.children.map((son) => son.value))
        }
      },
      clearData(data) {
        this.list.filter((item, index) => {
          if (item.svm._uid == data._uid) {
            this.list.splice(index, 1)
          }
        })
      },
      changeData(title) {
        this.list.filter((item, index) => {
          if (item.title == title) {
            this.list.splice(index, 1)
          }
        })
      },
      clearAll() {
        this.list.filter((row) => {
          row.svm.setInnerValue(null)
        })
        this.list = []
      },
    },
  }
</script>
<style scoped lang="scss">
  .item_box_s {
    padding-right: 8px;
    padding-top: 10px;
    .sub_title {
      font-weight: 400;
      font-size: 12px;
      color: #848484;
    }
    .sub_buttom {
      padding: 2px 5px 2px 6px;
      background: #f7f7f7;
      border: 1px solid #efefef;
      border-radius: 4px;
      font-weight: 400;
      font-size: 12px;
      color: #003350;
      cursor: pointer;
      margin-right: 16px;
      .name {
        padding-right: 10px;
      }
      .del_inner {
        width: 24px;
        height: 24px;
        &:hover {
          background: rgba(0, 0, 0, 0.07);
          border-radius: 3px;
        }
      }
    }
  }
</style>
