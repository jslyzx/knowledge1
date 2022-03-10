import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getEquList(query) {
  return request({
    url: '/vue-admin-template/equ/list',
    method: 'get',
    params: query
  })
}

export function getCwbList(query) {
  return request({
    url: '/vue-admin-template/cwb/list',
    method: 'get',
    params: query
  })
}

export default{
  getList,
  getEquList,
  getCwbList
}