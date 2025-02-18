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
              vmKey: 100466,
              vmName: 'データテーブル拡張',
            },
          ],
        },
        { eventCode: 'clear', actionList: [{ actionCode: 'page_clear' }] },
      ]"
    >
      <vab-row ref="ref21725" :gutter="20">
        <vab-col :span="12">
          <vab-select
            ref="ref13262"
            label="ユーザー"
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
            v-permissions="['use']"
          ></vab-select>
        </vab-col>
        <vab-col :span="12">
          <vab-select
            ref="ref102982"
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
      :api-url="'/page/UserRolePage/userRolePageList'"
      api-method="post"
      @action-button-click="handleActionButtonClick"
      @toolbar-button-click="handleToolBarButtonClick"
    ></vab-table>
  </div>
</template>

<script>
  import mixins from '@/utils/mixinListPage'
  export default {
    name: 'UserRolePage',
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
                    route: 'UserRoleCreate',
                  },
                ],
              },
            ],
          },
        ],
        columns1: [
          {
            prop: 'userIdAppUserModel.userName',
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
            prop: 'roleIdRoleModel.roleName',
            javaData: {},
            label: 'ロール名',
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
