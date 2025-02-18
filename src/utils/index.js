import _ from 'lodash'
let numeral = require('numeral')
let dayjs = require('dayjs')

import { dateFormatMap } from '@/config/const.config'

/**
 * @description フォーマット時間
 * @param time
 * @param cFormat
 * @returns {string|null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

/**
 * @description フォーマット時間
 * @param time
 * @param option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function formatTimeDayLong(cell, formate, end = false) {
  if (!cell) {
    if (end) {
      return '23:59'
    } else {
      return '00:00'
    }
  }
  return dayjs(dayjs().format('YYYY/MM/DD') + cell).format(formate)
}

/**
 * @description URLリクエストパラメータをjson形式に変換する
 * @param url
 * @returns {{}|any}
 */
export function paramObj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }

  let val = decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ')
  return JSON.parse('{"' + val + '"}')
}

/**
 * @description 親子関係の配列をTree構造データに変換
 * @param data
 * @returns {*}
 */
export function translateDataToTree(data) {
  const parent = data.filter(
    (value) => value.parentId === 'undefined' || value.parentId === null
  )
  const children = data.filter(
    (value) => value.parentId !== 'undefined' && value.parentId !== null
  )
  const translator = (parent, children) => {
    parent.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.parentId === parent.id) {
          const temp = JSON.parse(JSON.stringify(children))
          temp.splice(index, 1)
          translator([current], temp)
          typeof parent.children !== 'undefined'
            ? parent.children.push(current)
            : (parent.children = [current])
        }
      })
    })
  }
  translator(parent, children)
  return parent
}

/**
 * @description Tree構造データを親子関係の配列に変換する
 * @param data
 * @returns {[]}
 */
export function translateTreeToData(data) {
  const result = []
  data.forEach((item) => {
    const loop = (data) => {
      result.push({
        id: data.id,
        name: data.name,
        parentId: data.parentId,
      })
      const child = data.children
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i])
        }
      }
    }
    loop(item)
  })
  return result
}

/**
 * @description 10ビットのタイムスタンプ変換
 * @param time
 * @returns {string}
 */
export function tenBitTimestamp(time) {
  const date = new Date(time * 1000)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '' + m : m
  let d = date.getDate()
  d = d < 10 ? '' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second //组合
}

/**
 * @description 13ビットのタイムスタンプ変換
 * @param time
 * @returns {string}
 */
export function thirteenBitTimestamp(time) {
  const date = new Date(time / 1)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '' + m : m
  let d = date.getDate()
  d = d < 10 ? '' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second //组合
}

/**
 * @description ランダムIDを取得
 * @param length
 * @returns {string}
 */
export function uuid(length = 32) {
  const num = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  let str = ''
  for (let i = 0; i < length; i++) {
    str += num.charAt(Math.floor(Math.random() * num.length))
  }
  return str
}

/**
 * @description mからnまでの乱数
 * @param m
 * @param n
 * @returns {number}
 */
export function random(m, n) {
  return Math.floor(Math.random() * (m - n) + n)
}

/**
 * 半角のチェク
 * @param {*} c
 * @returns
 */
export function isSingleByte(c) {
  return (
    (c >= 0x0 && c < 0x81) ||
    c === 0xf8f0 ||
    (c >= 0xff61 && c < 0xffa0) ||
    (c >= 0xf8f1 && c < 0xf8f4)
  )
}

/**
 * @description 文字列の格納長を取得します
 * @param {*} string
 */
export function getZFWlength(string) {
  var count = 0
  if (!string) {
    return count
  }
  for (var i = 0; i < string.length; i++) {
    //各文字列を判定し、Unicodeエンコーディングが0～127ならカウンター+1、それ以外なら+2
    var c = string.charCodeAt(i)
    if (isSingleByte(c)) {
      count += 1
    } else {
      count += 2
    }
  }
  return count
}

/**
 *サピエンスさんからの回答の通り、
桁数はSOSIを含めての桁数となります。
例(→←がSOSI)
①→あいうえお← (12桁となります)
②→あい←ABC→うえお← (17桁となります。)
 ※あいうえおは全角文字、ABCは半角文字
 ※全角文字の開始と終了箇所にはSOSIあります。
 */
export function calcSosi(string) {
  var count = 0
  if (!string) {
    return count
  }
  string = _.toString(string)
  //全角文字のマッチ
  var exp = /([^\x00-\xff|\uff61-\uff9f]+)/gi
  var matchers = string.match(exp)
  return matchers ? matchers.length * 2 : 0
}

/**
 * @description addEventListener
 * @type {function(...[*]=)}
 */
export const on = (function () {
  return function (element, event, handler, useCapture = false) {
    if (element && event && handler) {
      element.addEventListener(event, handler, useCapture)
    }
  }
})()

