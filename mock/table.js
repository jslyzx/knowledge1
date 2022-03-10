const Mock = require('mockjs')

const equList = []
const count = 100

for (let i = 0; i < count; i++) {
  equList.push(Mock.mock({
    no: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    name: '@name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
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
}]
