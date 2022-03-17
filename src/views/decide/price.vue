<template>
  <div class="app-container">
    <div class="chart">
      <div class="chart-head">
        <div class="chart-title">用点量趋势图</div>
      </div>
    </div>
    <div class="chart">
      <div class="chart-head">
        <div class="chart-title">工业气体用量趋势图</div>
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
      chart2: null
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
          top: 'middle',
          left: 'right',
          orient: 'verticalAlign'
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 55, name: '用电类型报警' },
            { value: 43, name: '空压类型报警' },
            { value: 33, name: '工业气体报警' },
            { value: 33, name: '其它类型报警' }
          ]
        }]
      })
    },
    initChart2() {
      this.chart2 = echarts.init(this.$refs.chart2, 'macarons')
      this.chart2.setOption({
        xAxis: [{
          type: 'category',
          data: ['07-08', '07-09', '07-10', '07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17', '07-18']
        }],
        yAxis: [{
            type: 'value',
            name: '报警数',
            min: 0,
            max: 2000,
            interval: 500
          },
          {
            type: 'value',
            name: '同比上涨',
            min: 0,
            max: 100,
            interval: 25,
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [{
            name: '报警数',
            type: 'bar',
            data: this.generateRandomArray(0, 2000, 11)
          },
          {
            name: '同比上涨',
            type: 'line',
            data: this.generateRandomArray(0, 100, 11),
            symbol: 'none'
          }
        ]
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


</style>
