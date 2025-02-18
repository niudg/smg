<template>
  <div class="list">
    <vab-card ref="ref13763">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        キャッシュマスタ
      </template>
      <vab-row ref="ref65215" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref21445"
            label="キャッシュコード"
            prop="code"
            maxlength="20"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref7131"
            label="キャッシュタイプ"
            prop="type"
            maxlength="10"
            filter="CacheType"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref45398" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref45667"
            label="ホスト"
            prop="host"
            maxlength="100"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref85465"
            label="ポート"
            prop="port"
            maxlength="10"
            type="number"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref49139" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref28628"
            label="パスワード"
            prop="password"
            maxlength="30"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref22518"
            label="記述"
            prop="description"
            maxlength="500"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref46825" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref35719"
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
