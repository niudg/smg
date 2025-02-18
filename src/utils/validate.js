import i18n from '@/i18n/index'
import validators from '@/rules/index'
import { saveAs } from 'file-saver'
import _ from 'lodash'
import format from 'string-format'
/**
 * @description 外部リンクかどうかの判断
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:|\/\/)/.test(path)
}

/**
 * @description パスワードが6文字未満かどうかを確認する
 * @param value
 * @returns {boolean}
 */
export function isPassword(value) {
  return value.length >= 6
}

/**
 * @description 数字かどうかの判定
 * @param value
 * @returns {boolean}
 */
export function isInteger(value) {
  const reg = /^[0-9]*$/
  return reg.test(value)
}

/**
 * @description 名前かどうかを判断する
 * @param value
 * @returns {boolean}
 */
export function isName(value) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
  return reg.test(value)
}

/**
 * @description IPかどうかを判断する
 * @param ip
 * @returns {boolean}
 */
export function isIP(ip) {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

/**
 * @description 従来のWebサイトかどうかを判断する
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @description 小文字かどうかを判断する
 * @param value
 * @returns {boolean}
 */
export function isLowerCase(value) {
  const reg = /^[a-z]+$/
  return reg.test(value)
}

/**
 * @description 大文字かどうかを判別する
 * @param value
 * @returns {boolean}
 */
export function isUpperCase(value) {
  const reg = /^[A-Z]+$/
  return reg.test(value)
}

/**
 * @description 大文字で始まるかどうかを判別する
 * @param value
 * @returns {boolean}
 */
export function isAlphabets(value) {
  const reg = /^[A-Za-z]+$/
  return reg.test(value)
}

/**
 * @description 文字列かどうかを判別する
 * @param value
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

/**
 * @description 配列かどうかを判別する
 * @param arg
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @description 判断是否是端口号
 * @param value
 * @returns {boolean}
 */
export function isPort(value) {
  const reg =
    /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return reg.test(value)
}

/**
 * @description 携帯電話番号
 * @param value
 * @returns {boolean}
 */
export function isPhone(value) {
  const reg = /^1\d{10}$/
  return reg.test(value)
}

/**
 * @description Email
 * @param value
 * @returns {boolean}
 */
export function isEmail(value) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(value)
}

/**
 * @description 中文
 * @param value
 * @returns {boolean}
 */
export function isChina(value) {
  const reg = /^[\u4E00-\u9FA5]{2,4}$/
  return reg.test(value)
}

/**
 * @description 空かどうかを判断する
 * @param value
 * @returns {boolean}
 */
export function isBlank(value) {
  return (
    value === null ||
    false ||
    value === '' ||
    value.trim() === '' ||
    value.toLocaleLowerCase().trim() === 'null'
  )
}
/**
 * @description 空かどうかを判断する
 * @param value
 * @returns {boolean}
 */
export function isBlankEmpty(value) {
  return value === null || value === '' || value === ' '
}

/**
 * @description 小数点以下2桁までの数値かどうかを判別する
 * @param value
 * @returns {boolean}
 */
export function isNum(value) {
  const reg = /^\d+(\.\d{1,2})?$/
  return reg.test(value)
}

/**
 * @description jsonかどうかを判断する
 * @param value
 * @returns {boolean}
 */
export function isJson(value) {
  if (typeof value === 'string') {
    const obj = JSON.parse(value)
    return !!(typeof obj === 'object' && obj)
  }
  return false
}

export const isObject = (obj) =>
  obj !== null && obj && typeof obj === 'object' && !Array.isArray(obj)

export const includes = (collection, item) => {
  return collection.indexOf(item) !== -1
}

export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0
}

//区分Flagをチェックする
export const checkEnumFlag = (codeEnum) => {
  if (_.isEmpty(codeEnum)) {
    return false
  }

  if (codeEnum == '1') {
    return true
  }

  return false
}

//区別の比較
export const isEqualCodeEnum = (value, other) => {
  if (_.isEmpty(value)) {
    return false
  }
  return value == _.get(other, 'value')
}

export const warn = (message) => {
  console.warn(`[validate] ${message}`) // eslint-disable-line
}

/**
 * Parses a rule string expression.
 */
export const parseRule = (rule) => {
  let params = []
  const name = rule.split(':')[0]

  if (includes(rule, ':')) {
    params = rule.split(':').slice(1).join(':').split('|')
  }

  return { name, params }
}

/**
 * Normalizes the given rules expression.
 */
export const normalizeRules = (rules) => {
  // if falsy value return an empty object.
  if (!rules) {
    return {}
  }

  if (isObject(rules)) {
    // $FlowFixMe
    return Object.keys(rules).reduce((prev, curr) => {
      let params = []
      // $FlowFixMe
      if (rules[curr] === true) {
        params = []
      } else if (Array.isArray(rules[curr])) {
        params = rules[curr]
      } else if (isObject(rules[curr])) {
        params = rules[curr]
      } else {
        params = [rules[curr]]
      }

      // $FlowFixMe
      if (rules[curr] !== false) {
        prev[curr] = params
      }

      return prev
    }, {})
  }

  if (typeof rules !== 'string') {
    warn('rules must be either a string or an object.')
    return {}
  }

  return rules.split(',').reduce((prev, rule) => {
    const parsedRule = parseRule(rule)
    if (!parsedRule.name) {
      return prev
    }

    prev[parsedRule.name] = parsedRule.params
    return prev
  }, {})
}

/**
 * 検証ルール文字列をルールオブジェクトに変換します
 * @param {} valiate
 */
export function convertToRules(validate, label, type, trigger) {
  let rules = []
  let validateArrays = normalizeRules(validate)
  let keys = []
  _.forOwn(validateArrays, function (value, key) {
    keys.push(key)
    let dataType = type
    if (key == 'number') {
      dataType = 'number'
    }

    if (key == 'email') {
      dataType = 'email'
    }

    let rule = {
      [`${key}`]:
        value.length == 0
          ? true
          : isNum(value[0])
          ? Number(value[0])
          : value[0],
      trigger: trigger,
    }

    if (dataType) {
      rule.type = dataType
    }

    if (validators[key]) {
      rule.validator = validators[key](value)
    } else {
      let message = null
      if (key == 'required') {
        key = 'E00000001'
        message = format(
          i18n.t(`validateMessage.${key}`),
          label ? label : 'この項目'
        )
      }

      if (key == 'number') {
        key = 'E00000014'
        message = format(i18n.t(`validateMessage.${key}`))
      }

      if (key == 'min') {
        key = 'E00000025'
        message = format(i18n.t(`validateMessage.${key}`), value)
      }

      if (key == 'max') {
        key = 'E00000024'
        message = format(i18n.t(`validateMessage.${key}`), value)
      }

      if (key == 'email') {
        key = 'E00000011'
        message = format(i18n.t(`validateMessage.${key}`))
      }
      rule.message = message
    }
    rules.push(rule)
  })
  return { rules, keys }
}

export const getFieldValue = (field, source) => {
  if (_.isEmpty(field)) {
    return null
  }
  return _.get(source, field)
}

export const downloadBlob = (res, filename) => {
  const blob = new Blob([res])
  saveAs(blob, decodeURI(filename).replace(RegExp('%23', 'g'), '#'))
}
export const isZero = (val) => {
  if (val === 0) {
    return ''
  }
  return val
}
