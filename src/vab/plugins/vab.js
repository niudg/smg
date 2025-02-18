import { loadingText, messageDuration } from '@/config'
import vue from '@/main'
import store from '@/store'
import divisions from '@/constants/enum'
import messageCodeEnum from '@/constants/messageCodeEnum'
import * as constConfig from '@/config/const.config'
import { handleActionClick } from '@/utils/actionRules'
import {
  compareArr,
  compareObject,
  addOperationTypeForObj,
} from '@/utils/compare'
import download from '@/utils/download'
import {
  calcGrossInterest,
  checkfileSize,
  floor,
  formatCell,
  formatTableCell,
  formatNumber,
  formatTimeMsel,
  getCdValue,
  getEnumText,
  getEnumTextChange,
  getFomateMonth,
  getTextValue,
  mergeArray,
  moneyFormat,
  formatTimeDefault,
  formatDateTime,
  formatTimeDayLong,
} from '@/utils/index'
import mixSearch from '@/utils/mixSearch'
import {
  checkEnumFlag,
  downloadBlob,
  getFieldValue,
  isEqualCodeEnum,
  isZero,
} from '@/utils/validate'
import dayjs from 'dayjs'
import { Loading, Message, MessageBox, Notification } from 'element-ui'
import * as lodash from 'lodash'
import debounce from 'lodash/debounce'
import Vue from 'vue'
let format = require('string-format')
let numeral = require('numeral')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isBetween = require('dayjs/plugin/isBetween')
const minMax = require('dayjs/plugin/minMax')
dayjs.extend(minMax)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)
/**
 * @description グローバル ローディング レイヤー
 * @param {number} index カスタム読み込みアイコン クラス名 ID
 * @param {string} text ローディングアイコンの下に表示されるローディングテキスト
 */
Vue.prototype.$baseLoading = (index = undefined, text = loadingText) => {
  return Loading.service({
    lock: true,
    text,
    spinner: index ? 'vab-loading-type' + index : index,
    background: 'hsla(0,0%,100%,.8)',
  })
}

// グローバルメソッド
Vue.prototype.getEnumText = getEnumText
Vue.prototype.getEnumTextChange = getEnumTextChange
Vue.prototype.getTextValue = getTextValue
Vue.prototype.getCdValue = getCdValue
Vue.prototype.checkEnumFlag = checkEnumFlag
Vue.prototype.isEqualCodeEnum = isEqualCodeEnum
Vue.prototype.getFieldValue = getFieldValue
Vue.prototype.isZero = isZero
Vue.prototype.format = format
Vue.prototype.downloadBlob = downloadBlob
Vue.prototype.formatCell = formatCell
Vue.prototype.formatTableCell = formatTableCell
Vue.prototype.numeral = numeral
Vue.prototype.compareArr = compareArr
Vue.prototype.compareObj = compareObject
Vue.prototype.addOperationTypeForObj = addOperationTypeForObj
Vue.prototype.downloadFile = download
Vue.prototype.formatTimeMsel = formatTimeMsel
Vue.prototype.mergeArray = mergeArray
Vue.prototype.formatNumber = formatNumber
Vue.prototype.moneyFormat = moneyFormat
Vue.prototype.getFomateMonth = getFomateMonth
Vue.prototype.checkfileSize = checkfileSize
Vue.prototype.calcGrossInterest = calcGrossInterest
Vue.prototype.floor = floor
Vue.prototype.formatTimeDefault = formatTimeDefault
Vue.prototype.formatDateTime = formatDateTime
Vue.prototype.formatTimeDayLong = formatTimeDayLong
Vue.prototype.$handleActionClick = handleActionClick

Vue.mixin(mixSearch)
/**
 * @description グローバルカラフルな読み込みレイヤー
 * @param {number} index カスタム読み込みアイコン クラス名 ID
 * @param {string} text ローディングアイコンの下に表示されるローディングテキスト
 */
Vue.prototype.$baseColorfullLoading = (
  index = undefined,
  text = loadingText
) => {
  let loading
  if (!index) {
    loading = Loading.service({
      lock: true,
      text,
      spinner: 'dots-loader',
      background: 'hsla(0,0%,100%,.6)',
    })
  } else {
    const spinnerDict = {
      1: 'dots',
      2: 'gauge',
      3: 'inner-circles',
      4: 'plus',
    }
    loading = Loading.service({
      lock: true,
      text,
      spinner: spinnerDict[index] + '-loader',
      background: 'hsla(0,0%,100%,.8)',
    })
  }
  return loading
}

/**
 * @description グローバルMessage
 * @param {string|VNode} message 消息文字
 * @param {'success'|'warning'|'info'|'error'} type 主题
 * @param {string} customClass 自定义类名
 * @param {boolean} dangerouslyUseHTMLString 是否将message属性作为HTML片段处理
 */
Vue.prototype.$baseMessage = (
  message,
  type = 'info',
  dangerouslyUseHTMLString = false
) => {
  setTimeout(() => {
    Message({
      message,
      type,
      customClass: 'change' + type,
      offset: 32,
      duration: messageDuration,
      dangerouslyUseHTMLString,
      showClose: true,
    })
  }, 10)
}

/**
 * @description グローバルAlert
 * @param {string|VNode} content メッセージ本文の内容
 * @param {string} title タイトル
 * @param {function} callback Promiseを用いなければ，このパラメータを用いてMessageBoxのオフ後のコールバックを指定することができる.
 */
Vue.prototype.$baseAlert = (content, title = '確認', callback = undefined) => {
  MessageBox.alert(content, title, {
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    callback: () => {
      if (callback) {
        callback()
      }
    },
  })
}

