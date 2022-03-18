<template>
  <div class="app-container">
    <div class="chart">
      <div class="chart-title">产量能耗统计</div>
      <div ref="chart1" class="chart-con" />
    </div>
    <div class="chart" style="padding-bottom: 20px;">
      <el-menu :default-active="activeIndex1" mode="horizontal" @select="handleSelect">
        <el-menu-item index="液氧">液氧</el-menu-item>
        <el-menu-item index="二氧化碳">二氧化碳</el-menu-item>
        <el-menu-item index="天然气">天然气</el-menu-item>
        <el-menu-item index="丙烷">丙烷</el-menu-item>
        <el-menu-item index="蒸汽">蒸汽</el-menu-item>
      </el-menu>
      <div class="chart-title">瞬时流量曲线</div>
      <div ref="chart2" class="chart-con" />
      <div class="tip">
        <div class="tip-title">流量总体情况</div>
        <div class="tip-info">
          •本月平均瞬时流量为4343m³/h，最高瞬时流量值出现在26日为1231m³/h，最低瞬时流量出现在22日为3421m³/h.
        </div>
        <div class="tip-info">
          •本月瞬时流量波动率为12.322，上月瞬时流量波动率32.123环比下降，12.34%。
        </div>
      </div>
    </div>
    <div class="chart" style="padding-bottom: 20px;">
      <el-menu :default-active="activeIndex2" mode="horizontal" @select="handleSelect">
        <el-menu-item index="液氧">液氧</el-menu-item>
        <el-menu-item index="二氧化碳">二氧化碳</el-menu-item>
        <el-menu-item index="天然气">天然气</el-menu-item>
        <el-menu-item index="丙烷">丙烷</el-menu-item>
        <el-menu-item index="蒸汽">蒸汽</el-menu-item>
      </el-menu>
      <div class="chart-title">压力曲线</div>
      <div ref="chart2" class="chart-con" />
      <div class="tip">
        <div class="tip-title">压力总体情况</div>
        <div class="tip-info">
          •本月平均压力为6.23bar，最高压力值出现在24日为7.42bar，最低压力出现在8日为2.43bar。
        </div>
        <div class="tip-info">
          •本月压力波动率为12.322%，上月压力波动率32.123%环比下降，12.34%。
        </div>
      </div>
    </div>
    <div class="chart">
      <div class="chart-title">报警分布统计</div>
      <el-row>
        <el-col :span="12">
          <div ref="chart4" class="chart-pie" />
          <div class="warn">天然气相关报警产生较多次报警，需要密切关注该类型的用气情况。</div>
        </el-col>
        <el-col :span="12">
          <div ref="chart5" class="bar" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getGuanZhongData } from '@/api/chart'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  data() {
    return {
      type: 1, // 1按日，2按月
      list: null,
      gasType: 1, // 1按日，2按月
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      chart5: null,
      activeIndex1: '液氧',
      activeIndex2: '液氧'
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart1()
      this.initChart2()
      this.initChart3()
      this.initChart4()
      this.initChart5()
    })
  },
  methods: {
    changeType(t) {
      if (t === this.type) return
      this.type = t
    },
    changeGasType(t) {
      if (t === this.gasType) return
      this.gasType = t
    },
    handleSelect() {

    },
    fetchData() {
      getGuanZhongData().then(response => {
        this.list = response.data
      })
    },
    initChart1() {
      this.chart1 = echarts.init(this.$refs.chart1, 'macarons')
      this.chart1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {},
        xAxis: {
          type: 'category',
          data: ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10']
        },
        yAxis: [{
            type: 'value',
            name: 't',
            min: 0,
            max: 1000,
            interval: 250
          },
          {
            type: 'value',
            name: 'm3',
            min: 0,
            max: 1000,
            interval: 250
          }
        ],
        series: [{
            name: '本月产量',
            type: 'bar',
            data: this.generateRandomArray(0, 1000, 10)
          }, {
            name: '上月产量',
            type: 'bar',
            data: this.generateRandomArray(0, 1000, 10)
          },
          {
            name: '本月用气量',
            type: 'line',
            yAxisIndex: 1,
            data: this.generateRandomArray(0, 1000, 10),
            symbol: 'none'
          },
          {
            name: '上月用气量',
            type: 'line',
            yAxisIndex: 1,
            data: this.generateRandomArray(0, 1000, 10),
            symbol: 'none'
          }
        ]
      })
    },
    initChart2() {
      this.chart2 = echarts.init(this.$refs.chart2, 'macarons')
      this.chart2.setOption({
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {},
        xAxis: [{
          type: 'category',
          data: ['09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07', '09-08', '09-09', '09-10']
        }],
        yAxis: [{
            type: 'value',
            name: 't/m3',
            min: 0,
            max: 1000,
            interval: 250
          },
          {
            type: 'value',
            name: 't'
          }
        ],
        series: [{
            name: '本月产量',
            type: 'bar',
            data: this.generateRandomArray(0, 1000, 10)
          }, {
            name: '上月产量',
            type: 'bar',
            data: this.generateRandomArray(0, 1000, 10)
          },
          {
            name: '本月用气量',
            type: 'line',
            yAxisIndex: 1,
            data: this.generateRandomArray(0, 1000, 10),
            symbol: 'none'
          },
          {
            name: '上月用气量',
            type: 'line',
            yAxisIndex: 1,
            data: this.generateRandomArray(0, 1000, 10),
            symbol: 'none'
          }
        ]
      })
    },
    initChart3() {

    },
    initChart4() {
      this.chart4 = echarts.init(this.$refs.chart4, 'macarons')
      this.chart4.setOption({
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'bottom'
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 815, name: '液氧' },
            { value: 924, name: '天然气' },
            { value: 691, name: '丙烷' },
            { value: 468, name: '二氧化碳' },
            { value: 679, name: '蒸汽' }
          ]
        }]
      })
    },
    initChart5() {
      this.chart5 = echarts.init(this.$refs.chart5, 'macarons')
      this.chart5.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['低级', '一般', '中级', '中高', '高级', '极高']
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 120,
          interval: 30
        },
        series: [{
          type: 'bar',
          data: this.generateRandomArray(0, 120, 6)
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
  margin-bottom: 10px;

  &-title {
    font-size: 14px;
    font-weight: bold;
    color: #494949;
    line-height: 20px;
    padding: 18px 20px 0;
  }

  .tip {
    margin: 10px 0 0 30px;
    width: 800px;

    &-title {
      font-size: 14px;
      font-weight: 500;
      color: #494949;
      line-height: 20px;
    }

    &-info {
      margin-left: 30px;
      height: 33px;
      line-height: 33px;
      background: #F2F2F2;
      border-radius: 17px;
      display: inline-block;
      color: #494949;
      font-size: 14px;
      padding: 0 10px;
      margin-top: 10px;
    }
  }

  &-con {
    height: 400px;
  }

  &-pie {
    height: 300px;
  }

  .warn {
    font-size: 14px;
    font-weight: 500;
    color: #494949;
    line-height: 20px;
    text-align: center;
    margin: 10px 0;
  }

  .bar {
    height: 340px;
  }
}

</style>
