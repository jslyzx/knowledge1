import request from '@/utils/request'

export function queryEquipmentSetting() {
  return request({
    url: '../api/equipment/queryEquipmentSetting',
    method: 'get'
  })
}

export function saveEquipmentSetting(data) {
  return request({
    url: '../api/equipment/saveEquipmentSetting',
    method: 'post',
    data
  })
}
