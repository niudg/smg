import _ from 'lodash'
import { isInteger } from '@/utils/validate'
const get = require('lodash/get')
const find = require('lodash/find')
const isEqualWith = require('lodash/isEqualWith')
const isEqual = require('lodash/isEqual')
const pick = require('lodash/pick')

export function compareArr({
  originArr,
  targetArr,
  identifyKey,
  keys = [],
  insideArrField,
  insideArrIdentifyKey,
  insideArrKeys = [],
  customizer = false,
}) {
  if (!identifyKey) {
    console.error('identifyKey is null')
    return
  }
  if (keys && !Array.isArray(keys)) {
    console.error('keys is not array')
    return
  }

  if (!originArr || (Array.isArray(originArr) && originArr.length === 0)) {
    targetArr.forEach((item) => {
      item.operationType = 'I'
    })
    return targetArr
  }

  if (!targetArr || (Array.isArray(targetArr) && targetArr.length === 0)) {
    originArr.forEach((item) => {
      item.operationType = 'D'
    })
    return originArr
  }

  if (!Array.isArray(originArr) || !Array.isArray(targetArr)) {
    console.error('originArr or targetArr is not array')
    return
  }

  const keysProvided = keys && keys.length > 0

  const resultArr = []

  function customizerFunction(objValue, othValue) {
    if (isGreeting(objValue) && isGreeting(othValue)) {
      return true
    }
  }
  function isGreeting(value) {
    return value == null || value === ''
  }

  function getObject(data, identifyKey) {
    var keys = identifyKey.split(',')
    //
    if (keys.length > 1) {
      var result = []
      keys.forEach((key) => {
        result.push(get(data, key))
      })
      return result.join(',')
    }
    return get(data, identifyKey)
  }

  targetArr.forEach((item) => {
    let originItem = null
    if (!getObject(item, identifyKey)) {
      //新規のフラグ
      item.operationType = 'I'
    } else {
      originItem = find(originArr, (origin) => {
        return getObject(origin, identifyKey) == getObject(item, identifyKey)
      })
      if (originItem) {
        let originItemData = keysProvided ? pick(originItem, keys) : originItem
        let targetItemData = keysProvided ? pick(item, keys) : item
        let equal = true
        if (customizer) {
          equal = isEqualWith(
            originItemData,
            targetItemData,
            customizerFunction
          )
        } else {
          equal = isEqual(originItemData, targetItemData)
        }

        if (!equal) {
          //更新のフラグ
          item.operationType = 'U'
        } else {
          item.operationType = null
        }
      } else {
        item.operationType = 'I'
      }
    }

    if (insideArrField && insideArrIdentifyKey) {
      const originInsideArr = get(originItem, insideArrField)
      const targetInsideArr = get(item, insideArrField)

      const insideArrResult = compareArr({
        originArr: originInsideArr,
        targetArr: targetInsideArr,
        identifyKey: insideArrIdentifyKey,
        keys: insideArrKeys,
      })

      // reset parent operationType
      for (const insideItem of insideArrResult) {
        if (insideItem.operationType !== null && item.operationType === null) {
          item.operationType = 'U'
          break
        }
      }

      item[insideArrField] = insideArrResult
    }
    resultArr.push(item)
  })

  originArr.forEach((item) => {
    const targetItem = find(targetArr, (target) => {
      return getObject(target, identifyKey) == getObject(item, identifyKey)
    })
    if (!targetItem) {
      //削除のフラグ
      item.operationType = 'D'

      if (insideArrField && insideArrIdentifyKey) {
        const originInsideArr = get(item, insideArrField) || []
        const insideArrResult = originInsideArr.map((origin) => {
          origin.operationType = 'D'
          return origin
        })
        item[insideArrField] = insideArrResult
      }
      resultArr.push(item)
    }
  })

  return resultArr
}

/**
 * 対象の比較
 * @param {*} data
 * @param {*} oldData
 * @returns
 */
export function compare(a, b) {
  var result = {
    different: [],
    missing_from_first: [],
    missing_from_second: [],
  }

  if (_.isArray(a) && a.some((item) => _.isObject(item))) {
    return result
  }

  _.reduce(
    a,
    (result, value, key) => {
      if (Object.prototype.hasOwnProperty.call(b, key)) {
        if (_.isEqual(value, b[key])) {
          return result
        } else {
          if (typeof a[key] != typeof {} || typeof b[key] != typeof {}) {
            result.different.push(key)
            return result
          } else {
            var deeper = compare(a[key], b[key])
            result.different = result.different.concat(
              _.map(deeper.different, (sub_path) => {
                return key + '.' + sub_path
              })
            )

            result.missing_from_second = result.missing_from_second.concat(
              _.map(deeper.missing_from_second, (sub_path) => {
                return key + '.' + sub_path
              })
            )

            result.missing_from_first = result.missing_from_first.concat(
              _.map(deeper.missing_from_first, (sub_path) => {
                return key + '.' + sub_path
              })
            )
            return result
          }
        }
      } else {
        result.missing_from_second.push(key)
        return result
      }
    },
    result
  )

  _.reduce(
    b,
    function (result, value, key) {
      if (Object.prototype.hasOwnProperty.call(a, key)) {
        return result
      } else {
        result.missing_from_first.push(key)
        return result
      }
    },
    result
  )

  return result
}

