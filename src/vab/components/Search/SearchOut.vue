<template>
  <el-dialog
    class="mode search_criteria_outdialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="layout-dialog"
    :title="title"
    top="5vh"
    :visible.sync="show"
    append-to-body
  >
    <vab-form ref="form" label-width="80px" label-position="left" :model="form">
      <div class="flex_space flex_center_align mb12">
        <div class="new_h_date flex_center_align">
          <svg-icon
            icon-class="tryangle_down"
            class="new_h_date_svg"
          ></svg-icon>
          <span class="ml2">
            実行したい操作と対象の検索条件を選択してください
          </span>
        </div>
        <div class="nums">
          <span>登録済み件数</span>
          <span class="ml8">{{ list.length }}件/10件</span>
        </div>
      </div>
      <vab-row>
        <vab-col class="flex_center_align" :span="24">
          <span class="subtitle_84">操作：</span>
          <el-select v-model="form.workType" class="operate_select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </vab-col>
      </vab-row>
      <div class="conditions">
        <template v-if="form.workType == 0">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="cond_item flex_start flex_center_align"
            :class="index == list.length - 1 ? '' : 'cond_item_bor'"
          >
            <label class="flex_center_align">
              <el-radio
                v-model="form.changeRadio"
                class="searchOut_radio"
                :label="item.id"
              >
                <span class="word">{{ item.name }}</span>
              </el-radio>
            </label>
          </div>
        </template>
        <template v-if="form.workType == 1">
          <el-checkbox-group
            v-model="form.changeCheckbox"
            class="flex_colum checkbox_main"
          >
            <el-checkbox
              v-for="(item, index) in list"
              :key="index"
              class="cond_item flex_center_align"
              :class="index == list.length - 1 ? '' : 'cond_item_bor'"
              :label="item.id"
            >
              <span class="word">{{ item.name }}</span>
            </el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
    </vab-form>
    <div slot="footer" class="dialog-footer flex_end">
      <div class="flex_start flex_center_align">
        <!-- <div class="quxiao" @click="show = false">キャンセル</div> -->
        <el-button class="cancel" @click="show = false">キャンセル</el-button>
        <!-- <vab-button :btn-list="btnList"></vab-button> -->
        <el-button
          type="primary"
          :disabled="isWorkType"
          class="sub_btn"
          @click="confirm()"
        >
          <svg-icon
            class="sub_btn_svg"
            icon-class="check_line"
            :class="isWorkType ? 'answer_disabled' : 'answer'"
          ></svg-icon>
          確定
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import cache from '@/utils/cache'
  export default {
    name: 'SearchOut',
    data() {
      return {
        options: [
          {
            value: 0,
            label: '選択した条件を呼び出し',
          },
          {
            value: 1,
            label: '選択した条件を削除',
          },
        ],
        show: false,
        title: '検索条件の呼び出し・削除',
        form: {
          workType: 0,
          changeRadio: '',
          changeCheckbox: [],
        },
        btnList: [
          {
            name: '確定',
            icon: 'answer',
            type: 'button',
            hidden: false,
            click: () => {
              let { workType } = this.form.workType
              if (workType == 0 && this.form.changeRadio == '') {
                this.msgError(
                  this.$t(`validateMessage.${this.$messageCode.W00000034.name}`)
                )
                return
              }
              if (workType == 1 && this.form.changeCheckbox.length == 0) {
                this.msgError(
                  this.$t(`validateMessage.${this.$messageCode.W00000034.name}`)
                )
                return
              }
              if (workType == 0 && this.form.changeRadio) {
                this.showData()
              }
              if (workType == 1 && this.form.changeCheckbox.length > 0) {
                this.deleteData()
              }
              this.clearForm()
            },
          },
        ],
        list: [],
      }
    },
    computed: {
      isWorkType() {
        if (this.form.workType == 0) {
          if (this.form.changeRadio === '') {
            return true
          } else {
            return false
          }
        } else {
          if (this.form.changeCheckbox == 0) {
            return true
          } else {
            return false
          }
        }
      },
    },
    // watch: {
    //   'form.workType'() {
    //     this.form.changeRadio = ''
    //     this.form.changeCheckbox = []
    //   },
    // },
    methods: {
      // 展示検索
      showData() {
        let item = this.$baseLodash.find(this.list, {
          id: this.form.changeRadio,
        })
        if (!this.$baseLodash.isUndefined(item)) {
          this.$emit('setQueryFormData', item?.queryForm)
        }
        this.show = false
      },
      // 検索の削除
      deleteData() {
        let chuanList = this.$baseLodash.cloneDeep(this.list)
        let queryDisplayItemsContent = chuanList.filter(
          (item) => !this.form.changeCheckbox.includes(item.id)
        )
        cache.local.setJSON(this.$route.name, queryDisplayItemsContent)
        this.msgSuccess('削除しました。')
        this.list = queryDisplayItemsContent
        this.form.changeCheckbox = []
      },
      // 現在のページに保存されているデータを取得する
      getSearchDataList() {
        let content = cache.local.getJSON(this.$route.name)
        if (content) {
          this.list = content
        }
      },
      // 初期化
      initData() {
        this.getSearchDataList()
        this.show = true
      },
      // フォームを空にする
      clearForm() {
        this.$refs.form.resetFields()
        this.list = []
        this.form.changeRadio = ''
        this.form.changeCheckbox = []
      },
      confirm() {
        let workType = this.form.workType
        if (workType == 0 && this.form.changeRadio == '') {
          this.msgError('データを選択してください。')
          return
        }
        if (workType == 1 && this.form.changeCheckbox.length == 0) {
          this.msgError('データを選択してください。')
          return
        }
        if (workType == 0 && this.form.changeRadio) {
          this.showData()
        }
        if (workType == 1 && this.form.changeCheckbox.length > 0) {
          this.deleteData()
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .checkbox_main {
    width: 100%;
  }
  .quxiao {
    font-weight: 500;
    font-size: 14px;
    color: #848484;
    padding: 0 20px;
    cursor: pointer;
  }
  .m20 {
    margin: 0 20px;
  }
  .mode ::v-deep {
    .el-dialog__footer {
      border-top: none;
    }
    .nums {
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      color: #848484;
    }
  }

  .conditions {
    .cond_item {
      padding: 16px 0;
      width: 100%;
      // .left_box {
      //   width: 32px;
      // }
      .word {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #000000;
        padding-left: 10px;
      }
    }
  }
</style>
