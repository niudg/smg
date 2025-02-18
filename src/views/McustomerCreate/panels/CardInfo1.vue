<template>
  <div class="list">
    <vab-card ref="ref118870">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        取引先マスタ
      </template>
      <vab-row ref="ref14791" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref76131"
            label="取引コード"
            prop="code"
            maxlength="20"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref89397"
            label="取引名"
            prop="name"
            maxlength="100"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref86563" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref46984"
            label="url_prefix"
            prop="urlPrefix"
            maxlength="100"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref20690"
            label="代表者"
            prop="representative"
            maxlength="100"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref23705" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref64682"
            label="郵便番号"
            prop="postCode"
            maxlength="10"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref71215"
            label="住所"
            prop="address"
            maxlength="200"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref16654" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref14749"
            label="電話番号"
            prop="telephone"
            maxlength="14"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref72233"
            label="連絡窓口"
            prop="contactPerson"
            maxlength="100"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref99480" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref50392"
            label="連絡窓口電話番"
            prop="contactPersonTelephone"
            maxlength="14"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref30578"
            label="記述"
            prop="description"
            maxlength="500"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref102373" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref105027"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref57101"
            label="ユーザー名"
            prop="userName"
            maxlength="100"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref80773" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref117726"
            label="パスワード"
            prop="password"
            maxlength="100"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref75277"
            label="メールアドレス "
            prop="email"
            maxlength="50"
            validate="required"
          ></vab-input>
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
