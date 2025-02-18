import request from '@/utils/request'

export function download(url) {
  return request({
    url: url,
    method: 'get',
    responseType: 'blob',
  })
}

export function upload(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data,
    responseType: 'blob',
  })
}
export function uploadBath(url, data) {
  return request({
    url: url,
    method: 'post',
    data: data,
  })
}

export function delFile(url) {
  return request({
    url: url,
    method: 'delete',
  })
}
