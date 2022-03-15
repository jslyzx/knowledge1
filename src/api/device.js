import request from '@/utils/request'

export function getXxList(query) {
  return request({
    url: '/vue-admin-template/device/getXxList',
    method: 'get',
    params: query
  })
}

export function getDxList(query) {
  return request({
    url: '/vue-admin-template/device/getDxList',
    method: 'get',
    params: query
  })
}
export function getEbList(query) {
  return request({
    url: '/vue-admin-template/device/getEbList',
    method: 'get',
    params: query
  })
}
