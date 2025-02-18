<template>
  <div class="list">
    <vab-card ref="ref78865" :clearable="true">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        サ-ビスマスタ
      </template>
      <vab-row ref="ref63393" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref48130"
            label="サ-ビスコード"
            prop="code"
            maxlength="20"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref31005"
            label="サ-ビス名"
            prop="name"
            maxlength="100"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref20972" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref44015"
            label="バージョン"
            prop="version"
            maxlength="20"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref72528"
            label="サ-ビスURL"
            prop="serviceUrl"
            maxlength="100"
            :clearable="true"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref81907" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref97432"
            label="データソース"
            prop="datasourceId"
            maxlength="10"
            data-key="MDatasource"
            :filterable="true"
            value-id="id"
            :clearable="true"
            label-id="code"
            type="number"
            validate="required"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref77435"
            label="キャッシュ"
            prop="cacheId"
            maxlength="10"
            data-key="MCache"
            :filterable="true"
            value-id="id"
            :clearable="true"
            label-id="code"
            type="number"
            validate="required"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref62492" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref83850"
            label="トライアル期間（日）"
            prop="trialProid"
            maxlength="10"
            :clearable="true"
            type="number"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref62164"
            label="記述"
            prop="description"
            maxlength="500"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref101399" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref58258"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            :clearable="true"
            :filterable="true"
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
