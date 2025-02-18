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
              vmKey: 63483,
              vmName: 'データテーブル',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
      @search="handleSearch"
      @clear="handleClear"
    >
      <vab-row ref="ref74934" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref66154"
            label="ユーザーコード"
            prop="userCode"
            maxlength="20"
          ></vab-input>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-input
            ref="ref55718"
            label="ユーザー名"
            prop="userName"
            maxlength="100"
          ></vab-input>
        </vab-col>
      </vab-row>
      <vab-row ref="ref23549" :gutter="20">
        <vab-col :span="12" :md="12" :sm="12" :xs="12">
          <vab-select
            ref="ref45154"
            label="ステータス"
            prop="validStatus"
            maxlength="1"
            :show-table-header="true"
            :max-height="500"
            :border="true"
            :clearable="true"
            filter="ValidStatus"
            data-type="local"
            api-method="post"
          ></vab-select>
        </vab-col>
        <vab-col :span="12" :md="12" :sm="12" :xs="12"></vab-col>
      </vab-row>
    </vab-query-form>
    <vab-table
      ref="ref63483"
      :show-table-header="true"
      :has-pager="true"
      :max-height="500"
      :border="true"
      label="一览"
      :nav-buttons="navButtons1"
      :columns="columns1"
      :api-url="'/page/AppUser/appUserPageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'AppUser',
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
            primarykey: 'userId',
            btnChangeType: 'btn',
            permissions: {},
            eventList: [
              {
                eventCode: 'click',
                actionList: [
                  {
                    actionCode: 'page_link',
                    btnView: 'page',
                    route: 'AppUserCreate',
                  },
                ],
              },
            ],
          },
        ],
        columns1: [
          {
            prop: 'userCode',
            javaData: {},
            label: 'ユーザーコード',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            format: null,
          },
          {
            prop: 'userName',
            javaData: {},
            label: 'ユーザー名',
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
                primarykey: 'userId',
                btnChangeType: 'btnGroup',
                buttonList: [
                  {
                    disabled: false,
                    type: 'primary',
                    name: ' 変更 ',
                    primarykey: 'userId',
                    btnChangeType: 'menu',
                    eventList: [
                      {
                        eventCode: 'click',
                        actionList: [
                          {
                            actionCode: 'page_link',
                            btnView: 'page',
                            route: 'AppUserUpdate',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    disabled: false,
                    type: 'primary',
                    name: ' 削除 ',
                    primarykey: 'userId',
                    btnChangeType: 'menu',
                    eventList: [
                      {
                        eventCode: 'click',
                        actionList: [
                          {
                            actionCode: 'page_api',
                            apiUrl: '/appUser/',
                            apiMethod: 'DELETE',
                            primarykey: 'userId',
                            apiActionType: 'selectApi',
                          },
                          {
                            actionCode: 'page_reload',
                            vmKey: 63483,
                            vmName: 'データテーブル',
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
        this.$refs['ref63483'].fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
