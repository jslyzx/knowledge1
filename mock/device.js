const Mock = require('mockjs')

const xxList = []
const dxList = []
const ebList = []
const count = 24

const date1 = ['2021/9/21', '2021/9/22', '2021/9/23', '2021/9/24', '2021/9/27', '2021/9/28', '2021/9/29', '2021/9/30', '2021/10/1', '2021/10/4', '2021/10/5', '2021/10/6', '2021/10/7', '2021/10/8', '2021/10/11', '2021/10/12', '2021/10/13', '2021/10/14', '2021/10/15', '2021/10/18', '2021/10/19', '2021/10/20', '2021/10/21', '2021/10/22']
const date2 = ['2021/10/1', '2021/10/4', '2021/10/5', '2021/10/6', '2021/10/7', '2021/10/8', '2021/10/11', '2021/10/12', '2021/10/13', '2021/10/14', '2021/10/15', '2021/10/18', '2021/10/19', '2021/10/20', '2021/10/21', '2021/10/22', '2021/10/25', '2021/10/26', '2021/10/27', '2021/10/28', '2021/10/29', '2021/11/1', '2021/11/2', '2021/11/3']
const date3 = ['2021/10/2', '2021/10/4', '2021/10/5', '2021/10/6', '2021/10/7', '2021/10/8', '2021/10/11', '2021/10/12', '2021/10/13', '2021/10/14', '2021/10/15', '2021/10/18', '2021/10/19', '2021/10/20', '2021/10/21', '2021/10/22', '2021/10/25', '2021/10/26', '2021/10/27', '2021/10/28', '2021/10/29', '2021/11/1', '2021/11/2', '2021/11/3']

for (let i = 0; i < count; i++) {
  xxList.push(Mock.mock({
    date: date1[i],
    beginDate: date1[i],
    endDate: date2[i],
    xlbw: '更换阀门',
    lj: '阀门',
    ljxh: 'FF3626',
    debugDate: date2[i],
    completeDate: date3[i]
  }))

  dxList.push(Mock.mock({
    date: date1[i],
    beginDate: date1[i],
    endDate: date2[i],
    xlbw: i < 8 ? '修补防腐层和绝热层' : '清洗更换液面计',
    lj: i < 8 ? '无' : '流量计',
    ljxh: i < 8 ? '无' : 'GJ' + (1331237 + i),
    debugDate: date2[i],
    completeDate: date3[i]
  }))

  ebList.push(Mock.mock({
    date: date1[i],
    beginDate: date1[i],
    endDate: date2[i],
    xlbw: '更换管道',
    lj: '管道',
    ljxh: i < 8 ? 'GJ' + (1331245 + i) : 'GJ' + (1331237 + i),
    debugDate: date2[i],
    completeDate: date3[i]
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
      const pageList = ebList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: ebList.length,
          items: pageList
        }
      }
    }
  }
]
