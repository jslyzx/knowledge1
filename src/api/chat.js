import request from '@/utils/request'

export function doChat(data) {
  return request({
    url: '/local_doc_qa/local_doc_chat',
    method: 'post',
    data
  })
}
