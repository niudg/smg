import { resolve } from 'path'
import { hasPermission } from '@/utils/permission'
import { isExternal } from '@/utils/validate'
import { recordRoute } from '@/config'
import { nodeEnv } from '@/config'
import qs from 'qs'
import i18n from '@/i18n/index'
import _ from 'lodash'
//import store from '@/store'

/**
 * @description すべてのモードはバックエンドのリターン ルートをレンダリングし、ビュー パスを含むすべてのページをサポートします
 * @param asyncRoutes
 * @returns {*}
 */
export function convertRouter(asyncRoutes) {
  return asyncRoutes.map((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = (resolve) => require(['@/vab/layouts'], resolve)
      } else {
        const index = route.component.indexOf('views')
        const path =
          index > 0 ? route.component.slice(index) : `views/${route.component}`
        route.component = (resolve) => require([`@/${path}`], resolve)
      }
    }
    if (route.children && route.children.length)
      route.children = convertRouter(route.children)
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
}

/**
 * @description ロール配列に基づいてルートをインターセプトする
 * @param routes ルーティング
 * @param rolesControl 権限制御を行う
 * @param baseUrl 基本ルーティング
 * @returns {[]}
 */
export function filterRoutes(routes, rolesControl, baseUrl = '/') {
  return routes
    .filter((route) => {
      if (nodeEnv == 'mock' || nodeEnv == 'development') return true
      if (rolesControl && route.meta && route.meta.guard) {
        return hasPermission(route.meta.guard)
      } else {
        if (route?.constant) {
          return true
        }
        return true
      }
    })
    .map((route) => {
      route = { ...route }
      // title
      if (route.meta) {
        route.meta.title = i18n.t(route.meta.title)
      }
      // path
      route.path =
        route.path !== '*' && !isExternal(route.path)
          ? resolve(baseUrl, route.path)
          : route.path
      // children
      if (route.children && route.children.length > 0) {
        route.children = filterRoutes(route.children, rolesControl, route.path)
        // childrenNameList
        if (route.children.length > 0) {
          route.childrenNameList = route.children.flatMap(
            (_) => _.childrenNameList
          )
          if (!route.redirect) {
            route.redirect = route.children[0].redirect
              ? route.children[0].redirect
              : route.children[0].path
          }
        }
      } else {
        route.childrenNameList = [route.name]
      }
      return route
    })
}

/**
 * pathに従ってmatchedを取得する
 * @param routes メニュールート
 * @param name ルート名
 * @returns {*} matched
 */
export function handleMatched(routes, name) {
  return routes
    .filter((route) => route.childrenNameList.indexOf(name) + 1)
    .flatMap((route) =>
      route.children ? [route, ...handleMatched(route.children, name)] : [route]
    )
}

/**
 * 複数のラベルを同期/非同期で追加するために使用できる単一のマルチラベル要素を生成します
 * @param tag route
 */
export function handleTabs(tag) {
  let parentIcon = null
  if (tag.matched)
    for (let i = tag.matched.length - 2; i >= 0; i--)
      if (!parentIcon && tag.matched[i].meta.icon)
        parentIcon = tag.matched[i].meta.icon
  if (!parentIcon) parentIcon = 'menu-line'
  const path = handleActivePath(tag, true)
  if (tag.name && tag.meta && tag.meta.tabHidden !== true) {
    return {
      path: path,
      query: tag.query,
      params: tag.params,
      name: tag.name,
      parentIcon,
      meta: { ...tag.meta },
    }
  }
}

/**
 * 現在のルートに従ってアクティブなメニューを取得します
 * @param route 現在のルート
 * @param isTab ラベル
 * @returns {string|*}
 */
export function handleActivePath(route, isTab = false) {
  const { meta, path } = route
  const rawPath = route.matched
    ? route.matched[route.matched.length - 1].path
    : path
  const fullPath =
    route.query && Object.keys(route.query).length
      ? `${route.path}?${qs.stringify(route.query)}`
      : route.path
  if (isTab) return meta.dynamicNewTab ? fullPath : rawPath
  if (meta.activeMenu) return meta.activeMenu
  return fullPath
}

/**
 * 現在のジャンプログインページのルートを取得する
 * @param currentPath 現在のページアドレス
 */
export function toLoginRoute(currentPath) {
  if (recordRoute && currentPath !== '/')
    return {
      path: '/login',
      query: { redirect: currentPath },
      replace: true,
    }
  else return { path: '/login', replace: true }
}

/**
 * @description FM隠しルーティング
 * @param asyncRoutes
 * @param nameList
 * @returns {*}
 */
export function hiddenRoute(asyncRoutes, nameList = []) {
  let routeList = _.cloneDeep(asyncRoutes)
  routeList.forEach((route) => {
    findAndAddProperty(route, nameList)
  })
  return routeList
}
export function findAndAddProperty(obj, nameList) {
  if (nameList.includes(obj.name)) {
    obj.meta.hidden = true
  } else if (obj?.children) {
    obj.children.forEach((child) => findAndAddProperty(child, nameList))
  }
}
