module.exports = {
  // ステータス
  ValidStatus: [
    { code: 'enum_1', value: '1', text: '有効' },
    { code: 'enum_2', value: '2', text: '無効' },
  ],
  // ドライバー
  DriverClassName: [
    { code: 'enum_mysql', value: 'mysql', text: 'com.mysql.cj.jdbc.Driver' },
  ],
  // キャッシュタイプ
  CacheType: [{ code: 'enum_1', value: '1', text: 'Redis' }],
  // サービス料金コード
  ServiceCode: [
    { code: 'enum_1', value: '1', text: 'トライアル' },
    { code: 'enum_2', value: '2', text: '月額固定' },
    { code: 'enum_3', value: '3', text: '年額固定' },
    { code: 'enum_4', value: '4', text: '固定' },
  ],
  // 開通状態
  OpeningStatus: [
    { code: 'enum_1', value: '1', text: '申請中' },
    { code: 'enum_2', value: '2', text: '承認中' },
    { code: 'enum_3', value: '3', text: '開通待' },
    { code: 'enum_4', value: '4', text: '拒否' },
    { code: 'enum_5', value: '5', text: '開通済' },
    { code: 'enum_6', value: '6', text: '開通失敗' },
  ],
  // 通貨
  CurrencyType: [
    { code: 'enum_jPY', value: 'jPY', text: '円' },
    { code: 'enum_uSD', value: 'uSD', text: '$' },
    { code: 'enum_blank', value: '', text: '' },
  ],
}