/**
 * @description removeEventListener
 * @type {function(...[*]=)}
 */
export const off = (function () {
  return function (element, event, handler, useCapture = false) {
    if (element && event) {
      element.removeEventListener(event, handler, useCapture)
    }
  }
})()

/**
 * @description 配列のシャッフル
 * @param array
 * @returns {*}
 */
export function shuffle(array) {
  let m = array.length,
    t,
    i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}
export function formatDate(cell, format = 'YYYY/MM/DD') {
  if (!cell) {
    return cell
  }
  format = format.replace('yyyy', 'YYYY').replace('dd', 'DD')
  return dayjs(cell).format(format)
}
export function formatDateTime(cell, format = 'YYYY/MM/DD HH:mm') {
  if (!cell) {
    return cell
  }
  format = format.replace('yyyy', 'YYYY').replace('dd', 'DD')
  return dayjs(cell).format(format)
}
export function formatTimeDefault(cell, formate, end = false) {
  if (!cell) {
    if (end) {
      return '23:59:59:000'
    } else {
      return '00:00:00:000'
    }
  }
  return dayjs(dayjs().format('YYYY/MM/DD') + cell).format(formate)
}

/**
 *文字列の切り出しを行う方法
 * @param {*} str
 * @param {*} length
 * @returns
 */
export function cutString(str, start, length) {
  if (_.isEmpty(str)) {
    return str
  }

  if (str.length < length) {
    return str
  }

  return str.substring(start, length)
}

/**
 *
 * @param {*} cell
 * @param {*} format  http://numeraljs.com
 * @returns
 */
export function formatNumber(cell, format = '0,0') {
  if (cell == null) {
    return cell
  }
  return numeral(cell).format(format)
}

//データをフォーマットします。小数部分は処理されず、整数部分は 1000 分の 1 でフォーマットされます。符号がある場合は、通常は予約されています。
export function formatCurrency(num) {
  if (num) {
    num = num.toString().replace(/\$|,/g, '')
    if ('' == num || isNaN(num)) {
      return null
    }
    var sign = num.indexOf('-') > 0 ? '-' : ''
    var cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : ''
    cents = cents.length > 1 ? cents : ''
    num = num.indexOf('.') > 0 ? num.substring(0, num.indexOf('.')) : num
    if ('' == cents) {
      if (num.length > 1 && '0' == num.substr(0, 1)) {
        return null
      }
    } else {
      if (num.length > 1 && '0' == num.substr(0, 1)) {
        return null
      }
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num =
        num.substring(0, num.length - (4 * i + 3)) +
        ',' +
        num.substring(num.length - (4 * i + 3))
    }
    return sign + num + cents
  }
}

export function formatEnum(cell, format) {
  console.info(format)
  return cell
}

export function formatCell(cell, type, format) {
  type = type?.toUpperCase()
  switch (type) {
    case 'LOCALDATE':
    case 'LOCALTIME':
    case 'LOCALDATETIME':
      return formatDate(cell, format || dateFormatMap[type])
    case 'INTEGER':
    case 'LONG':
    case 'SHORT':
      return formatNumber(cell, format)
    case 'DOUBLE':
    case 'FLOAT':
      return formatNumber(cell, format || '0,0.0')
    case 'ENUM':
      return getEnumText(cell, format)
    default:
      return cell ?? ''
  }
}

export function formatTableCell(row, column, cellValue) {
  return (type, format) => {
    return this.formatCell(cellValue, type, format)
  }
}

//テクストを取得する
export const getEnumText = (value, codeEnum) => {
  if (_.isEmpty(value)) {
    return ''
  }
  return _.get(_.find(codeEnum, { value: value }), 'text')
}

//テクストを取得する
export const getEnumTextChange = (value, codeEnum) => {
  if (_.isEmpty(value)) {
    return '-'
  }
  return _.get(_.find(codeEnum, { value: value }), 'text')
}

//テクストを取得する
export const getTextValue = (value) => {
  if (_.isEmpty(value) || _.isUndefined(value)) {
    return '-'
  }
  return value
}

//テクストを取得する
export const getEnumValue = (codeEnum) => {
  return _.get(codeEnum, 'value')
}

/**
 *オブジェクトから指定されたフィールドの値を取得します
 * @param {*} object オブジェクト
 * @param {*} prop パス
 * @param {*} deep 深さ
 * @param {*} field フィールド
 */
