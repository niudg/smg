import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess(text) {
  Vue.prototype.$baseMessage(
    `コピー${text}成功しました`,
    'success',
    'vab-hey-message-success'
  )
}

function clipboardError(text) {
  Vue.prototype.$baseMessage(
    `コピー${text}失敗しました`,
    'error',
    'vab-hey-message-success'
  )
}

/**
 * @description データのコピー
 * @param text
 * @param event
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  })
  clipboard.on('success', () => {
    clipboardSuccess(text)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(text)
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
