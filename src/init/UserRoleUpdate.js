import request from '@/utils/request'

//${remarks}画面初期化

//ユーザーロールデータをロードする
export function loadUserRole({ id }) {
  return request({
    url: `/userRole/${id}`,
    method: 'get',
  })
}

export default { func: loadUserRole, primaryKeys: ['id'] }
