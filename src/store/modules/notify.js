import _ from 'lodash'
const state = () => ({
  startPosterStatus: null,
  refreshPageList: [],
  reloadPage: {},
  checkFlg: true,
  page: null,
  searchData: localStorage.getItem('searchData') || '{}',
  autoReload: {},
})
const getters = {
  startPosterStatus: (state) => state.startPosterStatus,
  refreshPageList: (state) => state.refreshPageList,
  reloadPage: (state) => state.reloadPage,
  checkFlg: (state) => state.checkFlg,
  page: (state) => state.page,
  searchData: (state) => state.searchData,
  autoReload: (state) => state.autoReload,
}
const mutations = {
  setReloadPage(state, reloadPage) {
    state.reloadPage[reloadPage.name] = reloadPage.value
  },
  setAutoReload(state, reloadPage) {
    state.autoReload[reloadPage.name] = reloadPage.value
  },
  delAutoReload(state, name) {
    delete state.autoReload[name]
  },

  setStartPosterStatus(state, startPosterStatus) {
    state.startPosterStatus = startPosterStatus
  },
  setRefresh(state, routeName) {
    if (_.isArray(routeName)) {
      routeName.forEach((item) => {
        item = _.toUpper(item)
        if (!_.includes(state.refreshPageList, item)) {
          state.refreshPageList.push(item)
        }
      })
    } else {
      routeName = _.toUpper(routeName)
      if (!_.includes(state.refreshPageList, routeName)) {
        state.refreshPageList.push(routeName)
      }
    }
  },
  delRefresh(state, routeName) {
    routeName = _.toUpper(routeName)
    if (_.includes(state.refreshPageList, routeName)) {
      let index = state.refreshPageList.indexOf(routeName)
      if (index > -1) {
        state.refreshPageList.splice(index, 1)
      }
    }
  },
  setCheckFlag(state, checkFlg) {
    state.checkFlg = checkFlg
  },
  setPage(state, page) {
    state.page = page
  },
  setPageSearchData(state, data) {
    state.searchData = data
    localStorage.setItem('searchData', data)
  },
}
const actions = {
  setStartPosterStatus({ commit }, startPosterStatus) {
    commit('setStartPosterStatus', startPosterStatus)
  },
  setRefresh({ commit }, routeName) {
    commit('setRefresh', routeName)
  },
  delRefresh({ commit }, routeName) {
    commit('delRefresh', routeName)
  },
  setReloadPage({ commit }, reloadPage) {
    commit('setReloadPage', reloadPage)
  },
  setAutoReload({ commit }, reloadPage) {
    commit('setAutoReload', reloadPage)
  },
  delAutoReload({ commit }, name) {
    commit('delAutoReload', name)
  },
  setCheckFlag({ commit }, checkFlg) {
    commit('setCheckFlag', checkFlg)
  },
  setPage({ commit }, page) {
    commit('setPage', page)
  },
  setPageSearchData({ commit }, data) {
    commit('setPageSearchData', data)
  },
}
export default { state, getters, mutations, actions }
