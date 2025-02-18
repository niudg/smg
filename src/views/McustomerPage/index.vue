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
              vmKey: 96402,
              vmName: 'データテーブル拡張',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
    >
      <vab-row ref="ref45853" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref63323"
            label="取引コード"
            prop="code"
            maxlength="20"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref25402"
            label="取引名"
            prop="name"
            maxlength="100"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref82703" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref107818"
            label="代表者"
            prop="representative"
            maxlength="100"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref80612"
            label="郵便番号"
            prop="postCode"
            maxlength="10"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref26611" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref99302"
            label="住所"
            prop="address"
            maxlength="200"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref105001"
            label="電話番号"
            prop="telephone"
            maxlength="14"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref99633" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref73793"
            label="連絡窓口"
            prop="contactPerson"
            maxlength="100"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref107830"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref80349" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref13554"
            label="連絡窓口電話番"
            prop="contactPersonTelephone"
            maxlength="14"
          ></vab-input>
        </vab-col>
        <vab-col :span="12"></vab-col>
      </vab-row>
    </vab-query-form>
    <vab-table
      ref="ref96402"
      :nav-buttons="navButtons1"
      :border="true"
      :show-table-header="true"
      :has-pager="true"
      :max-height="600"
      :clearable="true"
      label="table"
      :columns="columns1"
      :api-url="'/page/McustomerPage/mcustomerPageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'McustomerPage',
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
                    btnView: 'page',
                    route: 'McustomerCreate',
                  },
                ],
              },
            ],
          },
        ],
        columns1: [
          {
            type: 'actions',
            fixed: 'right',
            label: '操作',
            headerAlign: 'center',
            minWidth: '118',
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
                            btnView: 'page',
                            route: 'McustomerUpdate',
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
                            apiUrl: '/MCustomer/',
                            apiMethod: 'DELETE',
                            primarykey: 'id',
                            apiActionType: 'selectApi',
                          },
                          {
                            actionCode: 'page_reload',
                            vmKey: 96402,
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
          {
            prop: 'code',
            javaData: {},
            label: '取引コード',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'name',
            javaData: {},
            label: '取引名',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'representative',
            javaData: {},
            label: '代表者',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'postCode',
            javaData: {},
            label: '郵便番号',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'address',
            javaData: {},
            label: '住所',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'telephone',
            javaData: {},
            label: '電話番号',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
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
            prop: 'contactPersonTelephone',
            javaData: {},
            label: '連絡窓口電話番',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
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
        this.$refs['ref96402'].fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
