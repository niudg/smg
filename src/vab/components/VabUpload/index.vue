<template>
  <el-upload
    v-if="multiple"
    ref="upload"
    action="#"
    :on-error="uploadError"
    :show-file-list="false"
    multiple
    :auto-upload="false"
    :disabled="disabled"
    :class="{ upload_disabled: disabled }"
    :on-change="(file, fileList) => changeFileList(file, fileList)"
  >
    <span class="upload_btn" :class="showSvg ? '' : 'pd0'">
      <svg-icon v-if="showSvg" icon-class="upload" />
      <span class="name" :class="showSvg ? '' : 'pd0'">{{ btnName }}</span>
    </span>
  </el-upload>
  <el-upload
    v-else
    ref="upload"
    action="#"
    :on-error="uploadError"
    :show-file-list="false"
    :disabled="disabled"
    :auto-upload="false"
    :class="{ upload_disabled: disabled }"
    :on-change="(file, fileList) => changeFileList(file, fileList)"
  >
    <span class="upload_btn" :class="showSvg ? '' : 'pd0'">
      <svg-icon v-if="showSvg" icon-class="upload" />
      <span class="name" :class="showSvg ? '' : 'pd0'">{{ btnName }}</span>
    </span>
  </el-upload>
</template>

<script>
  import store from '@/store'
  import { default as constants } from '@/config'
  const { baseURL } = constants
  import { uploadBath } from '@/api/file'
  export default {
    name: 'VabUpload',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      btnName: {
        type: String,
        default: 'アップロード',
      },
      uploadUrl: {
        type: String,
        default: '',
      },
      batchUrl: {
        type: String,
        default: '',
      },
      paramsData: {
        type: Object,
        default: () => {},
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      showSvg: {
        type: Boolean,
        default: true,
      },
      initBefore: {
        type: Boolean,
        default: false,
      },
      actionItem: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        uploadActionUrl: baseURL + this.uploadUrl,
        fileList: [],
      }
    },
    computed: {
      headers() {
        return {
          Authorization: `Bearer ${store.getters['user/token']}`,
        }
      },
      uploadData() {
        return {
          docId: this.paramsData.docId,
        }
      },
    },
    watch: {
      fileList(val) {
        this.$refs.upload.clearFiles()
        if (this.multiple) {
          setTimeout(() => {
            if (val.length) {
              this.uploadAll()
            }
          }, 300)
        } else {
          val && val.length && this.upload()
        }
      },
    },
    methods: {
      changeFileList(file, fileList) {
        this.fileList = fileList
      },
      async uploadAll() {
        // if (!this.checkfileSize(this.fileList)) {
        //   return
        // }
        const FILE_SIZE_M = 10 * 1024 * 1024
        let fileList = []
        let checkFileSize = false
        this.fileList.filter((row) => {
          if (row.size > FILE_SIZE_M) {
            checkFileSize = true
          } else {
            fileList.push(row)
          }
        })
        if (checkFileSize) {
          if (fileList.length > 0) {
            this.msgInfo(
              this.format(
                this.$t(`validateMessage.${this.$messageCode.E00000515.name}`),
                '10MB'
              )
            )
          } else {
            this.msgError(
              this.format(
                this.$t(`validateMessage.${this.$messageCode.E00000515.name}`),
                '10MB'
              )
            )
            return
          }
        }
        try {
          let formData = new FormData()
          if (this.paramsData?.buildingCd) {
            formData.append('buildingCd', this.paramsData.buildingCd)
          }
          if (this.paramsData?.reportNo) {
            formData.append('reportNo', this.paramsData.reportNo)
          }
          fileList.forEach((file) => {
            formData.append('files', file.raw) //ファイル
          })
          this.$baseColorfullLoading()
          const res = await uploadBath(`${this.batchUrl}`, formData)
          if (res) {
            this.$emit('on-success-bath', res)
          }
        } finally {
          this.fileList = []
          this.$baseColorfullLoading().close()
        }
      },
      async upload() {
        if (!this.checkfileSize(this.fileList)) {
          return
        }
        this.$baseColorfullLoading()
        try {
          let formData = new FormData()
          this.fileList.forEach((file) => {
            formData.append('file', file.raw) //ファイル
          })
          if (!this.$baseLodash.isUndefined(this.paramsData)) {
            Object.keys(this.paramsData).filter((item) => {
              formData.append(item, this.paramsData[item])
            })
          }
          const res = await uploadBath(`${this.uploadUrl}`, formData)
          if (res) {
            this.$emit('on-success', res, this.actionItem, this.fileList)
          }
        } finally {
          this.fileList = []
          this.$baseColorfullLoading().close()
        }
      },
      handleChange(file, fileList) {
        this.$emit('on-change', file, fileList)
      },
      uploadError(err) {
        const result = JSON.parse(err.message)
        this.msgError(result.error)
      },
      uploadFile() {
        let dom = this.$refs['upload'].$children[0].$refs.input
        dom.click(function (event) {
          event.stopPropagation()
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import '@/vab/styles/reportRc.scss';
</style>
<style lang="scss" scoped>
  .file_box_new .header_box .upload_disabled .upload_btn {
    background: #efefef;
    color: #a1a1a1;
    cursor: default;
    .svg-icon {
      color: #a1a1a1;
    }
  }
  .file_box_new .header_box .upload_disabled .upload_btn:hover {
    background: #efefef;
    color: #a1a1a1;
    cursor: default;
    .svg-icon {
      color: #a1a1a1;
    }
  }

  .el-button--small {
    padding: 0 !important;
    span.name {
      margin-left: 0 !important;
    }
  }
</style>
