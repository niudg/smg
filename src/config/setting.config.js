/**
 * @description
 */
module.exports = {
  title: 'サービス管理',
  titleSeparator: ' - ',
  titleReverse: false,
  abbreviation: 'vab-admin-pro',
  copyright: '',
  keepAliveMaxNum: 100,
  routerMode: 'history',
  routesWhiteList: [
    '/login',
    '/register',
    '/registerSuccess',
    '/callback',
    '/404',
    '/403',
    '/logout',
  ],
  loadingText: 'ローディング...',
  tokenName: 'accessToken',
  tokenTableName: 'admin-pro-token',
  storage: 'localStorage',
  recordRoute: true,
  logo: 'vuejs-fill',
  i18n: 'ja',
  messageDuration: 6000,
  errorLog: 'development',
  loginInterception: true,
  authentication: 'intelligence',
  supportVisit: false,
  rolesControl: true,
  uniqueOpened: false,
  defaultOpeneds: [
    '/vab',
    '/vab/table',
    '/vab/icon',
    '/vab/form',
    '/vab/editor',
    '/vab/editor',
  ],
  ignoreUrl: ['/index'],
  debounce: ['doEdit'],
  openFirstMenu: true,
  footerCopyright: false,
  loadRoute: process.env.VUE_APP_LOAD_ROUTE,
  loadType: process.env.VUE_APP_LOAD_TYPE,
}
