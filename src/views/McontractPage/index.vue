<template>
  <div class="list">
    <vab-query-form
      label-width="140px"
      ref="queryForm"
      :rules="rules"
      :model="queryForm"
      @search="handleSearch"
      @clear="handleClear"
      :event-list="[
        {
          eventCode: 'search',
          actionList: [
            {
              actionCode: 'page_reload',
              vmKey: 29112,
              vmName: 'データテーブル拡張',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
    >
      <vab-row ref="ref47941" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref107643"
            label="テナント"
            prop="tenentId"
            maxlength="10"
            data-key="MTenent"
            :filterable="true"
            value-id="id"
            :show-table-header="true"
            :max-height="500"
            :border="true"
            :clearable="true"
            label-id="name"
            type="number"
            api-method="post"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref67238"
            label="サ-ビス"
            prop="serviceId"
            maxlength="10"
            data-key="MService"
            :filterable="true"
            value-id="id"
            :clearable="true"
            label-id="name"
            type="number"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref33138" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref88272"
            label="サービス料金"
            prop="serviceChargeId"
            maxlength="10"
            data-key="MServiceCharge"
            :filterable="true"
            value-id="id"
            :clearable="true"
            label-id="name"
            type="number"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref36819"
            label="開通状態"
            prop="openingStatus"
            maxlength="1"
            filter="OpeningStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref72114" :gutter="20">
        <vab-col :span="12">
          <vab-date-picker
            ref="ref87985"
            label="契約開始日"
            prop="fromDate"
            maxlength="10"
            format="yyyy-MM-dd"
          ></vab-date-picker>
        </vab-col>
        <vab-col :span="12">
          <vab-date-picker
            ref="ref28850"
            label="契約終了日"
            prop="endDate"
            maxlength="10"
            format="yyyy-MM-dd"
          ></vab-date-picker>
        </vab-col>
      </vab-row>
      <vab-row ref="ref20050" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref85182"
            label="契約期間(月)"
            prop="period"
            maxlength="10"
            type="number"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref21544"
            label="割引金額"
            prop="discountAmount"
            maxlength="10"
            :clearable="true"
            type="number"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref106002" :gutter="20">
        <vab-col :span="12" :clearable="true">
          <vab-select
            ref="ref95376"
            label="通貨"
            prop="currency"
            maxlength="3"
            :clearable="true"
            :filterable="true"
            filter="CurrencyType"
            data-type="local"
          ></vab-select>
        </vab-col>
        <vab-col :span="12" :clearable="true">
          <vab-select
            ref="ref68147"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            :clearable="true"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
    </vab-query-form>
    <vab-table
      ref="ref29112"
      :nav-buttons="navButtons1"
      :border="true"
      :show-table-header="true"
      :has-pager="true"
      :max-height="600"
      :clearable="true"
      label="table"
      :columns="columns1"
      :api-url="'/page/McontractPage/mcontractPageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'McontractPage',
    components: {},
    mixins: [mixins],
    provide() {
      return {
        page: this,
      }
    },
    props: {},
    data() {
      return {
        queryForm: {},
        rules: {},
        navButtons1: [
          {
            size: 'middle',
            disabled: false,
            type: 'primary',
            name: '新增',
            primarykey: 'id',
            btnChangeType: 'btn',
            permissions: {},
            eventList: [
              {
                eventCode: 'click',
                actionList: [
                  {
                    actionCode: 'page_link',
                    route: 'McontractCreate',
                  },
                ],
              },
            ],
          },
        ],
        columns1: [
          {
            prop: 'openingStatus',
            javaData: {},
            label: '開通状態',
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
              )('ENUM', this.$divisions.OpeningStatusEnum),
          },
          {
            prop: 'fromDate',
            javaData: {},
            label: '契約開始日',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            formatter: (row, column, cellValue) =>
              this.formatTableCell(row, column, cellValue)('LOCALDATE'),
          },
          {
            prop: 'endDate',
            javaData: {},
            label: '契約終了日',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            formatter: (row, column, cellValue) =>
              this.formatTableCell(row, column, cellValue)('LOCALDATE'),
          },
          {
            prop: 'period',
            javaData: {},
            label: '契約期間(月)',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            formatter: (row, column, cellValue) =>
              this.formatTableCell(row, column, cellValue)('INTEGER'),
          },
          {
            prop: 'discountAmount',
            javaData: {},
            label: '割引金額',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            formatter: (row, column, cellValue) =>
              this.formatTableCell(row, column, cellValue)('INTEGER'),
          },
          {
            prop: 'currency',
            javaData: {},
            label: '通貨',
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
              )('ENUM', this.$divisions.CurrencyTypeEnum),
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
          },
          {
            prop: 'serviceIdMServiceModel.name',
            javaData: {},
            label: 'サ-ビス名',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'serviceChargeIdMServiceChargeModel.name',
            javaData: {},
            label: 'サービス料金',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'tenentIdMTenentModel.name',
            javaData: {},
            label: 'テナント名',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            type: 'actions',
            fixed: 'right',
            label: '操作',
            headerAlign: 'center',
            minWidth: '112',
            actionsList: [
              {
                size: 'middle',
                disabled: false,
                type: 'primary',
                name: '操作',
                primarykey: 'id',
                btnChangeType: 'btnGroup',
                buttonList: [
                  {
                    disabled: false,
                    type: 'primary',
                    name: '変更',
                    primarykey: 'id',
                    btnChangeType: 'menu',
                    eventList: [
                      {
                        eventCode: 'click',
                        actionList: [
                          {
                            actionCode: 'page_link',
                            route: 'McontractUpdate',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    disabled: false,
                    type: 'primary',
                    name: '削除',
                    primarykey: 'id',
                    btnChangeType: 'menu',
                    eventList: [
                      {
                        eventCode: 'click',
                        actionList: [
                          {
                            actionCode: 'page_api',
                            apiUrl: '/MContract/',
                            apiMethod: 'DELETE',
                            primarykey: 'id',
                            apiActionType: 'selectApi',
                          },
                          {
                            actionCode: 'page_reload',
                            vmKey: 29112,
                            vmName: 'データテーブル拡張',
                          },
                        ],
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
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      handleSearch() {},
      handleClear() {},
      handleActionButtonClick() {},
      handleToolBarButtonClick() {},
      fetchData() {
        this.$refs['ref29112'].fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
