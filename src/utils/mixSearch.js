export default {
  data() {
    return {}
  },
  methods: {
    getSearchJson(form) {
      if (!form) return
      let formJson = []
      let exclude = [
        'VabInput',
        'VabDatePicker',
        'VabSelect',
        'VabCheckboxGroup',
        'VabRadioGroup',
        'VabCheckbox',
      ]
      let props = Object.keys(form.model)
      let stack = [...form.$children]
      while (stack.length) {
        let item = stack.pop()
        let options = item?.$options
        let prop = item?.$attrs?.prop ?? options?.propsData?.prop
        let componentName = options?.componentName
        if (
          componentName &&
          componentName.indexOf('Vab') > -1 &&
          !exclude.includes(componentName)
        ) {
          if (prop && componentName != 'VabBuilding' && props.includes(prop)) {
            if (item.localInputVal || item.localInputName) {
              let data = {
                prop: prop,
                localInputName: item.localInputName,
                localInputVal: item.localInputVal,
              }
              if (item.multiSelect && item.list.length > 0) {
                let list = []
                item.list.filter((row) => {
                  let data = {}
                  data[item.codeField] = row[item.codeField]
                  data[item.nameField] = row[item.nameField]
                  if (row?.itmcd) {
                    data['itmcd'] = row?.itmcd
                  }
                  list.push(data)
                })
                data.list = list
              }
              formJson.push(data)
            }
          } else {
            if (componentName == 'VabBuilding' && item?.localBldgcd) {
              let data = {
                prop: prop,
                localInputName: item.localInputName,
                localInputVal: item.localInputVal,
              }
              if (
                item?.localBldgcd ||
                item?.localBlgscd ||
                item?.localBlgsnmkj
              ) {
                data.localBldgcd = item?.localBldgcd
                data.localBlgscd = item?.localBlgscd
                data.localBlgsnmkj = item?.localBlgsnmkj
              }
              formJson.push(data)
            }
          }
        } else {
          let propList = formJson.map((json) => json.prop)
          if (componentName == 'VabSelect') {
            if (prop && props.includes(prop) && item.innerValue) {
              let attr = item.$attrs
              let data = {
                prop: prop,
              }
              if (this.$baseLodash.isUndefined(attr.multiple)) {
                if (item.innerValue instanceof Array) {
                  if (item.innerValue.length > 0) {
                    data.value = item.innerValue[0]
                  }
                } else {
                  data.value = item.innerValue
                }
              } else {
                data.value = item.innerValue
              }
              formJson.push(data)
            }
          } else {
            if (
              prop &&
              !propList.includes(prop) &&
              (item.fieldValue || item.localInputVal) &&
              props.includes(prop)
            ) {
              formJson.push({
                prop: prop,
                value: item.fieldValue ?? item.localInputVal,
              })
            }
          }
        }
        stack = [...stack, ...item.$children]
      }

      return JSON.parse(JSON.stringify(formJson))
    },
    setFormDataList(list, form) {
      if (!form) return
      let props = Object.keys(form.model)
      props.filter((key) => {
        let keyItem = list.find((item) => item.prop == key)
        if (!this.$baseLodash.isUndefined(keyItem)) {
          form.model[key] = keyItem.value
        }
      })
      let stack = [...form.$children]
      while (stack.length) {
        let vm = stack.pop()
        let options = vm?.$options
        let prop = vm?.$attrs?.prop ?? options?.propsData?.prop
        let componentName = options?.componentName
        if (prop && componentName && props.includes(prop)) {
          let keyItem = list.find((item) => item.prop == prop)
          if (!this.$baseLodash.isUndefined(keyItem)) {
            if (componentName == 'VabBuilding') {
              if (vm.multiSelect) {
                if (keyItem?.list && keyItem?.list?.length > 1 && vm.setList) {
                  vm.setList(keyItem.list)
                }
              }
              vm.setValue &&
                vm.setValue(
                  keyItem.localBlgscd,
                  keyItem.localBldgcd,
                  keyItem.localBlgsnmkj
                )
            } else if (componentName == 'VabSelect') {
              if (keyItem?.value) {
                vm.setValue && vm.setValue(keyItem?.value)
              }
            } else {
              if (vm.multiSelect) {
                if (keyItem?.list && keyItem?.list?.length > 0 && vm.setList) {
                  vm.setList(keyItem.list)
                }
                vm.setValue &&
                  vm.setValue(keyItem.localInputVal, keyItem.localInputName)
                if (keyItem?.list && keyItem?.list?.length > 1) {
                  form.model[prop] = this.$baseLodash.map(
                    keyItem?.list,
                    vm.codeField
                  )
                }
              } else {
                if (vm.setValue) {
                  vm.setValue(keyItem.localInputVal, keyItem.localInputName)
                  if (keyItem?.value) {
                    vm.setValue(keyItem?.value)
                  }
                }
              }
            }
          }
          if (vm.clearValidate) {
            vm.closeValidate && vm.closeValidate()
          }
        }
        stack = [...stack, ...vm.$children]
      }
    },
  },
}
