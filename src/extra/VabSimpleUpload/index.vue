<template>
  <!-- <el-upload
    :action="uploadActionUrl"
    :headers="headers"
    :on-error="uploadError"
    :on-success="uploadSuccess"
    :show-file-list="false"
  >
    <el-button icon="el-icon-document-add" type="primary">
      {{ title }}
    </el-button>
  </el-upload> -->
  <div class="upload_box">
    <div class="line_box">
      <span class="title">インポート設定</span>
    </div>
    <el-row :gutter="10" class="upload" type="flex">
      <el-col :span="18">
        <el-input v-model="file" readonly></el-input>
      </el-col>
      <el-col :span="6">
        <el-upload
          ref="upload"
          class="upload-demo"
          action=""
          :limit="1"
          :on-change="handleChange"
          :show-file-list="false"
          :auto-upload="false"
          accept=".xls, .xlsx"
        >
          <el-button slot="trigger" size="small" type="primary">選択</el-button>
          <el-button
            style="margin-left: 5px"
            size="small"
            type="primary"
            :disabled="!file"
            @click="handleSubmitUpload"
          >
            インポート
          </el-button>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { upload } from '@/api/file'
  import { saveAs } from 'file-saver'
  export default {
    name: 'VabSimpleUpload',
    props: {
      uploadUrl: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: 'インポート',
      },

      validate: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        uploadActionUrl: this.uploadUrl,
        file: null,
        fileList: null,
        loading: null,
      }
    },
    methods: {
      // 選択処理
      handleChange(file, fileList) {
        //クリア
        this.reset()

        let result = true
        if (this.$baseLodash.isFunction(this.validate)) {
          result = this.validate.call(this, file.name)
        }

        if (!result) {
          this.reset()
          return
        }
        this.file = file.name
        this.fileList = fileList
      },
      reset() {
        this.file = null
        this.fileList = null
        this.$refs.upload.clearFiles()
      },
      // インポート処理
      async handleSubmitUpload() {
        if (!this.checkfileSize(this.fileList)) {
          return
        }

        this.loading = this.$baseColorfullLoading()
        let formData = new FormData() //  用FormData存放上传文件
        this.fileList.forEach((file) => {
          formData.append('file', file.raw) //文件
        })

        try {
          let res = await upload(`${this.uploadActionUrl}`, formData)
          this.$emit('on-success')
          this.$baseNotify(
            this.$t(`validateMessage.${this.$messageCode.I00000403.name}`),
            null,
            'info'
          )
          if (res) {
            let blob = res
            if (this.$baseLodash.has(res, 'data')) {
              blob = new Blob([res.data])
              saveAs(blob, decodeURI(res.filename || res.fileName))
            }
          }
        } finally {
          this.file = null
          this.fileList = null
          if (this.loading != null) {
            this.loading.close()
          }
          this.reset()
        }
      },
    },
  }
</script>
<style scoped lang="scss">
  .upload_box {
    border: 1px solid rgba(215, 215, 215, 1);
    .line_box {
      position: relative;
      height: 35px;
      border-bottom: 1px solid rgba(215, 215, 215, 1);
      .title {
        position: absolute;
        bottom: -8px;
        left: 20px;
        font-size: 12px;
        background: #fff;
      }
    }
    .upload {
      padding: 20px;
    }
  }
</style>
