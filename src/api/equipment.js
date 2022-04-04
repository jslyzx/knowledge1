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

export function queryAllEquipmentSetting() {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/queryAllEquipmentSetting',
    method: 'get'
  })
}

export function queryIotSettingList(data) {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/queryIotSettingList',
    method: 'post',
    data
  })
}

export function saveIotSettingList(data) {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/saveIotSettingList',
    method: 'post',
    data
  })
}

export function queryHoursTotalQty() {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/queryHoursTotalQty',
    method: 'get'
  })
}

export function queryDayTotalQty() {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/queryDayTotalQty',
    method: 'get'
  })
}

