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

export function getEquDwList(query) {
  return request({
    url: '/vue-admin-template/equ/dwList',
    method: 'get',
    params: query
  })
}

export function getQzList(query) {
  return request({
    url: '/vue-admin-template/qz/list',
    method: 'get',
    params: query
  })
}

export function getProjects(query) {
  return request({
    url: '/vue-admin-template/project/list',
    method: 'get',
    params: query
  })
}

export function getCodeList(query) {
  return request({
    url: '/vue-admin-template/code/list',
    method: 'get',
    params: query
  })
}

export function getConsumeList(query) {
  return request({
    url: '/vue-admin-template/consume/list',
    method: 'get',
    params: query
  })
}


