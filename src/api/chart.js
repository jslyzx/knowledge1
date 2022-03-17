import request from '@/utils/request'

export function getElecAnalysis(query) {
  return request({
    url: '/vue-admin-template/data/getElecAnalysis',
    method: 'get',
    params: query
  })
}

