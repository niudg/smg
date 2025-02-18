<template>
  <div class="list">
    <vab-card ref="ref50686">
      <template #header>
        <vab-icon icon="send-plane-2-line" />
        テナントマスタ
      </template>
      <vab-validate-table
        ref="ref57028"
        prop="customerIdMTenentModelList"
        primarykey="id"
        :border="true"
        :max-height="500"
        :nav-buttons="navButtons1"
        :columns="columns1"
        primary-key="id"
        @action-button-click="handleActionButtonClick"
        @toolbar-button-click="handleToolBarButtonClick"
      ></vab-validate-table>
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
      return {
        navButtons1: [
          {
            size: 'middle',
            disabled: false,
            type: 'primary',
            name: '新規',
            primarykey: 'id',
            btnChangeType: 'btn',
            permissions: {},
            eventList: [
              {
                eventCode: 'click',
                actionList: [
                  {
                    actionCode: 'page_addRow',
                  },
                ],
              },
            ],
          },
        ],
        columns1: [
          {
            prop: 'code',
            javaData: {},
            label: 'テナントコード',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 20,
            required: true,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '20',
              validate: 'required',
            }),
          },
          {
            prop: 'name',
            javaData: {},
            label: 'テナント名',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 100,
            required: true,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '100',
              validate: 'required',
            }),
          },
          {
            prop: 'address',
            javaData: {},
            label: 'テナント住所',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 500,
            required: true,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '500',
              validate: 'required',
            }),
          },
          {
            prop: 'contactPerson',
            javaData: {},
            label: '連絡窓口',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 100,
            required: true,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '100',
              validate: 'required',
            }),
          },
          {
            prop: 'contactPersonTelephone',
            javaData: {},
            label: '連絡窓口電話番号',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 14,
            required: true,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '14',
              validate: 'required',
            }),
          },
          {
            prop: 'contactPersonEmail',
            javaData: {},
            label: '連絡窓口メールアドレス',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 50,
            required: true,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '50',
              validate: 'required',
            }),
          },
          {
            prop: 'dbSchema',
            javaData: {},
            label: 'DBスキーマ',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 20,
            required: false,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '20',
            }),
          },
          {
            prop: 'cacheCode',
            javaData: {},
            label: 'キャッシュコード',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 20,
            required: false,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '20',
            }),
          },
          {
            prop: 'description',
            javaData: {},
            label: '記述',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
            ctrl: 'input',
            maxlength: 500,
            required: false,
            customValidate: null,
            config: () => ({
              ctrl: 'input',
              maxlength: '500',
            }),
          },
          {
            prop: 'validStatus',
            javaData: {},
            label: 'ステータス',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            formatter: (row, column, cellValue) =>
              this.formatTableCell(
                row,
                column,
                cellValue
              )('ENUM', this.$divisions.ValidStatusEnum),
            ctrl: 'select',
            maxlength: 1,
            required: false,
            customValidate: null,
            config: () => ({
              ctrl: 'select',
              filter: 'ValidStatus',
              maxlength: '1',
            }),
          },
          {
            type: 'actions',
            fixed: 'right',
            label: '操作',
            headerAlign: 'center',
            minWidth: '100',
            actionsList: [
              {
                size: 'middle',
                disabled: false,
                type: 'primary',
                name: ' 削除',
                primarykey: 'id',
                btnChangeType: 'btn',
                permissions: {},
                eventList: [
                  {
                    eventCode: 'click',
                    actionList: [
                      {
                        actionCode: 'page_deleteRow',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    },
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped></style>
