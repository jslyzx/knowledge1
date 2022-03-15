const Mock = require('mockjs')

const xxList = []
const dxList = []
const count = 100

for (let i = 0; i < count; i++) {
  xxList.push(Mock.mock({
    xxr: '亓维刚',
    date: '@date',
    beginDate: '@date',
    endDate: '@date',
    xlbw: '更换阀门',
    lj: '阀门',
    ljxh: 'FF3626',
    debugDate: '@date',
    completeDate: '@date',
  }))

  dxList.push(Mock.mock({
    xxr: '亓维刚',
    date: '@date',
    beginDate: '@date',
    endDate: '@date',
    xlbw: '更换阀门',
    lj: '阀门',
    ljxh: 'FF3626',
    debugDate: '@date',
    completeDate: '@date',
  }))
}

module.exports = [{
    url: '/vue-admin-template/device/getXxList',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = xxList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: xxList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/device/getDxList',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = dxList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: dxList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/device/getEbList',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = xxList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: xxList.length,
          items: pageList
        }
      }
    }
  }
]
