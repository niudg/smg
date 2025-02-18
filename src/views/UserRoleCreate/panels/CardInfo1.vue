<template>
  <div class="list">
    <vab-card ref="ref97687">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        ユーザーロール
      </template>
      <vab-row ref="ref26000" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref88502"
            label="ユーザー"
            prop="userId"
            maxlength="10"
            data-key="appUser"
            :filterable="true"
            value-id="userId"
            :clearable="true"
            label-id="userName"
            type="number"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref103734"
            label="ロール"
            prop="roleId"
            maxlength="10"
            data-key="role"
            :filterable="true"
            value-id="roleId"
            :clearable="true"
            label-id="roleName"
            type="number"
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
