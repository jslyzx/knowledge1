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
    qzl: ((i >= 15 && i <= 27) || (i >= 36 && i <= 46)) ? 1000 : 800,
    lj: ((i >= 15 && i <= 27) || (i >= 36 && i <= 46)) ? 1000 : 800,
    kd: '0.6-1.2',
    fd: '960',
    speed: '960'
  }))
}

for (let i = 1; i < 51; i++) {
  cwbList.push(Mock.mock({
    id: '@increment',
    no: i < 9 ? '00' + i : '0' + i,
    cs: '昊泵',
    xh: 'JDS' + (5874 + i),
    type: '船坞泵',
    name: i < 10 ? '单螺旋泵#0' + i : (i < 14 ? '单螺旋泵#' + i : (i < 23 ? '卧式离心泵#0' + (i - 13) : '卧式离心泵#' + (i - 13))),
    pageviews: '@integer(300, 5000)',
    ll: i < 14 ? 500 : 800,
    yc: i < 14 ? 570 : 600,
    yl: '0.6-1.2',
    zs: '960'
  }))
}

projectList.push(Mock.mock({
  id: '@increment',
  name: '氩气站实施项目',
  file: '氩气站实施项目审核书',
  progress: 4,
  creator: '张洪泽',
  date: '2021/12/12',
  day: 23
}))

projectList.push(Mock.mock({
  id: '@increment',
  name: '空压站整体改造项目',
  file: '空压站实施项目审核书',
  progress: 6,
  creator: '贾珍珍',
  date: '2021/11/13',
  day: 23
}))

projectList.push(Mock.mock({
  id: '@increment',
  name: '热力站改造项目',
  file: '热力站站实施项目审核书',
  progress: 6,
  creator: '王德峰',
  date: '2021/10/16',
  day: 23
}))

projectList.push(Mock.mock({
  id: '@increment',
  name: '丙烷站改造项目',
  file: '丙烷站站实施项目审核书',
  progress: 6,
  creator: '李玲',
  date: '2021/9/17',
  day: 23
}))

projectList.push(Mock.mock({
  id: '@increment',
  name: '污水处理站改造项目',
  file: '污水处理站实施项目审核书',
  progress: 6,
  creator: '张洪泽',
  date: '2021/8/18',
  day: 23
}))

projectList.push(Mock.mock({
  id: '@increment',
  name: '氧气站改造项目',
  file: '氧气站实施项目审核书',
  progress: 6,
  creator: '贾珍珍',
  date: '2021/8/19',
  day: 23
}))

projectList.push(Mock.mock({
  id: '@increment',
  name: '自来水站改造项目',
  file: '自来水站实施项目审核书',
  progress: 6,
  creator: '王德峰',
  date: '2021/7/20',
  day: 23
}))

projectList.push(Mock.mock({
  id: '@increment',
  name: '电力运维改造项目',
  file: '电力运维项目审核书',
  progress: 5,
  creator: '李玲',
  date: '2021/5/23',
  day: 23
}))

projectList.push(Mock.mock({
  id: '@increment',
  name: '天然气站阀门更换项目',
  file: '天然气站阀门更换项目审核书',
  progress: 6,
  creator: '赵东鸥',
  date: '2021/4/24',
  day: 23
}))

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
