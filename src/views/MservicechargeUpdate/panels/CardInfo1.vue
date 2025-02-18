<template>
  <div class="list">
    <vab-card ref="ref100441">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        サービス料金マスタ
      </template>
      <vab-row ref="ref23127" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref97795"
            label="サービス料金"
            prop="name"
            maxlength="200"
            validate="required"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref22483"
            label="サービス"
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
      <vab-row ref="ref98879" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref21785"
            label="料金"
            prop="charge"
            maxlength="10"
            type="number"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-textarea
            ref="ref39162"
            label="記述"
            prop="description"
            maxlength="500"
          ></vab-textarea>
        </vab-col>
      </vab-row>
      <vab-row ref="ref56563" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref99447"
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
