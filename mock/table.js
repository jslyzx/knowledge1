const Mock = require('mockjs')

const equList = []
const cwbList = []
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
  }
]
