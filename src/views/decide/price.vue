<template>
  <div class="app-container">
    <div class="chart switchBg">
      <div class="chart-head">
        <div class="chart-title switchText">用点量趋势图</div>
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
                <th>同比</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>电量</td>
                <td>1672.58kWh</td>
                <td>7910.87</td>
                <td>3.42%</td>
              </tr>
              <tr>
                <td>氧气</td>
                <td>1209.8m3</td>
                <td>7910.87</td>
                <td>3.42%</td>
              </tr>
              <tr>
                <td>二氧化碳</td>
                <td>1209.8m3</td>
                <td>7910.87</td>
                <td>3.42%</td>
              </tr>
              <tr>
                <td>丙烷</td>
                <td>1209.8m3</td>
                <td>7910.87</td>
                <td>3.42%</td>
              </tr>
              <tr>
                <td>蒸汽</td>
                <td>1209.8m3</td>
                <td>7910.87</td>
                <td>3.42%</td>
              </tr>
              <tr>
                <td>天然气</td>
                <td>1209.8m3</td>
                <td>7910.87</td>
                <td>3.42%</td>
              </tr>
              <tr>
                <td>压缩空气</td>
                <td>1209.8m3</td>
                <td>7910.87</td>
                <td>3.42%</td>
              </tr>
              <tr>
                <td>合计金额</td>
                <td colspan="3">¥60106.02</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
  created() {},
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
          trigger: 'item'
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
          data: ['2020-09', '2020-10', '2020-11', '2020-12', '2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08']
        }],
        yAxis: [{
          type: 'value',
          name: 'kWh'
        }],
        series: [{
          type: 'bar',
          name: '总电量',
          data: this.generateRandomArray(0, 35000, 12)
        }]
      })
    },
    initChart2() {
      this.chart2 = echarts.init(this.$refs.chart2, 'macarons')
      this.chart2.setOption({
        legend: {
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '液氧',
          type: 'line',
          symbol: 'none',
          data: this.generateRandomArray(0, 1000, 12)
        }, {
          name: '二氧化碳',
          type: 'line',
          symbol: 'none',
          data: this.generateRandomArray(0, 1000, 12)
        }, {
          name: '丙烷',
          type: 'line',
          symbol: 'none',
          data: this.generateRandomArray(0, 1000, 12)
        }, {
          name: '蒸汽',
          type: 'line',
          symbol: 'none',
          data: this.generateRandomArray(0, 1000, 12)
        }, {
          name: '天然气',
          type: 'line',
          symbol: 'none',
          data: this.generateRandomArray(0, 1000, 12)
        }, {
          name: '压缩空气',
          type: 'line',
          symbol: 'none',
          data: this.generateRandomArray(0, 1000, 12)
        }]
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
        color: rgba(0,0,0,.85);
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
        color: rgba(0,0,0,.65);
        border: 1px solid #E8E8E8;
      }
    }
  }
}

.theme-dark .chart .table td{
  color: #fff;
}

</style>
