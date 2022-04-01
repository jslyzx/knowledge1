import request from '@/utils/request'

export function queryEquipmentSetting() {
  return request({
    url: '../api/equipment/queryEquipmentSetting',
    method: 'get'
  })
}

export function saveEquipmentSetting(data) {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/saveEquipmentSetting',
    method: 'post',
    data
  })
}
