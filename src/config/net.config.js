/**
 * @description
 **/
module.exports = {
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? '/vab-mock-server'
  //     : '/vab-mock-server',
  baseURL: process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PREX,
  webSocket: process.env.VUE_APP_WS_URL,
  // : 'http://ec2-18-176-61-160.ap-northeast-1.compute.amazonaws.com/v1',
  // バックエンドデータの受信方法を設定する application/json;charset=UTF-8 or application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 最大リクエスト時間
  requestTimeout: 1000 * 60 * 20,
  // 通常のコードを操作し、String、Array、int 複数の型をサポート
  successCode: [200, 0, '200', '0', 201, 204],
  // データ状態のフィールド名
  statusName: 'code',
  // ステータス情報のフィールド名
  messageName: 'errors',
}
