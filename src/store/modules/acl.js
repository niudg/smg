const state = () => ({
  admin: false,
  role: [],
  permission: [],
  functionList: [],
})
const getters = {
  admin: (state) => state.admin,
  role: (state) => state.role,
  permission: (state) => state.permission,
  functionList: (state) => state.functionList,
}
const mutations = {
  setFull(state, admin) {
    state.admin = admin
  },
  setRole(state, role) {
    state.role = role
  },
  setPermission(state, permission) {
    state.permission = permission
  },
  setFunctionList(state, functionList) {
    state.functionList = functionList
  },
}
const actions = {
  setFull({ commit }, admin) {
    commit('setFull', admin)
  },
  setRole({ commit }, role) {
    commit('setRole', role)
  },
  setPermission({ commit }, permission) {
    commit('setPermission', permission)
  },
  setFunctionList({ commit }, functionList) {
    commit('setFunctionList', functionList)
  },
}
export default { state, getters, mutations, actions }
