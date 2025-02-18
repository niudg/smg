<template>
  <div class="list">
    <vab-form label-width="140px" ref="form" :rules="rules" :model="form">
      <CardInfo1></CardInfo1>
      <vab-button
        ref="ref28399"
        label=" 変更 "
        primarykey="roleId"
        size="middle"
        primary-key="roleId"
        api-method="post"
        @click="handleClick"
        :event-list="[
          {
            eventCode: 'click',
            actionList: [
              {
                actionCode: 'page_api',
                apiUrl: '/page/RoleUpdate/roleUpdate',
                apiMethod: 'put',
                apiActionType: 'inputApi',
                primarykey: 'roleId',
              },
              { actionCode: 'page_link', btnView: 'page', route: 'RolePage' },
            ],
          },
        ]"
      >
        変更
      </vab-button>
    </vab-form>
  </div>
</template>

<script>
  import mixinPage from '@/utils/mixinPage'
  import base from './mixins/base'
  import CardInfo1 from './panels/CardInfo1'
  let mixList = [mixinPage, base]
  // 动态加载extend.js
  try {
    const context = require.context('./mixins', false, /extend.js$/)
    const keys = context.keys()
    if (keys.length > 0) {
      mixList.push(context(keys[0]).default || {})
    }
  } catch (error) {
    console.warn('扩展混入未找到或加载失败:', error)
  }
  export default {
    name: 'RoleUpdate',
    components: {
      CardInfo1,
    },
    mixins: mixList,
    provide() {
      return {
        page: this,
      }
    },
  }
</script>

<style lang="scss" scoped></style>
