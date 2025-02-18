import request from '@/utils/request'

//${remarks}画面初期化

//サービス料金マスタデータをロードする
export function loadMServiceCharge({ id }) {
  return request({
    url: `/MServiceCharge/${id}`,
    method: 'get',
  })
}

export default { func: loadMServiceCharge, primaryKeys: ['id'] }
