/**
 * 输入的值
 * @param {} value
 * @param {*} attr
 */
import i18n from '@/i18n/index'
import _ from 'lodash'
import format from 'string-format'
import { formatCurrency } from '@/utils/index'

const range = (param) => {
  return (rule, value, callback) => {
    if (!value && value != 0) {
      callback()
      return
    }
    if (value >= _.toNumber(param[0]) && value <= _.toNumber(param[1])) {
      callback()
      return
    }

    let min = formatCurrency(param[0])
    let max = formatCurrency(param[1])

    if (min == null || max == null) {
      return callback(new Error(i18n.t(`validateMessage.E00000014`)))
    }

    let msg = format(
      i18n.t(`validateMessage.E00000022`),
      formatCurrency(param[0]),
      formatCurrency(param[1])
    )
    callback(new Error(msg))
  }
}
export default range
