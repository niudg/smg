import store from '@/store'
import _ from 'lodash'
import { isArray } from '@/utils/validate'
import { nodeEnv } from '@/config'

export function hasOperationPermission(code, group) {
  if (nodeEnv == 'mock') return true
  const functionList = store.getters['acl/functionList']
  return functionList.some(
    (item) =>
      _.toUpper(item.funcCd) == _.toUpper(_.trim(code)) &&
      _.toUpper(item.funcGroupCd) == _.toUpper(_.trim(group))
  )
}

/**
 * 対象のパーミッション要素にアクセスできるか
 * @param target target(route|button) は許可が必要です
 * @returns {boolean} アクセス条件を満たしてください
 */
export function hasPermission(target) {
  if (nodeEnv == 'mock' || nodeEnv == 'development') return true
  if (store.getters['acl/admin']) return true
  if (isArray(target) && target.length > 0) {
    var roles = store.getters['acl/role']
    return can([...roles, ...store.getters['acl/permission']], {
      permission: target,
      mode: 'oneOf',
    })
  }

  const { role, permission, mode = 'oneOf' } = target
  return can([mode !== 'except'], {
    permission: [
      role ? can(store.getters['acl/role'], { permission: role, mode }) : false,
      permission
        ? can(store.getters['acl/permission'], { permission, mode })
        : false,
    ],
    mode,
  })
}

/**
 * 権限が満たされているかどうかを確認する
 * @param roleOrPermission 現在のユーザー権限
 * @param target target(route|button) は許可が必要です
 * @returns {boolean} アクセス条件を満たしてください
 */
function can(roleOrPermission, target) {
  let hasRole = false
  const { permission, mode } = target
  if (mode === 'allOf')
    hasRole = permission.every((item) => roleOrPermission.includes(item))
  if (mode === 'oneOf')
    hasRole = permission.some((item) => roleOrPermission.includes(item))
  if (mode === 'except')
    hasRole = !permission.every((item) => roleOrPermission.includes(item))
  return hasRole
}