export function getTableCellVaue(object, prop, deep, field) {
  if (!object) {
    return null
  }
  let arrs = []
  if (_.isString(prop)) {
    arrs = prop.split('.')
  } else {
    arrs = prop
  }
  if (deep > arrs.length) {
    return null
  }
  arrs = _.take(arrs, deep)
  if (field) {
    arrs = _.concat(arrs, field)
  }
  return _.get(object, arrs)
}
export function setTableCellValue(object, index, dataValue) {
  if (!_.isObject(dataValue)) {
    return null
  }
  Object.assign(object[index], dataValue)
}

export function setTableCellVaue(object, prop, deep, field, value) {
  if (!object) {
    return null
  }
  let arrs = []
  if (_.isString(prop)) {
    arrs = prop.split('.')
  } else {
    arrs = prop
  }
  if (deep > arrs.length) {
    return null
  }
  arrs = _.take(arrs, deep).concat(field)
  return _.set(object, arrs, value)
}

export function getTableCellRowIndex(prop, deep) {
  let arrs = []
  if (_.isString(prop)) {
    arrs = prop.split('.')
  } else {
    arrs = prop
  }
  if (deep > arrs.length) {
    return null
  }
  return _.get(arrs, deep)
}

/**
 * 構成に従ってデータ型を変更します
 * @param {} config
 */
export function valueModifies(modifiers, value) {
  if (!modifiers) {
    return value
  }

  //先頭と末尾のスペースを削除
  if (modifiers.trim) {
    value = _.trim(value)
  }

  //大文字
  if (modifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }

  //数値型の場合は値を数値に変換する
  if (modifiers.number) {
    let v = _.toNumber(value)
    value = v ? v : value
  }

  if (modifiers.integer) {
    let v = _.toInteger(value)
    value = v ? v : value
  }
  return value
}

export function getYearMonthList(startDate, endDate) {
  if (_.isEmpty(startDate) || _.isEmpty(endDate)) {
    return []
  }

  let ymList = []
  let startYM = dayjs(startDate).format('YYYY/MM')
  let endYM = dayjs(endDate).format('YYYY/MM')

  // 契約期間の時間の差は数か月
  let sums = dayjs(endYM).diff(startYM, 'month')
  for (let i = 0; i <= sums; i++) {
    ymList.push(dayjs(startYM).add(i, 'month').format('YYYY/MM'))
  }

  return ymList
}

// 時間フォーマットの変換
export function convertTimeStr(date) {
  if (date) {
    return date.slice(0, 5)
  } else {
    return null
  }
}
// フォーマット時間です
export function formatTimeMsel(val, type = 'HH:mm:ss') {
  if (!_.isEmpty(val)) {
    return dayjs(dayjs().format('YYYY/MM/DD') + val).format(type)
  }
  return val
}
/**
 *2つの配列オブジェクトのマージは、KEYを比較する場合を指定します。ターゲットはソース オブジェクトを上書きします
 * @param {*} sourceArr
 * @param {*} destArr
 * @param {*} compareKey
 * @returns
 */
export function mergeArray(sourceArr, destArr, compareKey) {
  sourceArr = sourceArr || []
  destArr = destArr || []
  let result = []

  if (!compareKey) {
    return [...sourceArr, destArr]
  }

  return [...sourceArr, ...destArr].reduce((pre, cur) => {
    let index = result.findIndex(
      (item) => item[`${compareKey}`] == cur[`${compareKey}`]
    )
    if (index < 0) {
      result.push(cur)
    } else {
      result.splice(index, 1, cur)
    }
    return result
  }, {})
}

export const getCdValue = (cname, val) => {
  if (_.isEmpty(val) || _.isEmpty(_.trim(val))) {
    return null
  }
  return '（' + cname + '：' + val + '）'
}
// フォーマット金額です
export function moneyFormat(val, decimals = 0) {
  let numeral = require('numeral')
  let format = null
  if (decimals > 0) {
    format = `0,0.${_.padEnd('0', Number(decimals), '0')}`
  } else {
    format = `0,0`
  }
  if (val) {
    return numeral(val).format(format)
  }
}
// フォーマット年月です
export function getFomateMonth(value) {
  if (_.isEmpty(value) || !dayjs(value).isValid()) return
  return dayjs(value).format('YYYY/MM')
}

//ファイルのサイズのチェック
export function checkfileSize(fileList) {
  var result = fileList
    .map((file) => file.size)
    .reduce((pre, cur) => {
      return pre + cur
    })
  const FILE_SIZE_M = 10 * 1024 * 1024
  if (result > FILE_SIZE_M) {
    this.msgError(
      this.format(
        this.$t(`validateMessage.${this.$messageCode.E00000515.name}`),
        '10MB'
      )
    )
    return false
  }

  return true
}

/**
 * @description イベントを呼び出し後、次のイベントまで指定した時間が経過するまではイベントを発生させない処理。
 * @param {Function} func
 * @param {Number} wait 間隔 デフォルト200ms
 * @param {Boolean} immediate  すぐに実行するかどうか true(デフォルト) すぐに実行する，false 非即時実行
 * @return {*}
 */
