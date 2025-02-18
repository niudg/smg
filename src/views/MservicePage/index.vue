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
              vmKey: 51760,
              vmName: 'データテーブル拡張',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
    >
      <vab-row ref="ref75820" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref23007"
            label="サ-ビスコード"
            prop="code"
            maxlength="20"
            :clearable="true"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref45815"
            label="サ-ビス名"
            prop="name"
            maxlength="100"
            :clearable="true"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref35988" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref90722"
            label="バージョン"
            prop="version"
            maxlength="20"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-input
            ref="ref92413"
            label="サ-ビスURL"
            prop="serviceUrl"
            maxlength="100"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref54340" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref94763"
            label="データソース"
            prop="datasourceId"
            maxlength="10"
            data-key="MDatasource"
            :filterable="true"
            value-id="id"
            :clearable="true"
            label-id="code"
            :show-table-header="true"
            :max-height="500"
            :border="true"
            type="number"
            api-method="post"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref21378"
            label="キャッシュ"
            prop="cacheId"
            maxlength="10"
            data-key="MCache"
            :filterable="true"
            value-id="id"
            :show-table-header="true"
            :max-height="500"
            :border="true"
            :clearable="true"
            label-id="code"
            type="number"
            api-method="post"
          ></vab-select>
        </vab-col>
      </vab-row>
      <vab-row ref="ref98332" :gutter="20">
        <vab-col :span="12">
          <vab-input
            ref="ref71599"
            label="トライアル期間（日）"
            prop="trialProid"
            maxlength="10"
            :clearable="true"
            type="number"
          ></vab-input>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref71944"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            :clearable="true"
            :filterable="true"
            filter="ValidStatus"
            data-type="local"
          ></vab-select>
        </vab-col>
      </vab-row>
    </vab-query-form>
    <vab-table
      ref="ref51760"
      :nav-buttons="navButtons1"
      :border="true"
      :show-table-header="true"
      :has-pager="true"
      :max-height="600"
      :clearable="true"
      label="table"
      :columns="columns1"
      :api-url="'/page/MservicePage/mservicePageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'MservicePage',
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
                    route: 'MserviceCreate',
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
            label: 'サ-ビスコード',
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
            label: 'サ-ビス名',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'version',
            javaData: {},
            label: 'バージョン',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'serviceUrl',
            javaData: {},
            label: 'サ-ビスURL',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'trialProid',
            javaData: {},
            label: 'トライアル期間（日）',
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
            prop: 'datasourceIdMDatasourceModel.code',
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
            prop: 'cacheIdMCacheModel.code',
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
                            route: 'MserviceUpdate',
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
                            apiUrl: '/MService/',
                            apiMethod: 'DELETE',
                            primarykey: 'id',
                            apiActionType: 'selectApi',
                          },
                          {
                            actionCode: 'page_reload',
                            vmKey: 51760,
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
        this.$refs['ref51760'].fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
