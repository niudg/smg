<template>
  <div class="list">
    <vab-card ref="ref28899" :clearable="true">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        契約管理
      </template>
      <vab-row ref="ref70283" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref24871"
            label="テナント"
            prop="tenentId"
            maxlength="10"
            data-key="MTenent"
            :filterable="true"
            value-id="id"
            :clearable="true"
            label-id="name"
            type="number"
            validate="required"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref79516"
            label="サ-ビス"
            prop="serviceId"
            maxlength="10"
            data-key="MService"
            :filterable="true"
            value-id="id"
            :clearable="true"
            label-id="name"
            type="number"
            validate="required"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref98039" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref32765"
            label="サービス料金"
            prop="serviceChargeId"
            maxlength="10"
            data-key="MServiceCharge"
            :filterable="true"
            value-id="id"
            :clearable="true"
            label-id="name"
            type="number"
            validate="required"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref31540"
            label="開通状態"
            prop="openingStatus"
            maxlength="1"
            filter="OpeningStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref106704" :gutter="20">
        <vab-col :span="12">
          <vab-date-picker
            ref="ref43181"
            label="契約開始日"
            prop="fromDate"
            maxlength="10"
            format="yyyy-MM-dd"
            validate="required"
          ></vab-date-picker>
        </vab-col>
        <vab-col :span="12">
          <vab-date-picker
            ref="ref79979"
            label="契約終了日"
            prop="endDate"
            maxlength="10"
            format="yyyy-MM-dd"
          ></vab-date-picker>
        </vab-col>
      </vab-row>
      <vab-row ref="ref37523" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref107208"
            label="契約期間(月)"
            prop="period"
            maxlength="10"
            type="number"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-switch
            ref="ref57232"
            label="自動更新フラグ"
            prop="autoExtension"
            maxlength="1"
            validate="required"
          ></vab-switch>
        </vab-col>
      </vab-row>
      <vab-row ref="ref22912" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref18206"
            label="割引金額"
            prop="discountAmount"
            maxlength="10"
            type="number"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref89196"
            label="契約金額"
            prop="amount"
            maxlength="10"
            type="number"
            validate="required"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref78579" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref51646"
            label="通貨"
            prop="currency"
            maxlength="3"
            :clearable="true"
            filter="CurrencyType"
            data-type="local"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref52909"
            label="記述"
            prop="description"
            maxlength="500"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref61127" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref57651"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
        <vab-col :span="12" :clearable="true"></vab-col>
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
