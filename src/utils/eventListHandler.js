import store from '@/store'
import request from '@/utils/request'
import { BEHAVIOR_TYPE, ApiAction_TYPE } from '@/constants/actionEnum'
// 事件处理器映射
const actionHandlers = {
  // 页面重新加载
  [BEHAVIOR_TYPE.pageLoad]: ({ action, vData, eventCode }) => {
    const { page, vm } = vData
    if (action.vmKey) {
      // 通过vmKey找到对应组件并刷新
      const component = page.$refs[`ref${action.vmKey}`]
      if (component) {
        component.queryParams = vm.model
        component.fetchData()
      }
    }
    vm.$emit(eventCode, vData)
  },

  // 清除页面
  [BEHAVIOR_TYPE.pageClear]: ({ vData, eventCode }) => {
    const { vm } = vData
    // 重置表单
    if (vm.$refs.queryForm) {
      vm.$refs.queryForm.resetFields()
    }
    // 重置页码
    store.dispatch('notify/setPage', 1)
    vm.$emit(eventCode, vData)
  },

  // 添加页面跳转处理器
  [BEHAVIOR_TYPE.pageLink]: ({ action, vData, eventCode }) => {
    const { route, otherData } = action
    const { vm } = vData
    let primarykey = otherData?.primarykey
    let row = otherData?.config?.row
    // 构建查询参数
    const query =
      row && primarykey
        ? primarykey.split(',').reduce((acc, key) => {
            acc[key.trim()] = row[key.trim()]
            return acc
          }, {})
        : {}
    vm.$routerPush({
      name: route,
      query,
    })
    vm.$emit(eventCode, vData)
  },
  // 添加弹窗处理器
  [BEHAVIOR_TYPE.pageMode]: ({ action, vData, eventCode }) => {
    const { route, otherData } = action
    const { vm } = vData
    let primarykey = otherData?.primarykey
    let row = otherData?.config?.row
    // 构建查询参数
    const query =
      row && primarykey
        ? primarykey.split(',').reduce((acc, key) => {
            acc[key.trim()] = row[key.trim()]
            return acc
          }, {})
        : {}
    // 加载页面
    vm.$loadPage.load({
      route: route,
      mode: BEHAVIOR_TYPE.pageMode,
      query,
    })
    vm.$emit(eventCode, vData)
  },

  // 添加 API 调用处理器
  [BEHAVIOR_TYPE.pageApi]: async ({ action, vData, eventCode }) => {
    const { vm, page } = vData
    const { apiUrl, apiMethod, otherData, primarykey, apiActionType } = action
    let row = otherData?.config?.row
    try {
      if (apiActionType === ApiAction_TYPE.SELECTAPI) {
        // 如果有行数据，获取主键值
        const paramsData = []
        if (row && primarykey) {
          const keys = primarykey.split(',')
          for (const key of keys) {
            const trimKey = key.trim()
            paramsData.push(row[trimKey])
          }
        }
        const paramsUrl = paramsData.join('/')
        // 发送 API 请求
        await request({
          url: paramsUrl ? apiUrl + paramsUrl : apiUrl,
          method: apiMethod,
        })
      } else if (apiActionType === ApiAction_TYPE.INPUTAPI) {
        // 调用 commonSubmit 并获取返回结果
        const result = await page
          .commonSubmit({
            'primary-key': primarykey,
            'api-url': apiUrl,
            'api-method': apiMethod,
            'action-name': vm.$attrs['label'],
          })
          .catch(() => {
            // 如果验证失败，抛出特殊的错误
            throw new Error('VALIDATION_FAILED')
          })
        // 如果 commonSubmit 返回 false，说明验证失败
        if (result === false) {
          throw new Error('VALIDATION_FAILED')
        }
      }
    } catch (error) {
      // 如果是验证失败，阻止事件继续传播
      if (error.message === 'VALIDATION_FAILED') {
        return false // 返回 false 表示需要中断后续 action 的执行
      }
    }
    vm.$emit(eventCode, vData)
    return true // 返回 true 表示可以继续执行后续 action
  },

  // 修改 JavaScript 代码执行处理器
  [BEHAVIOR_TYPE.pageJavascript]: ({ action, vData, eventCode }) => {
    const { vm, page } = vData
    const { jsCode } = action
    try {
      const context = {
        vm,
        page,
        store,
        window,
        document,
        console,
      }

      // 从jsCode中提取函数名
      const functionNameMatch = jsCode.match(/function\s+(\w+)\s*\(/)
      const functionName = functionNameMatch ? functionNameMatch[1] : null

      const functionBody = `
        with(context) {
          ${jsCode}
          // 如果找到了函数名，就执行它
          if (typeof ${functionName} === 'function') {
            return ${functionName}();
          }
          ${jsCode.includes('return') ? '' : 'return undefined;'}
        }
      `
      const result = new Function('context', functionBody)(context)
      alert('js 执行结果:' + result)
    } catch (error) {
      console.error('JavaScript 代码执行失败:', error)
    } finally {
      vm.$emit(eventCode, vData)
    }
  },

  // 添加表格行处理器
  [BEHAVIOR_TYPE.pageAddRow]: ({ vData, eventCode }) => {
    const { vm, page } = vData
    // 调用其添加行方法
    if (page.addTableItem) {
      page.addTableItem({
        tableData: vm.tableData,
        prop: vm.prop,
        columns: vm.columns,
        callback: () => {},
      })
    }
    vm.$emit(eventCode, vData)
  },
  // 添加表格行删除处理器
  [BEHAVIOR_TYPE.pageDeleteRow]: ({ action, vData, eventCode }) => {
    const { vm, page } = vData
    const { otherData } = action
    // 调用其删除行方法
    if (page.deleteTableItem) {
      page.deleteTableItem({
        prop: otherData?.config?.prop?.split('.'),
        $index: otherData?.config?.$index,
        callback: () => {},
      })
    }
    vm.$emit(eventCode, vData)
  },
  // 关闭弹窗处理器
  [BEHAVIOR_TYPE.pageClose]: ({ vData, eventCode }) => {
    const { vm } = vData
    vm?.close()
    vm.$emit(eventCode, vData)
  },
}

// 处理事件列表
export async function handleEventList(eventCode, vData, data) {
  const eventList = data?.eventList
  if (!eventList || !Array.isArray(eventList)) return

  // 查找匹配的事件
  const matchedEvent = eventList.find((event) => event.eventCode === eventCode)
  if (!matchedEvent) return

  // 串行执行所有 action
  for (const action of matchedEvent.actionList) {
    const handler = actionHandlers[action.actionCode]
    if (handler) {
      // 执行处理器并检查返回值
      const shouldContinue = await handler({
        action: { ...action, otherData: data },
        vData,
        eventCode,
      })

      // 如果处理器返回 false，中断后续 action 的执行
      if (shouldContinue === false) {
        break
      }
    }
  }
}
