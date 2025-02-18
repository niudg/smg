import { BEHAVIOR_TYPE, OPEN_TYPE } from '@/constants/actionEnum'

/**
 * 解析 actionRules 字符串为对象
 */
export function parseActionRules(rules) {
  if (!rules) return {}

  const ruleObj = {}
  const ruleArr = rules.split('&')

  ruleArr.forEach((rule) => {
    const [key, value] = rule.split('=')
    if (key && value) {
      ruleObj[key] = value
    }
  })

  return ruleObj
}

/**
 * 处理按钮点击事件
 */
export function handleActionClick(vm, row) {
  console.log('row', row)
  // 从 row 中获取 actionRules
  const actionRules = row.actionRules
  if (!actionRules) return

  // 解析规则
  const rules = parseActionRules(actionRules)

  // 获取规则参数
  const { modeBehaveType, modeOpenType, modeDirection, modeRoute, primarykey } =
    rules

  // 处理页面跳转
  if (modeBehaveType === BEHAVIOR_TYPE.PAGE_LINK) {
    // 构建查询参数
    const query = row ? { [primarykey]: row[primarykey] } : {}

    // 根据打开方式处理
    switch (modeOpenType) {
      case OPEN_TYPE.MODE:
        // 弹窗打开
        vm.$vabGlobalDialog.show({
          route: modeRoute,
          query,
        })
        break

      case OPEN_TYPE.PAGE:
        // 普通路由跳转
        vm.$routerPush({
          path: modeRoute,
          query,
        })
        break

      case OPEN_TYPE.DRAWER:
        // 使用抽屉打开
        vm.$vabGlobalDrawer.show({
          route: modeRoute,
          direction: modeDirection,
          query,
        })
        break
    }
  } else if (modeBehaveType === BEHAVIOR_TYPE.PAGE_CLICK) {
    // TODO: 处理点击事件
  }
}

export function handleEvent(config) {
  const { vm, column, eventList } = config
  console.info(vm)
  console.info(column)
  console.info(eventList)
}
