const Mock = require('mockjs')

const equList = []
const cwbList = []
const dwList = []
const qzList = []
const projectList = []
const codeList = []
const consumeList = []
const count = 100

for (let i = 0; i < count; i++) {
  equList.push(Mock.mock({
    id: '@increment',
    no: '@id',
    cs: '@ctitle(10)',
    xh: '@ctitle(10)',
    fk: '@ctitle(10)',
    name: '@name',
    pageviews: '@integer(300, 5000)',
    isFk: '@integer(0, 1)',
    fzr: '@integer(1, 3)',
    type: '@integer(1, 1)',
  }))

  cwbList.push(Mock.mock({
    id: '@increment',
    no: '@id',
    cs: '@ctitle(10)',
    xh: '@ctitle(10)',
    type: '@integer(1, 1)',
    name: '@name',
    pageviews: '@integer(300, 5000)',
    ll: '@integer(300, 5000)',
    yc: '@integer(300, 5000)',
    yl: '@integer(300, 5000)',
    zs: '@integer(300, 5000)'
  }))

  dwList.push(Mock.mock({
    no: '@increment',
    name: '@name',
    type: '控制点',
    dType: '@ctitle(8)',
    sType: '@ctitle(8)',
    offset: '0',
    addr: '@integer(300, 5000)'
  }))

  qzList.push(Mock.mock({
    id: '@increment',
    no: '@id',
    cs: '@ctitle(10)',
    xh: '@ctitle(10)',
    type: '@integer(1, 1)',
    name: '@name',
    qzl: '@integer(300, 5000)',
    lj: '@integer(300, 5000)',
    kd: '@integer(300, 5000)',
    fd: '@integer(300, 5000)',
    speed: '@integer(300, 5000)'
  }))

  projectList.push(Mock.mock({
    id: '@increment',
    'name|1': ['氩气站项目设施项目', '氧气站项目设施项目', '空气站项目设施项目', '热力站项目设施项目', '丙烷站项目设施项目'],
    'file|1': ['氩气站项目审核意见书', '氧气站项目审核意见书', '空气站项目审核意见书', '热力站项目审核意见书', '丙烷站项目审核意见书'],
    progress: '@integer(0, 6)',
    creator: '@cname',
    date: '@date',
    day: 23
  }))

  consumeList.push(Mock.mock({
    date: '@date',
    amount: '@integer(100, 900)',
    amountCost: '@integer(100, 900)',
    inAmount: '@integer(100, 900)',
    inCost: '@integer(100, 900)',
    storage: '@integer(100, 900)',
    price: '@integer(100, 900)'
  }))
}

for (let i = 0; i < 8; i++) {
  codeList.push(Mock.mock({
    id: '@increment',
    name: '船体结构零件编码规则',
    date: '@date',
    pic: 'https://seopic.699pic.com/photo/50129/2295.jpg_wh1200.jpg'
  }))
}

module.exports = [{
    url: '/vue-admin-template/equ/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = equList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: equList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/cwb/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = cwbList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: cwbList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/equ/dwList',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = dwList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: dwList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/qz/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = qzList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: qzList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/project/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = projectList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: projectList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/code/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = codeList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: codeList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/consume/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query
      const pageList = consumeList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: consumeList.length,
          items: pageList
        }
      }
    }
  }
]
