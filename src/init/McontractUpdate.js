import request from '@/utils/request'

//${remarks}画面初期化

//契約管理データをロードする
export function loadMContract({ id }) {
  return request({
    url: `/MContract/${id}`,
    method: 'get',
  })
}

export default { func: loadMContract, primaryKeys: ['id'] }
