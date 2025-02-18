<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="layout-dialog"
    title="表示項目設定"
    top="5vh"
    class="tablecell_dialog"
    :visible.sync="show"
    append-to-body
  >
    <div class="flex_space flex_center_align mb16">
      <div class="new_h_date flex_center_align">
        <svg-icon icon-class="tryangle_down" class="new_h_date_svg"></svg-icon>
        <span class="ml2">
          チェックボックスで表示の切り替え、ドラッグ＆ドロップで表示順を入れ替えられます
        </span>
      </div>
    </div>
    <vab-row>
      <el-checkbox-group v-model="checkList">
        <vab-draggable :list="columns" :move="onMove" class="drag_item">
          <vab-col
            v-for="(item, index) in columns"
            :key="item + index"
            :span="8"
            class="col_padding"
            :class="[item.disableCheck ? 'undraggable' : '']"
          >
            <div
              v-if="item.type != 'actions' && !$baseLodash.get(item, 'fixed')"
              class="flex_start flex_center_align mb8"
            >
              <div class="code">{{ index + 1 - disabledNum }}.</div>
              <div class="item_box">
                <div class="inner_box flex_space flex_center_align">
                  <el-checkbox
                    :disabled="item.disableCheck === true"
                    :label="item.label"
                  >
                    {{ item.label }}
                  </el-checkbox>
                  <svg-icon
                    icon-class="move_line"
                    class="svg_move_line"
                  ></svg-icon>
                </div>
              </div>
            </div>
          </vab-col>
        </vab-draggable>
      </el-checkbox-group>
    </vab-row>

    <div slot="footer" class="dialog-footer flex_end">
      <div class="flex_start flex_center_align">
        <div class="clear_box" @click="reset()">デフォルトに戻す</div>
        <el-button class="cancel ml8" @click="close">キャンセル</el-button>
        <el-button type="primary" class="sub_btn" @click="save()">
          <svg-icon class="sub_btn_svg" icon-class="check_line"></svg-icon>
          確定
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import VabDraggable from 'vuedraggable'
  import cache from '@/utils/cache'
  export default {
    name: 'VabDraggableColumn',
    components: {
      VabDraggable,
    },
    props: {
      check: {
        type: Array,
        default: () => [],
      },
      list: {
        type: Array,
        default: () => [],
      },
      //表示項目設定
      customConfig: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        show: false,
        cacheKey: `${this.$route.name}_columnConfig`,
        startList: [],
        startCheckList: [],
      }
    },
    computed: {
      columns() {
        return this.list
      },
      disabledNum() {
        return this.list.filter((item) => item.fixed === 'left').length
      },
      checkList: {
        get: function () {
          return this.check
        },
        set: function (newValue) {
          this.$emit('update:check', newValue)
        },
      },
    },
    mounted() {
      this.startCheckList = this.$baseLodash.cloneDeep(this.checkList)
      this.startList = this.$baseLodash.cloneDeep(this.list)
    },
    methods: {
      onMove(e) {
        // console.log('e', e)
        if (e.relatedContext.element.fixed) return false
        return true
      },
      initData(data) {
        this.checkList = data.checkList
        this.vm = data.vm
        this.show = true
      },
      //デフォルトに戻す
      reset() {
        cache.local.remove(this.cacheKey)
        //this.vm.initColumnConfig()
        this.vm.checkList = this.$baseLodash.map(this.columns, 'label')
        this.vm.updateColumnPosition(this.vm.initalColumns)
        this.startList = this.vm.initalColumns
        this.startCheckList = this.vm.initalColumns.map((item) => {
          return item.label
        })
        this.msgSuccess(
          this.$t(`validateMessage.${this.$messageCode.I00000454.name}`)
        )
        this.show = false
      },
      save() {
        cache.local.remove(this.cacheKey)
        let columnConfig = {
          columnOrder: this.list,
          checkList: this.checkList,
        }
        cache.local.setItem({ name: this.cacheKey, value: columnConfig })
        this.msgSuccess(
          this.$t(`validateMessage.${this.$messageCode.I00000455.name}`)
        )
        this.show = false
        this.vm.initColumnConfig()
        this.startCheckList = this.checkList
        this.$emit('update:check', this.checkList)
      },
      close() {
        if (cache.local.get(this.cacheKey)) {
          this.startList = cache.local.get(this.cacheKey).columnOrder
        }
        this.$emit('update:check', this.startCheckList)
        this.vm.updateColumnPosition(this.startList)
        this.show = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .dialog-footer {
    .clear_box {
      font-weight: 400;
      font-size: 12px;
      color: #004c82;
      cursor: pointer;
    }
    .quxiao {
      font-weight: 500;
      font-size: 14px;
      color: #848484;
      padding: 0 30px;
      cursor: pointer;
    }
  }

  .col_padding {
    padding: 0 10px;
    .code {
      font-weight: 400;
      font-size: 14px;
      color: #000000;
      width: 30px;
    }
  }
  .item_box {
    background: #ffffff;
    border: 1px solid #d1dae1;
    border-radius: 4px;
    // margin-bottom: 8px;
    flex: 1;
    .inner_box {
      padding: 10px 8px;
      margin-left: 16px;

      .picon {
        width: 12px;
        height: 6px;
      }
    }
  }
</style>
