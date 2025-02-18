<template>
  <div v-if="errorLogs.length > 0">
    <el-badge
      :value="errorLogs.length"
      @click.native="dialogTableVisible = true"
    >
      <vab-icon icon="bug-line" />
    </el-badge>

    <el-dialog
      append-to-body
      title="admin-pro例外キャッチ"
      :visible.sync="dialogTableVisible"
      width="70%"
    >
      <el-table border :data="errorLogs">
        <el-table-column label="エラールーティング">
          <template #default="{ row }">
            <a :href="row.url" target="_blank">
              <el-tag type="success">{{ row.url }}</el-tag>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="エラーメッセージ">
          <template #default="{ row }">
            <el-tag type="danger">{{ row.err.message }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="エラーの詳細" width="120">
          <template #default="{ row }">
            <el-popover placement="top-start" trigger="hover">
              {{ row.err.stack }}
              <template #reference>
                <el-button>查看</el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="380">
          <template #default="{ row }">
            <a
              v-for="(item, index) in searchList"
              :key="index"
              :href="item.url + row.err.message"
              target="_blank"
            >
              <el-button type="primary">
                {{ item.title }}
              </el-button>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="dialogTableVisible = false">取り消す</el-button>
        <el-button type="danger" @click="clearAll">表示されない</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { abbreviation, title } from '@/config'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'VabErrorLog',
    data() {
      return {
        dialogTableVisible: false,
        title,
        abbreviation,
        searchList: [
          {
            title: 'Googleで検索',
            url: 'https://www.google.com/search?q=',
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        errorLogs: 'errorLog/errorLogs',
      }),
    },
    methods: {
      ...mapActions({
        clearErrorLog: 'errorLog/clearErrorLog',
      }),
      clearAll() {
        this.dialogTableVisible = false
        this.clearErrorLog()
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-badge {
      .el-button {
        display: flex;
        align-items: center;
        justify-items: center;
        height: 28px;
      }
    }
  }
</style>
