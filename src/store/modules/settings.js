/**
 * @description すべてのグローバル構成の状態管理。必要でない場合は変更しないでください
 */
import {
  collapse as _collapse,
  background,
  columnStyle,
  fixedHeader,
  i18n,
  layout,
  logo,
  showFullScreen,
  showLanguage,
  showNotice,
  showProgressBar,
  showRefresh,
  showSearch,
  showTabs,
  showTabsIcon,
  showTheme,
  showThemeSetting,
  tabsBarStyle,
  themeName,
  title,
} from '@/config'
import { isJson } from '@/utils/validate'

const defaultTheme = {
  background,
  columnStyle,
  fixedHeader,
  layout,
  showProgressBar,
  showTabs,
  tabsBarStyle,
  showTabsIcon,
  showLanguage,
  showRefresh,
  showSearch,
  showTheme,
  showNotice,
  showFullScreen,
  showThemeSetting,
  themeName,
}
const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  if (isJson(value)) {
    return JSON.parse(value)
  } else {
    return false
  }
}
const { collapse } = getLocalStorage('collapse')
const { language } = getLocalStorage('language')
const state = () => ({
  logo,
  title,
  device: 'desktop',
  collapse: collapse || _collapse,
  language: language || i18n,
  theme: getLocalStorage('theme') || { ...defaultTheme },
  extra: { first: '' },
  scrollTop: localStorage.getItem('scrollTop') || 0,
  localTime: null,
  zIndex: 0,
})
const getters = {
  logo: (state) => state.logo,
  title: (state) => state.title,
  device: (state) => state.device,
  collapse: (state) => state.collapse,
  language: (state) => state.language,
  theme: (state) => state.theme,
  extra: (state) => state.extra,
  scrollTop: (state) => state.scrollTop,
  localTime: (state) => state.localTime,
  zIndex: (state) => state.zIndex,
}
const mutations = {
  openSideBar(state) {
    state.collapse = false
  },
  foldSideBar(state) {
    state.collapse = true
  },
  toggleDevice(state, device) {
    state.device = device
  },
  toggleCollapse(state) {
    state.collapse = !state.collapse
    localStorage.setItem('collapse', `{"collapse":${state.collapse}}`)
  },
  changeLanguage(state, language) {
    state.language = language
    localStorage.setItem('language', `{"language":"${language}"}`)
  },
  saveTheme(state) {
    localStorage.setItem('theme', JSON.stringify(state.theme))
  },
  resetTheme(state) {
    state.theme = { ...defaultTheme }
    localStorage.removeItem('theme')
  },
  updateTheme(state) {
    document.getElementsByTagName(
      'body'
    )[0].className = `vab-theme-${state.theme.themeName}`
    if (state.theme.background !== 'none') {
      document
        .getElementsByTagName('body')[0]
        .classList.add(state.theme.background)
    }
  },
  setScrollTop(state, scrollTop) {
    state.scrollTop = scrollTop
    localStorage.setItem('scrollTop', scrollTop)
  },
  setLocalTime(state, time) {
    state.localTime = time
  },
  setSearchIndex(state, zIndex) {
    state.zIndex = zIndex
  },
}
const actions = {
  openSideBar({ commit }) {
    commit('openSideBar')
  },
  foldSideBar({ commit }) {
    commit('foldSideBar')
  },
  toggleDevice({ commit }, device) {
    commit('toggleDevice', device)
  },
  toggleCollapse({ commit }) {
    commit('toggleCollapse')
  },
  changeLanguage: ({ commit }, language) => {
    commit('changeLanguage', language)
  },
  saveTheme({ commit }) {
    commit('saveTheme')
  },
  resetTheme({ commit }) {
    commit('resetTheme')
    commit('updateTheme')
  },
  updateTheme({ commit }) {
    commit('updateTheme')
  },
  setScrollTop({ commit }, top) {
    commit('setScrollTop', top)
  },
  setLocalTime({ commit }, time) {
    commit('setLocalTime', time)
  },
  setSearchIndex({ commit }, zIndex) {
    commit('setSearchIndex', zIndex)
  },
}
export default { state, getters, mutations, actions }
