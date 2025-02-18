/**
 * @description ルーティング インターセプト状態の管理。現在、2 つのモードがあります。すべてのモードとインテリジェンス モードです。partialRoutes はまだ使用されていないメニューです。
 */
import { rolesControl } from '@/config'
import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
import { filterRoutes } from '@/utils/routes'
const state = () => ({
  routes: [],
  activeName: '',
})
const getters = {
  routes: (state) => state.routes,
  activeName: (state) => state.activeName,
}
const mutations = {
  /**
   * @description マルチモード セットアップ ルーティング
   * @param {*} state
   * @param {*} routes
   */
  setRoutes(state, routes) {
    state.routes = routes
  },
  /**
   * @description メタの変更
   * @param {*} state
   * @param options
   */
  changeMenuMeta(state, options) {
    function handleRoutes(routes) {
      return routes.map((route) => {
        if (route.name === options.name) Object.assign(route.meta, options.meta)
        if (route.children && route.children.length)
          route.children = handleRoutes(route.children)
        return route
      })
    }
    state.routes = handleRoutes(state.routes)
  },
  /**
   * @description activeNameの修正
   * @param {*} state
   * @param activeName 現在アクティブなメニュー
   */
  changeActiveName(state, activeName) {
    state.activeName = activeName
  },
}
const actions = {
  /**
   * @description ルーティングの設置
   * @param {*} { commit }
   * @param mode
   * @returns
   */
  async setRoutes({ commit }, mode = 'none') {
    // デフォルトのフロントエンド ルーティング
    let routes = [...asyncRoutes]
    const control = mode === 'visit' ? false : rolesControl
    let accessRoutes = filterRoutes([...constantRoutes, ...routes], control)
    // メニューに必要なルーティングを設定する
    commit('setRoutes', JSON.parse(JSON.stringify(accessRoutes)))
    // アクセス可能なルートに基づいて Vue Router をリセットします
    await resetRouter(accessRoutes)
  },
  /**
   * @description 修改RoutMeta修正
   * @param {*} { commit }
   * @param options
   */
  changeMenuMeta({ commit }, options = {}) {
    commit('changeMenuMeta', options)
  },
  /**
   * @description activeNameの修正
   * @param {*} { commit }
   * @param activeName 現在アクティブなメニュー
   */
  changeActiveName({ commit }, activeName) {
    commit('changeActiveName', activeName)
  },
}
export default { state, getters, mutations, actions }
