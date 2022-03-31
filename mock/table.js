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

let fzr
for (let i = 1; i < 50; i++) {
  if (i <= 3) {
    fzr = '亓广'
  } else if (i <= 6) {
    fzr = '封欢'
  } else if (i <= 16) {
    fzr = '亓广'
  } else if (i <= 28) {
    fzr = '郈才'
  } else if (i <= 41) {
    fzr = '赖政仪'
  } else {
    fzr = '亓广'
  }
  equList.push(Mock.mock({
    id: '@increment',
    no: i < 10 ? '00' + i : '0' + i,
    cs: '英格索兰',
    xh: 'JDS' + (5874 + i),
    fk: '19',
    name: i < 10 ? '空压机#0' + i : '空压机#' + i,
    isFk: '@integer(1, 1)',
    fzr: fzr,
    type: '空压机'
  }))
}



const dwNames = ['排气压力', '喷油压力', '高位加载时间', '风机频率', '排气温度', '接触器运行次数', '进气压力', '系统压力', '运行小时', '电动机电流', '通电小时', '启动次数', 'CT比率', '加载小时', '三级震动', '三级压力', '华氏三级温度', '三级震动', '二级压力', '一级震动', '华氏一级温度', '二级震动', '一级压力', '华氏二级温度', '系统压力', '油压', '油温', 'B相温度', 'C相温度', '前轴承温度', '后轴承温度', 'A相温度', '旁通阀门开度', '进气阀门开度']
const dwAddr = ['29', '24', '17', '14', '23', '18', '20', '6', '8', '10', '40', '42', '44', '46', '38', '54', '29', '24', '17', '14', '23', '18', '20', '6', '8', '10', '40', '42', '44', '46', '38', '54', '55', '56']
for (let i = 1; i < 35; i++) {
  dwList.push({
    no: i < 9 ? '00' + i : '0' + i,
    name: dwNames[i - 1],
    type: '控制点',
    dType: '输入寄存器[04]',
    sType: '波动量',
    offset: '0',
    addr: dwAddr[i - 1]
  })
}

for (let i = 1; i < 50; i++) {
  qzList.push(Mock.mock({
    id: '@increment',
    no: i < 9 ? '00' + i : '0' + i,
    cs: '上海沪工',
    xh: 'JDS' + (5874 + i),
    type: '起重机',
    name: i < 10 ? 'QD双梁桥式起重机#0' + i : 'QD双梁桥式起重机#' + i,
    qzl: '@integer(300, 5000)',
    lj: '@integer(300, 5000)',
    kd: '0.6-1.2',
    fd: '960',
    speed: '960'
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
