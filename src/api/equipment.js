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

export function queryEnergyList(data) {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/queryEnergyList',
    method: 'post',
    data
  })
}

export function saveEnergy(data) {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/saveEnergy',
    method: 'post',
    data
  })
}

export function queryEnergyTotalByYear(data) {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/queryEnergyTotalByYear',
    method: 'post',
    data
  })
}

export function queryEnergyDetail(data) {
  return request({
    url: '/vue-admin-template/equipment/queryEnergyDetail',
    method: 'post',
    data
  })
}

export function saveEnergyStock(data) {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/saveEnergyStock',
    method: 'post',
    data
  })
}

export function queryGasInfoByDay(data) {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/queryGasInfoByDay',
    method: 'post',
    data
  })
}

export function queryMonthQty() {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/queryMonthQty',
    method: 'get'
  })
}

export function getAllMachineList() {
  return request({
    url: 'http://117.144.170.42:8089/prod-api/api/equipment/getAllMachineList',
    method: 'get'
  })
}
