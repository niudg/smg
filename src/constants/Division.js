class CodeTextEnum {
  constructor(value, code, text) {
    this.code = code
    this.value = value
    this.text = text
  }
}
// ステータス
const ValidStatusEnum = Object.freeze({
  enum_1: new CodeTextEnum('1', 'enum_1', '有効'),
  enum_2: new CodeTextEnum('2', 'enum_2', '無効'),
})
// ドライバー
const DriverClassNameEnum = Object.freeze({
  enum_mysql: new CodeTextEnum(
    'mysql',
    'enum_mysql',
    'com.mysql.cj.jdbc.Driver'
  ),
})
// キャッシュタイプ
const CacheTypeEnum = Object.freeze({
  enum_1: new CodeTextEnum('1', 'enum_1', 'Redis'),
})
// サービス料金コード
const ServiceCodeEnum = Object.freeze({
  enum_1: new CodeTextEnum('1', 'enum_1', 'トライアル'),
  enum_2: new CodeTextEnum('2', 'enum_2', '月額固定'),
  enum_3: new CodeTextEnum('3', 'enum_3', '年額固定'),
  enum_4: new CodeTextEnum('4', 'enum_4', '固定'),
})
// 開通状態
const OpeningStatusEnum = Object.freeze({
  enum_1: new CodeTextEnum('1', 'enum_1', '申請中'),
  enum_2: new CodeTextEnum('2', 'enum_2', '承認中'),
  enum_3: new CodeTextEnum('3', 'enum_3', '開通待'),
  enum_4: new CodeTextEnum('4', 'enum_4', '拒否'),
  enum_5: new CodeTextEnum('5', 'enum_5', '開通済'),
  enum_6: new CodeTextEnum('6', 'enum_6', '開通失敗'),
})
// 通貨
const CurrencyTypeEnum = Object.freeze({
  enum_jPY: new CodeTextEnum('jPY', 'enum_jPY', '円'),
  enum_uSD: new CodeTextEnum('uSD', 'enum_uSD', '$'),
  enum_blank: new CodeTextEnum('', 'enum_blank', ''),
})
module.exports = {
  //ステータス
  ValidStatusEnum,
  //ドライバー
  DriverClassNameEnum,
  //キャッシュタイプ
  CacheTypeEnum,
  //サービス料金コード
  ServiceCodeEnum,
  //開通状態
  OpeningStatusEnum,
  //通貨
  CurrencyTypeEnum,
}
