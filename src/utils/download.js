import {
  authMode,
  loadingText,
  messageDuration,
  messageName,
  publicPath,
} from '@/config'
import request from '@/utils/request'
import router from '@/router'
import store from '@/store'
import { Loading, Message } from 'element-ui'
import { saveAs } from 'file-saver'
import _ from 'lodash'
import { baseURL } from '@/config/net.config'
let $baseMessage = (
  message,
  type = 'info',
  dangerouslyUseHTMLString = false
) => {
  Message({
    message,
    type,
    customClass: 'change' + type,
    duration: messageDuration,
    dangerouslyUseHTMLString,
    showClose: true,
  })
}

export default {
  requestMethod(resource, data, download) {
    const loadingInstance = Loading.service({
      lock: true,
      loadingText,
      spinner: 'dots-loader',
      background: 'hsla(0,0%,100%,.8)',
    })

    if (!data) {
      request({
        method: 'get',
        url: encodeURI(resource),
        responseType: 'blob',
      })
        .then(
          async (res) => {
            download(res)

            loadingInstance.close()
          },
          (error) => {
            if (error.message.includes('code 400')) {
              let content = error.response.data
              let resBlob = new Blob([content])
              let reader = new FileReader()
              reader.readAsText(resBlob, 'utf-8')
              reader.onload = () => {
                let messageObj = JSON.parse(reader.result)
                let errMsg = ''
                let errs = []
                if (_.has(messageObj, messageName) && messageObj[messageName]) {
                  messageObj[messageName].map((item) => errs.push(item.message))
                }
                if (errs.length > 0) {
                  errMsg = errs.join('¥r¥n')
                }
                $baseMessage(errMsg, 'error')
              }
              loadingInstance.close()
            } else {
              this.redirect()
            }
          }
        )
        .catch(() => {
          this.redirect()
        })
    } else {
      request({
        method: 'post',
        url: resource,
        data,
        responseType: 'blob',
      })
        .then(
          async (res) => {
            download(res)
            loadingInstance.close()
          },
          (error) => {
            if (error.message.includes('code 400')) {
              let content = error.response.data
              let resBlob = new Blob([content])
              let reader = new FileReader()
              reader.readAsText(resBlob, 'utf-8')
              reader.onload = () => {
                let messageObj = JSON.parse(reader.result)
                let errMsg = ''
                let errs = []
                if (_.has(messageObj, messageName) && messageObj[messageName]) {
                  messageObj[messageName].map((item) => errs.push(item.message))
                }
                if (errs.length > 0) {
                  errMsg = errs.join('¥r¥n')
                }
                $baseMessage(errMsg, 'error')
              }
              loadingInstance.close()
            } else {
              this.redirect()
            }
          }
        )
        .catch(() => {
          this.redirect()
        })
    }
  },
  redirect() {
    if (authMode != 'normal') {
      window.location.href = `${baseURL}${publicPath}so/saml2/authenticate/adfs`
    } else {
      store
        .dispatch('user/resetAll')
        .then(() =>
          router.push({ path: '/login', replace: true }).then(() => {})
        )
    }
  },

  resource(resource, data, pre) {
    let that = this
    function download(res) {
      const blob = new Blob([res.data], { type: 'application/octet-stream' })
      that.saveAs(
        blob,
        // +#に置き換える
        decodeURI(res.headers['filename']).replace(RegExp('%23', 'g'), '#')
      )
    }
    this.requestMethod(resource, data, download, pre)
  },

  //zip
  zip(resource, data, pre) {
    let that = this
    function download(res) {
      const blob = new Blob([res.data], { type: 'application/zip' })
      that.saveAs(
        blob,
        // +#に置き換える
        decodeURI(res.headers['filename']).replace(RegExp('%23', 'g'), '#')
      )
    }
    this.requestMethod(resource, data, download, pre)
  },
  saveAs(text, name, opts) {
    saveAs(text, name, opts)
  },
  async blobValidate(data) {
    try {
      const text = await data.text()
      JSON.parse(text)
      return false
    } catch (error) {
      return true
    }
  },
}
