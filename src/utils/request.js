import { refreshToken } from '@/api/refreshToken'
import {
  authMode,
  baseURL,
  contentType,
  messageName,
  publicPath,
  requestTimeout,
  successCode,
  ignoreUrl,
} from '@/config'
import router from '@/router'
import store from '@/store'
import { isArray } from '@/utils/validate'
import { addErrorLog, needErrorLog } from '@/vab/plugins/errorLog'
import axios from 'axios'
import _ from 'lodash'
import qs from 'qs'
import Vue from 'vue'

let loadingInstance = null

let refreshToking = false

let requests = []

// 操作正常Code数组
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]]

const CODE_MESSAGE = {
  0: '誤りが分からないのは，バックエンドがドメイン間CORSをサポートしていない，インタフェースアドレスが存在しないなどの問題による可能性がある.',
  200: 'リクエストは成功し、レスポンスとともに要求に応じた情報が返される。',
  201: 'データの新規作成や修正に成功しました',
  202: '受理。リクエストは受理されたが、処理は完了していない。',
  204: '内容なし。リクエストを受理したが、返すべきレスポンスエンティティが存在しない場合に返される。',
  400: 'リクエストが不正である。',
  401: 'ユーザーが存在しないか、権限がありません。再度ログインしてください。',
  402: 'トークンの有効期限が切れる',
  403: 'ユーザーは許可を得ますが、アクセスは禁止されています',
  404: 'リソース・ページが見つからなかった。',
  406: '受理できない。Accept関連のヘッダに受理できない内容が含まれている場合に返される。',
  410: '消滅した。リソースは恒久的に移動・消滅した。どこに行ったかもわからない。',
  500: 'サーバ内部エラー。サーバ内部にエラーが発生した場合に返される。',
  502: '不正なゲートウェイ。ゲートウェイ・プロキシサーバは不正な要求を受け取り、これを拒否した。',
  503: 'サービス利用不可。サービスが一時的に過負荷やメンテナンスで使用不可能である。',
  504: 'ゲートウェイタイムアウト。',
}

/**
 * axios请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConf = (config) => {
  if (authMode == 'normal') {
    const token = store.getters['user/token']
    if (token) config.headers['Authorization'] = `Bearer ${token}`
  }
  // if (token) config.headers[tokenName] = token
  if (
    config.data &&
    config.headers['Content-Type'] ===
      'application/x-www-form-urlencoded;charset=UTF-8'
  )
    config.data = qs.stringify(config.data)

  if (!ignoreUrl.some((item) => location.pathname.indexOf(item) > -1)) {
    requests.push(config.url)
    if (!config.ignoreLoading) {
      if (!loadingInstance) {
        loadingInstance = Vue.prototype.$baseColorfullLoading()
      }
    }
  }

  return config
}

/**
 * リフレッシュ トークンの更新
 * @param config 期限切れリクエストの構成
 * @returns {any} 結果を返す
 */
const tryRefreshToken = async (config) => {
  if (!refreshToking) {
    refreshToking = true
    try {
      const {
        data: { token },
      } = await refreshToken()
      if (token) {
        store.dispatch('user/setToken', token).then(() => {})
        // トークンが更新され、キューに入れられたすべてのリクエストが再試行されます
        requests.forEach((cb) => cb(token))
        requests = []
        return instance(requestConf(config))
      }
    } catch (error) {
      console.error('refreshToken error =>', error)
      router.push({ path: '/login', replace: true }).then(() => {})
    } finally {
      refreshToking = false
    }
  } else {
    return new Promise((resolve) => {
      // 解決をキューに入れ、関数形式で保存し、トークンが更新された直後に実行します
      requests.push(() => {
        resolve(instance(requestConf(config)))
      })
    })
  }
}

/**
 * axios応答インターセプター
 * @param config リクエスト構成
 * @param data responseデータ
 * @param status HTTP status
 * @param statusText HTTP status text
 * @returns {Promise<*|*>}
 */
const handleData = async (response) => {
  const { config, data, status = 0, statusText, headers } = response
  store.dispatch('settings/setSearchIndex', 0)
  if (!ignoreUrl.some((item) => location.pathname.indexOf(item) > -1)) {
    setTimeout(() => {
      requests.splice(-1, 1)
      if (requests.length == 0) {
        if (!config?.ignoreLoading) {
          if (loadingInstance) {
            loadingInstance.close()
            loadingInstance = null
          }
        }
      }
    }, 200)
  }
  let code = status
  if (codeVerificationArray.indexOf(code) + 1) code = 200
  if (status == 0 && authMode != 'normal') {
    window.location.href = `${baseURL}${publicPath}so/saml2/authenticate/adfs`
    return Promise.reject(data)
  }

  switch (code) {
    case 200:
    case 201:
      // 業務レベルのエラーハンドリング、以下はrestfulで出力形式が統一されていることを前提としている（成否に関わらず対応するデータ形式を参照）
      // 例：応答内容
      if (headers?.filename) {
        return {
          data: data,
          filename: headers['filename'],
        }
      }
      return data
    case 302:
      window.location.href = `${baseURL}${publicPath}so/saml2/authenticate/adfs`
      return
    case 401:
      if (authMode != 'normal') {
        store.dispatch('user/resetAll')
        window.location.href = `${baseURL}${publicPath}so/saml2/authenticate/adfs`
      } else {
        store
          .dispatch('user/resetAll')
          .then(() =>
            router.push({ path: '/login', replace: true }).then(() => {})
          )
      }
      break
    case 402:
      return await tryRefreshToken(config)
    case 403:
      router.push({ path: '/403' }).then(() => {})
      break
  }

  let messageObj = data
  if (config.responseType == 'blob') {
    let responseObj = await data.text()
    const responseJson =
      typeof responseObj === 'string' ? JSON.parse(responseObj) : responseObj
    messageObj = responseJson
  }

  let errs = []
  if (_.has(messageObj, messageName) && messageObj[messageName]) {
    messageObj[messageName].map((item) => errs.push(item.message))
  }

  // 例外情報の処理
  let errMsg = `${
    messageObj && messageObj[messageName]
      ? messageObj[messageName]
      : CODE_MESSAGE[code]
      ? CODE_MESSAGE[code]
      : statusText
  }`
  if (errs.length > 0) {
    errMsg = errs.join('¥r¥n')
  }
  Vue.prototype.$baseMessage(errMsg, 'error')
  needErrorLog() &&
    addErrorLog({ message: errMsg, stack: data, isRequest: true })

  return Promise.reject(data)
}

/**
 * @description axios初期化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * @description axiosリクエストインターセプター
 */
instance.interceptors.request.use(requestConf, (error) => {
  return Promise.reject(error)
})

/**
 * @description axios応答インターセプター
 */
instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response = {} } = error
    return handleData(response)
  }
)

export default instance
