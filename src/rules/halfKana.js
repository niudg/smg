/**
 * 输入的值
 * @param {} value
 * @param {*} attr
 */
import i18n from '@/i18n/index'

const halfKana = () => {
  return (rule, value, callback) => {
    if (value && value.match(/^[^\x01-\x7E\uFF61-\uFF9F]+$/)) {
      let msg = i18n.t(`validateMessage.E00000054`)
      return callback(new Error(msg))
    }
    callback()
  }
}
export default halfKana
