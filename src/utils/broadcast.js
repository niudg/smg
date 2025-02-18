let targetList = ['VabInput', 'VabDatePicker']

//子コンポーネントを取得する
function getChildrenList(component) {
  if (component && component.$children && component.$children.length > 0) {
    return component.$children.flatMap((item) =>
      item.$children ? [item, ...getChildrenList(item)] : [item]
    )
  }
  return []
}

//ターゲットを通信する
function broadcast(eventName, params) {
  getChildrenList(this)
    .filter((item) => targetList.indexOf(item.$options.name) + 1)
    .forEach((item) => {
      item.$emit.apply(item, [eventName].concat(params))
    })
}

export default {
  methods: {
    broadcast(eventName, params) {
      broadcast.call(this, eventName, params)
    },
  },
}
