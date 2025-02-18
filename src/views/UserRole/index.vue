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
              vmKey: 100466,
              vmName: 'データテーブル拡張',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
      @search="handleSearch"
      @clear="handleClear"
    >
      <vab-row ref="ref21725" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref13262"
            label="ユーザーID"
            prop="userId"
            maxlength="10"
            data-key="appUser"
            :filterable="true"
            value-id="userId"
            :show-table-header="true"
            :max-height="500"
            :border="true"
            :clearable="true"
            label-id="userName"
            type="number"
            api-method="post"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref102982"
            label="ロールID"
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
    </vab-query-form>
    <vab-table
      ref="ref100466"
      :nav-buttons="navButtons1"
      :border="true"
      :show-table-header="true"
      :has-pager="true"
      :max-height="600"
      :clearable="true"
      label="table"
      :columns="columns1"
      :api-url="'/page/UserRole/userRolePageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'UserRole',
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
                    route: 'UserRoleCreate',
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
                            route: 'UserRoleUpdate',
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
                            apiUrl: '/userRole/',
                            apiMethod: 'DELETE',
                            primarykey: 'id',
                            apiActionType: 'selectApi',
                          },
                          {
                            actionCode: 'page_reload',
                            vmKey: 100466,
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
            prop: 'userId',
            javaData: {},
            label: 'ユーザーID',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            formatter: (row, column, cellValue) =>
              this.formatTableCell(row, column, cellValue)('INTEGER'),
          },
          {
            prop: 'roleId',
            javaData: {},
            label: 'ロールID',
            minWidth: '150',
            show: true,
            sortable: true,
            fixed: false,
            align: 'left',
            formatter: (row, column, cellValue) =>
              this.formatTableCell(row, column, cellValue)('INTEGER'),
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
        this.$refs['ref100466'].fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped></style>
