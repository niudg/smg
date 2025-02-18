import request from '@/utils/request'

//${remarks}画面初期化

//キャッシュマスタデータをロードする
export function loadMCache({ id }) {
  return request({
    url: `/MCache/${id}`,
    method: 'get',
  })
}

export default { func: loadMCache, primaryKeys: ['id'] }
