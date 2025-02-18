import dataGet from '@/utils/dataGet'

const state = () => ({
  list: [],
})
const getters = {
  list: (state) => state.list,
}
const mutations = {
  getData(state, value) {
    state.list = value
  },
}
const actions = {
  async getData({ commit }, model = {}) {
    let value = []
    let key = model.key
    let requestParam = model.requestParam
    let dataType = model.dataType

    if (model.enableCache && dataType != 'local') {
      value = JSON.parse(sessionStorage.getItem(key) || '[]')
    }
    if (value.length == 0) {
      const dg = new dataGet(key, dataType, requestParam)
      const list = await dg.getData()
      if (list) {
        value = list
        if (model.enableCache && dataType != 'local') {
          sessionStorage.setItem(key, JSON.stringify(value))
        }
      }
    }
    commit('getData', value)
  },
  updateData({ commit }, model = {}) {
    sessionStorage.removeItem(model.key)
    sessionStorage.setItem(model.key, JSON.stringify(model.value))
    commit('getData', model.value)
  },
}
export default { state, getters, mutations, actions }
