import i18n from '@/i18n/index'
import { getZFWlength, calcSosi } from '@/utils/index'
import _ from 'lodash'
/**
 * 输入的长度
 * @param {} value
 * @param {*} attr
 */

const maxlength = (param) => {
  return (rule, value, callback) => {
    var length = getZFWlength(value)
    var num = calcSosi(value)
    if (length + num <= param[0]) {
      callback()
      return
    }
    let msg = i18n.t(`最大文字数を超えています。`)
    msg = _.replace(msg, '{0}', param[0])
    callback(new Error(msg))
  }
}
export default maxlength
