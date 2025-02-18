//照会
const viewMode = ['beforeView', 'view', 'disabledForm']

const dateFormatMap = {
  YEAR: 'YYYY',
  MONTH: 'YYYY-MM',
  //日付
  LOCALDATE: 'YYYY-MM-DD',
  //時間
  LOCALTIME: 'HH:mm:ss',
  LOCALTIMESTMAP: 'HH:mm:ss:SSS',
  //日付時間
  LOCALDATETIME: 'YYYY-MM-DD HH:mm:ss',
}

//発注情報編集可否ステータス
export { dateFormatMap, viewMode }
