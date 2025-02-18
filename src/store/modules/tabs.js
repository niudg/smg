/**
 * @description tabsBar タブ ページのロジックです。必要でない場合は変更しないでください
 */
const state = () => ({
  visitedRoutes: [],
  closeRouteData: {},
})
const getters = {
  visitedRoutes: (state) => state.visitedRoutes,
  closeRouteData: (state) => state.closeRouteData,
}
const mutations = {
  /**
   * @description タブを追加
   * @param {*} state
   * @param {*} route
   * @returns
   */
  addVisitedRoute(state, route) {
    const target = state.visitedRoutes.find((item) => item.path === route.path)
    if (target && !route.meta.dynamicNewTab) Object.assign(target, route)
    else if (!target) state.visitedRoutes.push(Object.assign({}, route))

    //非常に特殊なケースに対処するため: noClosable が設定されていない場合、デフォルトでは現在のタブを閉じることができません
    if (!state.visitedRoutes.find((route) => route.meta.noClosable))
      state.visitedRoutes[0].meta.noClosable = true
  },
  /**
   * @description 現在のタブを削除
   * @param {*} state
   * @param {*} path
   * @returns
   */
  delVisitedRoute(state, path) {
    state.visitedRoutes.splice(
      state.visitedRoutes.findIndex(
        (route) => route.path === path || route.name === path
      ),
      1
    )
  },
  /**
   * @description 現在のタブを除くすべてのタブを削除する
   * @param {*} state
   * @param {*} path
   * @returns
   */
  delOthersVisitedRoutes(state, path) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (route) => route.meta.noClosable || route.path === path
    )
  },
  /**
   * @description 現在のタブの左側にあるすべてのタブを削除します
   * @param {*} state
   * @param {*} path
   * @returns
   */
  delLeftVisitedRoutes(state, path) {
    let found = false
    state.visitedRoutes = state.visitedRoutes.filter((route) => {
      if (route.path === path) found = true
      return route.meta.noClosable || found
    })
  },
  /**
   * @description 現在のタブの右側にあるすべてのタブを削除します
   * @param {*} state
   * @param {*} path
   * @returns
   */
  delRightVisitedRoutes(state, path) {
    let found = false
    state.visitedRoutes = state.visitedRoutes.filter((route) => {
      const close = found
      if (route.path === path) found = true
      return route.meta.noClosable || !close
    })
  },
  /**
   * @description すべてのタブを削除
   * @param {*} state
   * @returns
   */
  delAllVisitedRoutes(state) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (route) => route.meta.noClosable
    )
  },
  /**
   * @description metaの修正
   * @param {*} state
   * @param options
   */
  changeTabsMeta(state, options) {
    function handleVisitedRoutes(visitedRoutes) {
      return visitedRoutes.map((route) => {
        if (route.name === options.name || route.meta.title === options.title)
          Object.assign(route.meta, options.meta)
        if (route.children && route.children.length)
          route.children = handleVisitedRoutes(route.children)
        return route
      })
    }
    state.visitedRoutes = handleVisitedRoutes(state.visitedRoutes)
  },
  /**
   * @description 動的ルーティングストレージ
   * @param {*} state
   * @param options
   */
  pushRoute(state, options) {
    if (state.closeRouteData[options.name]) {
      state.closeRouteData[options.name] = [
        ...new Set([...state.closeRouteData[options.name], ...options.list]),
      ]
    } else {
      state.closeRouteData[options.name] = options.list
    }
  },
  /**
   * @description 動的ルーティング削除
   * @param {*} state
   * @param name
   */
  deleteRoute(state, name) {
    delete state.closeRouteData[name]
  },
}
const actions = {
  /**
   * @description タブを追加する
   * @param {*} { commit }
   * @param {*} route
   */
  addVisitedRoute({ commit }, route) {
    commit('addVisitedRoute', route)
  },
  /**
   * @description 現在のタブを削除する
   * @param {*} { commit }
   * @param {*} path
   */
  delVisitedRoute({ commit }, path) {
    commit('delVisitedRoute', path)
  },
  /**
   * @description 現在のタブを除くすべてのタブを削除する
   * @param {*} { commit }
   * @param {*} path
   */
  delOthersVisitedRoutes({ commit }, path) {
    commit('delOthersVisitedRoutes', path)
  },
  /**
   * @description 現在のタブの左側にあるすべてのタブを削除します
   * @param {*} { commit }
   * @param {*} path
   */
  delLeftVisitedRoutes({ commit }, path) {
    commit('delLeftVisitedRoutes', path)
  },
  /**
   * @description 現在のタブの右側にあるすべてのタブを削除します
   * @param {*} { commit }
   * @param {*} path
   */
  delRightVisitedRoutes({ commit }, path) {
    commit('delRightVisitedRoutes', path)
  },
  /**
   * @description 現在のタブの右側にあるすべてのタブを削除します
   * @param {*} { commit }
   */
  delAllVisitedRoutes({ commit }) {
    commit('delAllVisitedRoutes')
  },
  /**
   * @description Route Metaの修正
   * @param {*} { commit }
   * @param options
   */
  changeTabsMeta({ commit }, options = {}) {
    commit('changeTabsMeta', options)
  },
  pushRoute({ commit }, options = {}) {
    commit('pushRoute', options)
  },
  deleteRoute({ commit }, name) {
    commit('deleteRoute', name)
  },
}
export default { state, getters, mutations, actions }