export function vueDebounce(func, wait = 200, immediate = true) {
  let timeout = null
  return function () {
    let that = this,
      args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate === true) {
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        that[func](...args)
      }
    } else {
      timeout = setTimeout(() => {
        that[func](...args)
      }, wait)
    }
  }
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(str, expectsLowerCase) {
  var map = Object.create(null)
  var list = str.split(',')
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? function (val) {
        return map[val.toLowerCase()]
      }
    : function (val) {
        return map[val]
      }
}

/**
 * Create a cached version of a pure function.
 */
export function cached(fn) {
  var cache = Object.create(null)
  return function cachedFn(str) {
    var hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Always return false.
 */
export function no(a, b, c) {
  console.log(c)
  return false
}

/**
 * Mix properties into target object.
 */
export function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop(a, b, c) {
  console.info(c)
}

/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true)

export const emptyObject = Object.freeze({})
// カレンダー表示データをリセット
export function resetCalender(list, resList = []) {
  if (_.isEmpty(list)) return []
  let data = _.cloneDeep(list).map((v) => {
    return {
      day: Number(v?.day),
      timePeriodList: [
        {
          time: `${formatTimeMsel(
            v?.workPlanStartTime,
            'HH:mm'
          )}-${formatTimeMsel(v?.workPlanEndTime, 'HH:mm')}`,
          acceptOrderKey: `作業No：${this.getFieldValue(
            'workingPlanAndResultIdModel.workNo',
            v
          )}`,
          content: this.getFieldValue(
            'workingPlanAndResultIdModel.workName',
            v
          ),
          active: true,
        },
      ],
    }
  })
  data = getComplexList(resList, data)
  return data
}
// カレンダーの書式を変更する
export function getComplexList(resList, changeList) {
  resList.forEach((v) => {
    let day = dayjs(v.date).format('DD')
    changeList.forEach((item) => {
      v.timePeriodList.forEach((d, i) => {
        const keyList = item.timePeriodList.map((itm) => itm.acceptOrderKey)
        if (d?.acceptOrderKey && keyList.includes(d?.acceptOrderKey)) {
          v.timePeriodList.splice(i, 1)
        }
      })
      if (Number(day) == Number(item.day)) {
        v.timePeriodList.unshift(item.timePeriodList[0])
      }
    })
  })
  return resList
}
// 日付間カレンダーの書式設定
export function crossDaySet(dayList, ym) {
  const lastDay = dayjs(ym).endOf('month').format('DD')
  dayList.forEach((d, i) => {
    if (d?.timePeriodList?.length > 0) {
      const endList = []
      d?.timePeriodList.forEach((itm) => {
        if (itm.active) {
          const timeStr = itm.time.split('-')
          const start = timeStr[0]
          const end = timeStr[1]
          const sn = dayjs(d.date + start).valueOf()
          const en = dayjs(d.date + end).valueOf()
          if (sn > en) {
            itm.time = `${start}-23:59`
            if (!_.isUndefined(d.day) && Number(lastDay) != Number(d.day)) {
              endList.push({
                ...itm,
                time: `00:00-${end}`,
              })
            }
          }
        }
      })

      if (!_.isUndefined(d.day) && Number(lastDay) != Number(d.day)) {
        dayList[i + 1].timePeriodList = [
          ...endList,
          ...dayList[i + 1]?.timePeriodList,
        ]
      }
    }
  })
  return dayList
}
/**
 * sum1
 * @param {*} dividend The first number in a division.
 * @param {*} divisor The second number in a division.
 * @returns
 */
export function calcGrossInterest(dividend, divisor, format = true) {
  // 予定売上額が０円の場合は、0.0で表示する。
  if (!dividend || !divisor) {
    return 0.0
  }

  let crudeInterestRate = null
  let res = _.divide(dividend, divisor) * 100
  if (res < 0) {
    crudeInterestRate = _.ceil(res, 1)
  } else {
    crudeInterestRate = _.floor(res, 1)
  }

  let val = null

  // 但し、粗利率＜-999.9の場合は、-999.9で表示し
  if (crudeInterestRate < -999.9) {
    val = -999.9
  } else {
    val = crudeInterestRate
  }

  if (!format) {
    return val
  }

  return this.numeral(val).format('0,0.0')
}

/**
 *精度に切り捨てられる
 * @param {*} val
 * @param {*} precision
 * @returns
 */
export function floor(val, precision = 0) {
  if (val < 0) {
    val = _.ceil(val, precision)
  } else {
    val = _.floor(val, precision)
  }
  return val
}
