const Mock = require('mockjs')

const xAxisData = ['09-22', '09-23', '09-24', '09-25', '09-26', '09-27', '09-28', '09-29', '09-30']
const elecAnalysisData = []
const gasAnalysisData = []
const guanZhongData = []

for (let i = 0; i < 9; i++) {
  elecAnalysisData.push(parseFloat(Math.random().toFixed(2)))
  gasAnalysisData.push(parseFloat(Math.random().toFixed(2)))
}

for (let i = 0; i < 5; i++) {
  guanZhongData.push(Mock.mock({
    'name|1': ['液氧', '天然气', '丙烷', '二氧化碳', '蒸汽'],
    data1: '@integer(1000, 6000)',
    data2: '@integer(1000, 6000)',
    data3: '@integer(1000, 6000)',
    data4: '@integer(1000, 6000)'
  }))
}

module.exports = [{
  url: '/vue-admin-template/data/getElecAnalysis',
  type: 'get',
  response: config => {
    const { name, type } = config.query
    return {
      code: 20000,
      data: {
        yAxisName: name,
        xAxisData: xAxisData,
        data: elecAnalysisData
      }
    }
  }
},{
  url: '/vue-admin-template/data/getGasAnalysis',
  type: 'get',
  response: config => {
    const { name, type } = config.query
    return {
      code: 20000,
      data: {
        yAxisName: name,
        xAxisData: xAxisData,
        data: gasAnalysisData
      }
    }
  }
},{
  url: '/vue-admin-template/data/guanZhong',
  type: 'get',
  response: config => {
    const { name, type } = config.query
    return {
      code: 20000,
      data: guanZhongData
    }
  }
}]
