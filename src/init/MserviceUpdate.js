import request from '@/utils/request'

//${remarks}画面初期化

//サ-ビスマスタデータをロードする
export function loadMService({ id }) {
  return request({
    url: `/MService/${id}`,
    method: 'get',
  })
}

export default { func: loadMService, primaryKeys: ['id'] }
