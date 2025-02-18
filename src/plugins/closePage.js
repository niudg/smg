import Vue from 'vue'
export default function closePage(params) {
  Vue.prototype.$closePage(params.name)
}
