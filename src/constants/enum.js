const codeEnum = require('./CodeEnum')
const division = require('./Division')
class CodeTextEnum {
  constructor(value, code, text) {
    this.code = code
    this.value = value
    this.text = text
  }
}
// 操作タイプ
const operationTypeEnum = Object.freeze({
  enum_I: new CodeTextEnum('I', 'enum_I', 'Insert'),
  enum_U: new CodeTextEnum('U', 'enum_U', 'Update'),
  enum_D: new CodeTextEnum('D', 'enum_D', 'Delete'),
})
// 取消フラグ
const cancelFlgEnum = Object.freeze({
  enum_1: new CodeTextEnum('1', 'enum_1', '取消'),
  enum_blank: new CodeTextEnum(' ', 'enum_blank', '有効'),
})
// 真偽区分
const boolFlagEnum = Object.freeze({
  enum_1: new CodeTextEnum('1', 'enum_1', '真'),
  enum_blank: new CodeTextEnum(' ', 'enum_blank', '偽'),
})
export default {
  operationTypeEnum,
  cancelFlgEnum,
  boolFlagEnum,
  ...codeEnum,
  ...division,
}
