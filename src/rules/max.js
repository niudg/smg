/**
 * 输入的值
 * @param {} value
 * @param {*} attr
 */
import i18n from '@/i18n/index'
import _ from 'lodash'
import format from 'string-format'

const range = (param) => {
  return (rule, value, callback) => {
    var length = value ? value.length : 0
    if (length > _.toNumber(param[0])) {
      let msg = format(i18n.t(`validateMessage.E00000019`), param[0])
      callback(new Error(msg))
      return
    }
    return callback()
  }
}
export default range
