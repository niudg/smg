import request from '@/utils/request'

//${remarks}画面初期化

//ロールデータをロードする
export function loadRole({ roleId }) {
  return request({
    url: `/role/${roleId}`,
    method: 'get',
  })
}

export default { func: loadRole, primaryKeys: ['roleId'] }
