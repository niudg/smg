import Confirm from './index.vue'
import Vue from 'vue'
function create(Component, props) {
  const Comp = Vue.extend(Component)
  const com = new Comp({ propsData: props })
  com.$mount()
  document.body.appendChild(com.$el)
  com.remove = () => {
    document.body.removeChild(com.$el)
    com.$destroy()
  }
  let handleCancel = com.handleCancel
  com.handleCancel = () => {
    handleCancel()
    props && props.no && props.no()
  }
  com.handleConfirm = () => {
    handleCancel()
    props && props.yes && props.yes()
  }
  com.show = true
  return com
}

export default {
  install(Vue) {
    Vue.prototype.$confirm = function (options) {
      return create(Confirm, options)
    }
  },
}
