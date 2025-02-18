<template>
  <div class="list">
    <vab-query-form
      ref="queryForm"
      label-width="140px"
      :rules="rules"
      :model="queryForm"
      :event-list="[
        {
          eventCode: 'search',
          actionList: [
            {
              actionCode: 'page_reload',
              vmKey: 11813,
              vmName: 'データテーブル',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
      @search="handleSearch"
      @clear="handleClear"
    >
      <vab-row ref="ref25660" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref102897"
            label="データソースコード"
            prop="code"
            maxlength="20"
          ></vab-input>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-select
            ref="ref82277"
            label="ドライバー"
            prop="driverClassName"
            maxlength="100"
            filter="DriverClassName"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref44483" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref117093"
            label="識別子"
            prop="dbIdentifier"
            maxlength="100"
          ></vab-input>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref77495"
            label="ユーザー"
            prop="dbUser"
            maxlength="14"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref105952" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-select
            ref="ref32609"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12"></vab-col>
      </vab-row>
    </vab-query-form>
    <vab-table
      ref="ref11813"
      :show-table-header="true"
      :has-pager="true"
      :max-height="500"
      :border="true"
      label="テーブル"
      :nav-buttons="navButtons1"
      :columns="columns1"
      :api-url="'/page/Mdatasource/mdatasourcePageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'Mdatasource',
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
            name: ' 新規 ',
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
                    route: 'MdatasourceCreate',
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
            label: 'データソースコード',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'driverClassName',
            javaData: {},
            label: 'ドライバー',
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
              )('ENUM', this.$divisions.DriverClassNameEnum),
          },
          {
            prop: 'dbIdentifier',
            javaData: {},
            label: '識別子',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'dbUser',
            javaData: {},
            label: 'ユーザー',
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
                name: '操作',
                primarykey: 'id',
                btnChangeType: 'btnGroup',
                buttonList: [
                  {
                    disabled: false,
                    type: 'primary',
                    name: ' 変更 ',
                    btnChangeType: 'menu',
                  },
                  {
                    disabled: false,
                    type: 'primary',
                    name: ' 削除 ',
                    primarykey: 'userId',
                    btnChangeType: 'menu',
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
        this.$refs['ref11813'].fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
