<template>
  <div class="app-container">
    <div class="chart switchBg">
      <div class="chart-head">
        <div class="chart-title switchText">用电量趋势图</div>
      </div>
      <div ref="chart1" class="chart-con"></div>
    </div>
    <div class="chart switchBg">
      <div class="chart-head">
        <div class="chart-title switchText">工业气体用量趋势图</div>
      </div>
      <div ref="chart2" class="chart-con"></div>
    </div>
    <div class="chart switchBg">
      <div class="chart-head">
        <div class="chart-title switchText">用能成本分摊情况</div>
        <div class="table">
          <table cellspacing="0">
            <thead>
              <tr>
                <th>品类</th>
                <th>用量</th>
                <th>金额</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>蒸汽</td>
                <td>{{tableData.zqQtys | numFilter}}</td>
                <td>{{tableData.zqQtyPrice | numFilter}}</td>
              </tr>
              <tr>
                <td>丙烷</td>
                <td>{{tableData.bwQtys | numFilter}}</td>
                <td>{{tableData.bwQtysPrice | numFilter}}</td>
              </tr>
              <tr>
                <td>天然气</td>
                <td>{{tableData.trQtys | numFilter}}</td>
                <td>{{tableData.trQtysPrice | numFilter}}</td>
              </tr>
              <tr>
                <td>二氧化碳</td>
                <td>{{tableData.eryangQtys | numFilter}}</td>
                <td>{{tableData.eryangQtyPrice | numFilter}}</td>
              </tr>
              <tr>
                <td>液氧</td>
                <td>{{tableData.yeyanQtys | numFilter}}</td>
                <td>{{tableData.yeyanQtyPrice | numFilter}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryDayTotalQty, queryMonthQty } from '@/api/equipment'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  data() {
    return {
      date: '',
      chart1: null,
      chart2: null,
      tableData: {

      },
      theme: localStorage.getItem('theme') === 'theme-dark' ? 'aa' : 'macarons',
      isDark: localStorage.getItem('theme') === 'theme-dark'
    }
  },
  filters: {
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "";
      }
      return realVal;
    },
  },
  created() {
    queryMonthQty().then(response => {
      this.tableData = response.data
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart1()
      this.initChart2()
    })
  },
  methods: {
    initChart1() {
      this.chart1 = echarts.init(this.$refs.chart1, 'macarons')
      this.chart1.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let tip = "";
            if (params != null && params.length > 0) {
              tip = params[0].marker + params[0].axisValueLabel + '  ' + params[0].data.toFixed(2)
            }
            return tip
          }
        },
        legend: {
          right: 50,
          top: 10,
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          }
        },
        xAxis: [{
          type: 'category',
          data: this.getCurrentMonthArray(12, false)
        }],
        yAxis: [{
          type: 'value',
          name: 'kWh'
        }],
        series: [{
          type: 'bar',
          name: '总电量',
          data: this.getRandomArray(15000, 20, 12)
        }]
      })
    },
    initChart2() {
      this.chart2 = echarts.init(this.$refs.chart2, 'macarons')
      queryDayTotalQty().then(response => {
        let monthlist = response.data.monthlist
        let data = response.data
        this.chart2.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(params) {
              let tip = "";
              if (params != null && params.length > 0) {
                for (let i = 0; i < params.length; i++) {
                  tip += params[i].marker + params[i].seriesName + ":" + params[i].value.toFixed(2) + "</br>"
                }
              }
              return tip
            }
          },
          legend: {
            textStyle: {
              color: this.isDark ? '#fff' : '#000'
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: monthlist
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '液氧',
            type: 'line',
            symbol: 'none',
            data: data['液氧']
          }, {
            name: '二氧化碳',
            type: 'line',
            symbol: 'none',
            data: data['二氧化碳']
          }, {
            name: '丙烷',
            type: 'line',
            symbol: 'none',
            data: data['丙烷']
          }, {
            name: '蒸汽',
            type: 'line',
            symbol: 'none',
            data: data['蒸汽']
          }, {
            name: '天然气',
            type: 'line',
            symbol: 'none',
            data: data['天然气']
          }]
        })
      })
    },
    generateRandomArray(a, b, length) {
      var num = 0
      var ret = []
      for (var i = 0; i < length; i++) {
        num = parseInt(Math.random() * (b - a + 1) + a, 10)
        ret.push(num)
      }
      return ret
    },
    getRandomArray(level, percent, length) {
      var num = 0
      var ret = []
      const n = percent * level * 4 / 100
      const min = level * (100 - percent) / 100
      for (var i = 0; i < length; i++) {
        num = Math.random() * n + min
        ret.push(num)
      }
      return ret
    },
    getCurrentMonthArray(len, isContainCurrent) {
      var result = []
      var now = new Date()
      var year = now.getFullYear() //得到年份
      var month = now.getMonth() //得到月份
      if (isContainCurrent) {
        len--
        let _month = month + 1
        _month = _month.toString().padStart(2, "0")
        result.push(`${year}-${_month}`)
      }
      let newYear, newMonth, newStr
      for (let i = 0; i < len; i++) {
        month -= 1
        now.setMonth(month)
        newYear = now.getFullYear()
        newMonth = now.getMonth() + 1
        newMonth = newMonth.toString().padStart(2, "0")
        newStr = `${newYear}-${newMonth}`
        result.push(newStr)
        if (month === -1) {
          month = 11
        }
      }
      return result.reverse()
    }
  }
}

</script>
<style lang="scss" scoped>
.chart {
  background-color: #fff;

  &-title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    padding: 15px 9px;
    border-bottom: 1px solid #E8E8E8;
  }

  &-con {
    height: 420px;
  }

  &~.chart {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .table {
    padding: 10px 20px;

    table {
      width: 100%;

      th {
        width: 25%;
        text-align: left;
        padding-left: 10px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: rgba(0, 0, 0, .85);
        font-weight: bold;
        border: 1px solid #E8E8E8;
        background: #FAFAFA;
      }

      td {
        width: 25%;
        text-align: left;
        padding-left: 10px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        border: 1px solid #E8E8E8;
      }
    }
  }
}

.theme-dark .chart .table td {
  color: #fff;
}

</style>
