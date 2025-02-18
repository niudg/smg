<template>
  <div class="list">
    <vab-card ref="ref88591">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        データソースマスタ
      </template>
      <vab-row ref="ref81061" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref25924"
            label="データソースコード"
            prop="code"
            maxlength="20"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-select
            ref="ref81123"
            label="ドライバー"
            prop="driverClassName"
            maxlength="100"
            filter="DriverClassName"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref95087" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref25306"
            label="識別子"
            prop="dbIdentifier"
            maxlength="100"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref66238"
            label="ユーザー"
            prop="dbUser"
            maxlength="14"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref26433" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref33324"
            label="パスワード"
            prop="dbPassword"
            maxlength="200"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref18932"
            label="記述"
            prop="description"
            maxlength="500"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref100482" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-select
            ref="ref100970"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12"></vab-col>
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
