<template>
  <div class="app-container">
    <div class="chart">
      <div class="chart-head">
        <div class="chart-title">用点量趋势图</div>
      </div>
      <div ref="chart1" class="chart-con"></div>
    </div>
    <div class="chart">
      <div class="chart-head">
        <div class="chart-title">工业气体用量趋势图</div>
      </div>
      <div ref="chart2" class="chart-con"></div>
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
          right: 50,
          top: 10
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
          },{
            name: '二氧化碳',
            type: 'line',
            symbol: 'none',
            data: this.generateRandomArray(0, 1000, 12)
          },{
            name: '丙烷',
            type: 'line',
            symbol: 'none',
            data: this.generateRandomArray(0, 1000, 12)
          },{
            name: '蒸汽',
            type: 'line',
            symbol: 'none',
            data: this.generateRandomArray(0, 1000, 12)
          },{
            name: '天然气',
            type: 'line',
            symbol: 'none',
            data: this.generateRandomArray(0, 1000, 12)
          },{
            name: '压缩空气',
            type: 'line',
            symbol: 'none',
            data: this.generateRandomArray(0, 1000, 12)
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
}

</style>
