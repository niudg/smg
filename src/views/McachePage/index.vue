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
              vmKey: 66873,
              vmName: 'データテーブル拡張',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
    >
      <vab-row ref="ref23118" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref17303"
            label="キャッシュコード"
            prop="code"
            maxlength="20"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref87181"
            label="キャッシュタイプ"
            prop="type"
            maxlength="10"
            filter="CacheType"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref53955" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref62385"
            label="ホスト"
            prop="host"
            maxlength="100"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref52602"
            label="ポート"
            prop="port"
            maxlength="10"
            type="number"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref8330" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref87038"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
        <vab-col :span="12"></vab-col>
      </vab-row>
    </vab-query-form>
    <vab-table
      ref="ref66873"
      :nav-buttons="navButtons1"
      :border="true"
      :show-table-header="true"
      :has-pager="true"
      :max-height="600"
      :clearable="true"
      label="table"
      :columns="columns1"
      :api-url="'/page/McachePage/mcachePageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'McachePage',
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
                    route: 'McacheCreate',
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
                            btnView: 'page',
                            route: 'McacheUpdate',
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
                            apiUrl: '/MCache/',
                            apiMethod: 'DELETE',
                            primarykey: 'id',
                            apiActionType: 'selectApi',
                          },
                          {
                            actionCode: 'page_reload',
                            vmKey: 66873,
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
            label: 'キャッシュコード',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'type',
            javaData: {},
            label: 'キャッシュタイプ',
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
              )('ENUM', this.$divisions.CacheTypeEnum),
          },
          {
            prop: 'host',
            javaData: {},
            label: 'ホスト',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'port',
            javaData: {},
            label: 'ポート',
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
        this.$refs['ref66873'].fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
