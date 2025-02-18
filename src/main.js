import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'
import '@/vab'
import * as plugins from '@/vab/plugins'
import * as filters from './vab/plugins/filters'
import VabLoadPage from '@/vab/components/VabLoadPage'

// filter
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// plugins
Object.keys(plugins).forEach((key) => {
  Vue.use(plugins[key])
})

// 创建全局抽屉实例
const page = new Vue({
  i18n,
  store,
  router,
  render: (h) => h(VabLoadPage),
}).$mount()

document.body.appendChild(page.$el)

Vue.prototype.$loadPage = page.$children[0]

let vue = new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: (h) => h(App),
})

export default vue
