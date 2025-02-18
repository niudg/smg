/**
 * 输入的值
 * @param {} value
 * @param {*} attr
 */

const boolean = () => {
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error())
      return
    }
    callback()
  }
}
export default boolean
