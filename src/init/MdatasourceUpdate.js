import request from '@/utils/request'

//${remarks}画面初期化

//データソースマスタデータをロードする
export function loadMDatasource({ id }) {
  return request({
    url: `/MDatasource/${id}`,
    method: 'get',
  })
}

export default { func: loadMDatasource, primaryKeys: ['id'] }
