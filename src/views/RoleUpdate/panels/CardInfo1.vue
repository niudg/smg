<template>
  <div class="list">
    <vab-card ref="ref27399">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        ロール
      </template>
      <vab-row ref="ref72360" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref57750"
            label="ロールコード"
            prop="roleCode"
            maxlength="20"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref69788"
            label="ロール名"
            prop="roleName"
            maxlength="100"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref26898" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref85355"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
        <vab-col :span="12"></vab-col>
      </vab-row>
    </vab-card>
  </div>
</template>

<script>
  export default {
    inject: {
      page: {
        default: '',
      },
    },
    data() {
      return {}
    },
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
