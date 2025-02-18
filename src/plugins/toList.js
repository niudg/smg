import Vue from 'vue'
export default function toListPage(params) {
  Vue.prototype.$routerPushAndReload({
    name: params.name,
    refresh: params.refresh,
  })
}
