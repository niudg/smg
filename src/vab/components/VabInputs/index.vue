<template>
  <el-form-item
    ref="formItem"
    :label-width="$attrs['label-width']"
    :prop="$attrs['prop']"
    :label="$attrs['label']"
  >
    <el-input
      ref="elInputs"
      v-model="innerValue"
      v-bind="{ ...$attrs }"
      autocomplete="off"
      @input="(value) => setModel(value)"
    >
      <!-- <template v-if="$slots.append" slot="append">
        <span v-for="item in $slots.append" :key="item.text">
          {{ item.text }}
        </span>
      </template> -->
    </el-input>
    <el-popover
      ref="popover"
      placement="bottom"
      :width="popWidth"
      :offset="-popWidth / 2"
      trigger="click"
    >
      <span
        v-for="(item, index) in gridData"
        :key="item.date"
        :class="clickIndex === index ? 'pop-selected pop-span' : 'pop-span'"
        @click="liClick(item, index)"
      >
        {{ item.date }}
      </span>
      <i slot="reference" class="el-icon-arrow-down simulation"></i>
    </el-popover>
  </el-form-item>
</template>

<script>
  import mixins from '@/utils/mixForm'
  // import { getSlots } from '@/utils/props-utils'
  export default {
    name: 'VabInputs',
    mixins: [mixins],
    data() {
      return {
        gridData: [
          {
            date: '2016-05-02',
            name: '王',
            address: 'xxxx',
          },
          {
            date: '2016-05-04',
            name: '王',
            address: 'bbbb',
          },
        ],
        inputNode: '',
        popWidth: '',
        clickIndex: null,
        popShow: false,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.inputNode = this.$refs.elInputs
        this.popWidth = this.inputNode.$el.clientWidth
      })
      if (this.$slots.append) {
        // console.info(getSlots(this.$refs.elInput))
      }
    },
    methods: {
      liClick(item, index) {
        console.log(this.$refs.popover)
        this.clickIndex = index
        this.innerValue = item.date
        this.popShow = true
      },
    },
  }
</script>

<style scoped>
  .simulation {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    margin: auto;
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
  .pop-span {
    display: block;
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .pop-span:hover {
    background-color: #f5f5f5;
  }
  .pop-selected {
    color: #1890ff;
  }
  .el-popover {
    padding: 0;
  }
</style>
