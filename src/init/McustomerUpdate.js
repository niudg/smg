import request from '@/utils/request'

//${remarks}画面初期化

//取引先マスタデータをロードする
export function loadMCustomer({ id }) {
  return request({
    url: `/MCustomer/${id}`,
    method: 'get',
  })
}
//テナントマスタデータをロードする
export function loadMTenent01(data) {
  return request({
    url: `/page/McustomerUpdate/loadMTenent01`,
    method: 'post',
    data,
  })
}

export default {
  func: loadMCustomer,
  primaryKeys: ['id'],
  children: [
    {
      func: loadMTenent01,
      prop: 'customerIdMTenentModelList',
      params: [{ from: 'id', to: 'customerId' }],
    },
  ],
}
