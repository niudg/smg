<template>
  <el-dialog
    class="mode search_criteria_dialog search_save"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="layout-dialog"
    :title="title"
    top="5vh"
    :visible.sync="show"
    append-to-body
  >
    <vab-form
      ref="form"
      label-width="78px"
      label-position="left"
      :model="form"
      :rules="rules"
    >
      <div class="flex_space flex_center_align">
        <!-- <div class="h_date">
          <span class="h_title">
            <slot name="h_title">最大10件まで登録できます</slot>
          </span>
        </div> -->
        <div class="new_h_date flex_center_align">
          <svg-icon
            icon-class="tryangle_down"
            class="new_h_date_svg"
          ></svg-icon>
          <span class="ml2">最大10件まで登録できます</span>
        </div>
        <div class="nums">
          登録済み件数
          <span></span>
          {{ list.length }}件/10件
        </div>
      </div>
      <vab-row>
        <vab-col :span="24">
          <vab-input label="検索条件名" prop="name" maxlength="50"></vab-input>
          <span class="word">最大50文字まで入力できます</span>
        </vab-col>
      </vab-row>
    </vab-form>
    <div slot="footer" class="dialog-footer flex_end">
      <div class="flex_start flex_center_align">
        <!-- <div class="quxiao" @click="clearForm">キャンセル</div> -->
        <el-button class="cancel" @click="show = false">キャンセル</el-button>
        <!-- <vab-button :disabled="!!form.name" :btn-list="btnList"></vab-button> -->
        <el-button
          type="primary"
          :disabled="isName"
          class="sub_btn"
          @click="confirm()"
        >
          <svg-icon
            class="sub_btn_svg"
            icon-class="check_line"
            :class="isName ? 'answer_disabled' : 'answer'"
          ></svg-icon>
          登録
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import cache from '@/utils/cache'
  import { uuid } from '@/utils/index'
  export default {
    name: 'SearchSave',
    data() {
      return {
        show: false,
        title: '現在の検索条件を登録',
        model: {},
        form: {
          name: null,
        },
        queryForm: {},
        rules: {},
        list: [],
      }
    },
    computed: {
      isName() {
        return this.form.name === null || this.form.name === ''
      },
    },
    methods: {
      // 現在のページに保存されているデータを取得する
      getSearchDataList() {
        let content = cache.local.getJSON(this.$route.name)
        if (content) {
          this.list = content
        }
      },
      // 初期化
      async initData(form) {
        this.getSearchDataList()
        this.queryForm = form
        this.show = true
      },
      // 検索条件を登録
      async saveSearchData() {
        if (this.list?.length == 10) {
          this.msgError('最大10件まで登録できます。')
          return
        }
        if (this.list.length > 0) {
          let nameList = this.list.map((item) => item.name)
          if (nameList.includes(this.form.name)) {
            this.msgError('重複した条件が存在しています。')
            return
          }
        }
        this.list.push({
          id: uuid(),
          name: this.form.name,
          queryForm: this.queryForm,
        })
        cache.local.setJSON(this.$route.name, this.list)
        this.msgSuccess('登録しました。')
        this.show = false
        this.clearForm()
      },
      // フォームを空にする
      clearForm() {
        this.$refs['form'].resetFields()
        this.$refs['form'].clearValidate()
        this.form.name = ''
      },
      confirm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.saveSearchData()
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .quxiao {
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    color: #848484;
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
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      color: #848484;
    }
  }
  .word {
    padding-left: 78px;
    font-size: 11px;
    font-weight: 400;
    color: #a1a1a1;
  }
</style>
