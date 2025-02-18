import i18n from '@/i18n/index'
import { isArray } from '@/utils/validate'
import _ from 'lodash'
import format from 'string-format'
/**
 * 输入的长度
 * @param {} value
 * @param {*} attr
 */

const rangelength = (param) => {
  return (rule, value, callback) => {
    var length = isArray(value) ? value.length : value.length
    if (length >= _.toNumber(param[0]) && length <= _.toNumber(param[1])) {
      callback()
      return
    }
    let msg = format(i18n.t(`validateMessage.E00000021`), param[0], param[1])
    callback(new Error(msg))
  }
}
export default rangelength
