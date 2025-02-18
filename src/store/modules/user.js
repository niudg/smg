/**
 * @description
 */
import { getUserInfo, login, logout } from '@/api/user'
import { title, tokenName, tokenTableName } from '@/config'
import { resetRouter } from '@/router'
import cache from '@/utils/cache'
import { isString } from '@/utils/validate'
import _ from 'lodash'
import Vue from 'vue'

const state = () => ({
  token: cache.local.getItem(tokenTableName),
  username: '',
  avatar: '',
  userId: '',
  userIdentity: '',
})
const getters = {
  token: (state) => state.token,
  username: (state) => state.username,
  userId: (state) => state.userId,
  userIdentity: (state) => state.userIdentity,
}
const mutations = {
  /**
   * @description 设置token
   * @param {*} state
   * @param {*} token
   */
  setToken(state, token) {
    state.token = token
    cache.local.setItem({ name: tokenTableName, value: token })
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  setUserIdentity(state, userIdentity) {
    state.userIdentity = userIdentity
  },
  setUserId(state, userId) {
    state.userId = userId
  },
}
const actions = {
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const data = await login(userInfo)
    let token = data[tokenName]
    if (token) {
      commit('setToken', token)
      const hour = new Date().getHours()
      const thisTime =
        hour < 10
          ? 'お早うございます'
          : hour <= 18
          ? 'こんにちは'
          : 'こんばんは'
      Vue.prototype.$baseNotify(`${title}`, `${thisTime}ようこそ！`)
    } else {
      const err = `登録例外は発生しました, 正しく戻ってこない${tokenName}...`
      Vue.prototype.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    }
  },
  /**
   * @description
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const { empnmkj, pstsctcd, authorities, empcd } = await getUserInfo()
    /**
     * username {String}
     * avatar {String}
     * roles {List}
     * ability {List}
     */
    if ((empnmkj && !isString(empnmkj)) || (pstsctcd && !isString(pstsctcd))) {
      const err =
        'getUserInfo コア インターフェイスが異常です。返された JSON 形式が正しいかどうかを確認してください'
      Vue.prototype.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    } else {
      if (empcd) commit('setUsername', empcd)
      if (empcd) commit('setUserId', empcd)

      if (authorities) {
        let authority = _.map(authorities, 'authority')
        let functions = _.reduce(
          _.map(authorities, 'functions'),
          function (pre, item) {
            return _.unionBy(pre, item, 'functionId')
          },
          []
        )
        commit('setUserIdentity', authority)
        if (authority == 'ROLE_admin') {
          dispatch('acl/setFull', true, { root: true })
        } else {
          dispatch('acl/setRole', authority, { root: true })
        }
        functions && dispatch('acl/setFunctionList', functions, { root: true })
      }
    }
  },
  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout()
    await dispatch('resetAll')
  },
  /**
   * @description 重置token、roles、permission、router、tabsBar等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ commit, dispatch }) {
    commit('setUsername', '')
    commit('routes/setRoutes', [], { root: true })
    commit('setBaseClassData', '')
    await dispatch('setToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setPermission', [], { root: true })
    await dispatch('acl/setFunctionList', [], { root: true })
    await dispatch('tabs/delAllVisitedRoutes', null, { root: true })
    await resetRouter()
    cache.local.remove(tokenName)
  },
  /**
   * @description 设置token
   * @param {*} { commit }
   * @param {*} token
   */
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  setFileName({ commit }, filename) {
    commit('setFileName', filename)
  },
}
export default { state, getters, mutations, actions }