export function addOperationTypeForObj(target) {
  /**
   * 参照対象空きの場合
   */
  target.operationType = 'I'
  Object.keys(target).forEach((key) => {
    if (_.isPlainObject(target[key])) {
      addOperationTypeForObj(target[key])
    }
  })
}

export function compareObject(origin, target) {
  var result = compare(target, origin)
  result.different.forEach((item) => {
    let props = item.split('.')
    if (props.length == 1) {
      target.operationType = 'U'
    } else {
      //配列の場合
      if (isInteger(props[props.length - 1])) {
        props = props.slice(0, props.length - 1)
      }

      let path = props.slice(0, props.length - 1).join('.')
      _.set(_.get(target, path), 'operationType', 'U')
    }
  })

  return target
}

// //target
// let a1 = {
//   name: '124',
//   demandBaseIdDemandBaseModel: {
//     a: 4,
//     b: 5,
//     d: 8,
//     g: 7,
//     f: [1, 2, 2],
//     m: {
//       a: 5,
//     },
//   },
// }

// //initial
// let a2 = {
//   name: '123',
//   demandBaseIdDemandBaseModel: {
//     a: 4,
//     b: 5,
//     d: 8,
//     f: [1, 2, 2],
//     m: {
//       a: 4,
//     },
//   },
// }

// a1 = this.compareObj(a1, a2)
// console.info(a1)

// const arr1 = [
//   {id: 1, name: 'John', age: 20, hobbies: [{id: 1, A: 99, B: 88}]},
//   {id: 2, name: 'shou', age: 21, hobbies: [{id: 2, A: 33}]},
//   {id: 3, name: 'grace', age: 22, hobbies: [{id: 3, A: 44}, {id: 5, A: 55}]},
//   {id: 4, name: 'xxx', age: 22, hobbies: [{id: 4, A: 55}]},
//   {id: 6, name: 'yyy', age: 22, hobbies: null},
// ];

// const arr2 = [
//   {id: 1, name: 'John', age: 20, hobbies: [{id: 1, A: 99}]},
//   {id: 2, name: 'shou', age: 21, hobbies: [{id: 2, A: 33}, {A: 88}]},
//   {id: 3, name: 'grace', age: 32, hobbies: [{id: 3, A: 23}]},
//   {id: 4, name: 'xxx', age: 22, hobbies: null},
//   {id: 6, name: 'xxx', age: 22, hobbies: [{A: 98}]},
// ];

// const arr3 = [
//   { person: { id: 1, name: 'John', age: 20 }, hobbies: { id: 1, A: 99 } },
//   { person: { id: 2, name: 'Johnxxxx', age: 20 }, hobbies: { id: 1, A: 99 } },
//   { person: { id: 3, name: 'Johnbbbb', age: 20 }, hobbies: { id: 1, A: 99 } },
//   { person: { id: 4, name: 'Johncccc', age: 20 }, hobbies: { id: 1, A: 99 } },
//   { person: { id: 5, name: 'Johndddd', age: 20 }, hobbies: { id: 1, A: 99 } },
// ]

// const arr4 = [
//   { person: { id: 1, name: 'Johndddd', age: 20 }, hobbies: { id: 1, A: 99 } },
//   { person: { id: 2, name: 'Johnxxxx', age: 20 }, hobbies: { id: 1, A: 99 } },
//   { person: { id: 3, name: 'Johnbbbb', age: 20 }, hobbies: { id: 1, A: 99 } },
//   { person: { id: 4, name: 'Johncccc', age: 20 }, hobbies: { id: 1, A: 99 } },
//   { person: { id: 5, name: 'Johndddd', age: 20 }, hobbies: { id: 1, A: 99 } },
// ]

// function testCompareArr() {
//   const result = compareArr({
//     originArr: origin,
//     targetArr: target,
//     identifyKey: 'id',
//     keys: ['foo', 'bar'],
//     insideArrField: 'children',
//     insideArrIdentifyKey: 'id',
//     insideArrKeys: ['fooChildren', 'barChildren'],
//   })
//   console.info(result)
// }

// testCompareArr()
