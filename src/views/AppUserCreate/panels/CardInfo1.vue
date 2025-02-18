<template>
  <div class="list">
    <vab-card ref="ref38092">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        ユーザー
      </template>
      <vab-row ref="ref55200" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref73828"
            label="ユーザーコード"
            prop="userCode"
            maxlength="20"
          ></vab-input>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref57543"
            label="ユーザー名"
            prop="userName"
            maxlength="100"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref71434" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref19749"
            label="パスワード"
            prop="password"
            maxlength="100"
          ></vab-input>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-select
            ref="ref65895"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
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
