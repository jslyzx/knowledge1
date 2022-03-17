const Mock = require('mockjs')

const xxList = []
const dxList = []
const xAxisData = ['09-22', '09-23', '09-24', '09-25', '09-26', '09-27', '09-28', '09-29', '09-30']
const elecAnalysisData = []

for (let i = 0; i < 9; i++) {
  elecAnalysisData.push(parseFloat(Math.random().toFixed(2)))
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
}]
