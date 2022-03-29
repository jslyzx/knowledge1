import request from '@/utils/request'

export function queryEquipmentSetting() {
  return request({
    url: '../api/equipment/queryEquipmentSetting',
    method: 'get'
  })
}
