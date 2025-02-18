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
              vmKey: 106386,
              vmName: 'データテーブル拡張',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
    >
      <vab-row ref="ref53694" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref74248"
            label="サービス料金"
            prop="name"
            maxlength="200"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref29677"
            label="サービス"
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
      <vab-row ref="ref109412" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref77973"
            label="料金"
            prop="charge"
            maxlength="10"
            type="number"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref36919"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            :filterable="true"
            :clearable="true"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
    </vab-query-form>
    <vab-table
      ref="ref106386"
      :nav-buttons="navButtons1"
      :border="true"
      :show-table-header="true"
      :has-pager="true"
      :max-height="600"
      :clearable="true"
      label="table"
      :columns="columns1"
      :api-url="'/page/MservicechargePage/mservicechargePageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'MservicechargePage',
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
                    route: 'MservicechargeCreate',
                  },
                ],
              },
            ],
          },
        ],
        columns1: [
          {
            prop: 'name',
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
            prop: 'charge',
            javaData: {},
            label: '料金',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            formatter: (row, column, cellValue) =>
              this.formatTableCell(row, column, cellValue)('INTEGER'),
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
                            route: 'MservicechargeUpdate',
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
                            apiUrl: '/MServiceCharge/',
                            apiMethod: 'DELETE',
                            primarykey: 'id',
                            apiActionType: 'selectApi',
                          },
                          {
                            actionCode: 'page_reload',
                            vmKey: 106386,
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
        this.$refs['ref106386'].fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
