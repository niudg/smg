<template>
  <el-button icon="el-icon-download" type="primary" @click="handleSubmit">
    {{ buttonText }}
  </el-button>
</template>
<script>
  import { baseURL } from '@/config/net.config'
  import fileDownload from 'js-file-download'
  import { download } from '@/api/file'
  export default {
    name: 'VabFileDown',
    props: {
      fileName: {
        type: String,
        default: '',
      },

      buttonText: {
        type: String,
        default: 'データ出力',
      },
    },
    data() {
      return {}
    },
    methods: {
      handleSubmit() {
        this.$emit('fetch-url')
      },
      async invoke(url, fileName) {
        const data = await download(baseURL + url)
        fileDownload(data, fileName)
      },
    },
  }
</script>

<style></style>