/**
 * @description グローバルConfirm
 * @param {string|VNode} content メッセージ本文の内容
 * @param {string} title タイトル
 * @param {function} callback1 コールバック１
 * @param {function} callback2 コールバック２
 * @param {string} confirmButtonText OK ボタンのテキスト コンテンツ
 * @param {string} cancelButtonText キャンセル ボタンのテキスト
 */
Vue.prototype.$baseConfirm = (
  content,
  title = undefined,
  callback1 = undefined,
  callback2 = undefined,
  confirmButtonText = '確定',
  cancelButtonText = 'キャンセル'
) => {
  MessageBox.confirm(content, title || '確認', {
    confirmButtonText,
    cancelButtonText,
    closeOnClickModal: false,
    type: 'warning',
    lockScroll: false,
  })
    .then(() => {
      if (callback1) {
        callback1()
      }
    })
    .catch(() => {
      if (callback2) {
        callback2()
      }
    })
}

/**
 * @description グローバルNotification
 * @param {string} message 説明文字
 * @param {string|VNode} title タイトル
 * @param {'success'|'warning'|'info'|'error'} type テーマスタイルは、オプションの値内でなければ無視されます
 * @param {'top-right'|'top-left'|'bottom-right'|'bottom-left'} position ポップアップ位置をカスタマイズする.
 * @param duration 表示時間、ミリ秒
 */
Vue.prototype.$baseNotify = (
  message,
  title,
  type = 'success',
  position = 'top-right',
  duration = messageDuration
) => {
  Notification({
    title,
    message,
    type,
    duration,
    position,
  })
}

Vue.prototype.msgSuccess = function (msg) {
  this.$baseMessage(msg, 'success')
}
Vue.prototype.msgError = function (msg) {
  this.$baseMessage(msg, 'error')
}
Vue.prototype.msgInfo = function (msg) {
  this.$baseMessage(msg, 'warning')
}
Vue.prototype.msgErrorHtml = function (msg) {
  this.$baseMessage(msg, 'error', true)
}

/**
 * @description 表の高さ
 * @param {*} formType
 */
/* TableHeight */
Vue.prototype.$baseTableHeight = (diff = 40) => {
  let height = window.innerHeight
  //header + tabs
  let headHeight = 185
  //pager
  let formHeight = 95

  //queryBar
  let queryBar = document.getElementsByClassName('vab-query-form')
  if (queryBar.length > 0) {
    formHeight = queryBar[0].clientHeight
  }

  //toolbar
  let toolBar = document.getElementsByClassName('vab-box-area')
  let toolBarHeight = 0
  if (toolBar.length > 0) {
    toolBarHeight = toolBar[0].clientHeight
  }

  height = height - headHeight - formHeight - toolBarHeight - diff
  return height
}

/* lodash */
Vue.prototype.$baseLodash = lodash
/* dayjs */
Vue.prototype.$dayjs = dayjs

Vue.prototype.$closePage = async (path) => {
  await store.dispatch('tabs/delVisitedRoute', path).then(() => {})
}
Vue.prototype.$pageReload = async function (params) {
  let routes = await store.getters['tabs/visitedRoutes']

  //target
  const refresh = routes.find(
    (item) =>
      item.name.toUpperCase() === params.refresh?.toUpperCase() ||
      item.path.toUpperCase() === params.refresh?.toUpperCase()
  )
  if (refresh) {
    await store.dispatch('notify/setRefresh', params.refresh).then(() => {})
  }
  return routes
}
/**ルートリロード */
Vue.prototype.$routerPushAndReload = async function (params) {
  //await store.dispatch('tabs/delVisitedRoute', params.path).then(() => {})
  const routes = await this.$pageReload(params)
  //target
  const target = routes.find(
    (item) =>
      item.name.toUpperCase() === params.name?.toUpperCase() ||
      item.path.toUpperCase() === params.path?.toUpperCase()
  )

  if (params?.path || params?.name) {
    vue.$router.push(target ? target : params)
  }
}
Vue.prototype.$closeRouting = async (options) => {
  await store.dispatch('tabs/pushRoute', options).then(() => {})
}
Vue.prototype.$executeCloseRouting = async (name) => {
  await store.dispatch('tabs/deleteRoute', name).then(() => {})
}

/**ルート修正 */
Vue.prototype.$routerPush = debounce(async (params, override = false) => {
  let routes = await store.getters['tabs/visitedRoutes']
  const target = routes.find(
    (item) =>
      item.name.toUpperCase() === params.name?.toUpperCase() ||
      item.path.toUpperCase() === params.path?.toUpperCase()
  )
  if (params?.refresh) {
    await store.dispatch('notify/setRefresh', params.refresh).then(() => {})
  }
  if (target) {
    if (override) {
      await store.dispatch('tabs/delVisitedRoute', target.path)
      vue.$router.push(params)
      return true
    }
    vue.$confirm({
      msg: '既に開かれているページがあります、引き続きこのページへ遷移してよろしいでしょうか？遷移する場合、前回開いていたページが閉じられます。',
      yesText: '確定',
      yes: async () => {
        await store.dispatch('tabs/delVisitedRoute', target.path)
        vue.$router.push(params)
        return true
      },
      no: () => {
        return false
      },
    })
  } else {
    vue.$router.push(params)
    return true
  }
}, 200)
/**
 * @description グローバル·イベント·バス
 */
Vue.prototype.$baseEventBus = new Vue()

console.log('====-360', constConfig)
Vue.prototype.$const = constConfig

//区分
Vue.prototype.$divisions = divisions

//エラー
Vue.prototype.$messageCode = messageCodeEnum
