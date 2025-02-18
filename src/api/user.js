import request from '@/utils/request'

export async function login(data) {
  return request({
    url: `/login`,
    method: 'post',
    data,
  })
}

export function getUserInfo() {
  return request({
    url: `/userInfo`,
    method: 'post',
  })
}

export function logout() {
  return request({
    url: `/logout`,
    method: 'get',
  })
}
export function sendMail(data) {
  return request({
    url: `/sendMail`,
    method: 'post',
    data,
  })
}
export function register(data) {
  return request({
    url: `/register`,
    method: 'post',
    data,
  })
}
export function getServiceChargeList(data) {
  return request({
    url: `/MServiceCharge/found`,
    method: 'post',
    data,
  })
}
export function getServiceList(data) {
  return request({
    url: `/MService/found`,
    method: 'post',
    data,
  })
}
