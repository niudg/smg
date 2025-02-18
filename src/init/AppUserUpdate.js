import request from '@/utils/request'

//${remarks}画面初期化

//ユーザーデータをロードする
export function loadAppUser({ userId }) {
  return request({
    url: `/appUser/${userId}`,
    method: 'get',
  })
}

export default { func: loadAppUser, primaryKeys: ['userId'] }
