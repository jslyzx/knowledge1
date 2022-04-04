<template>
  <div class="app-container">
    <div class="top switchBg">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-row class="head">
            <el-col :span="6">
              <div class="title switchText">当前产量单耗</div>
            </el-col>
            <el-col :span="4">
              <div class="tongji switchText" :class="{active: type === 1}" @click="changeType(1)">按日统计</div>
            </el-col>
            <el-col :span="4">
              <div class="tongji switchText" :class="{active: type === 2}" @click="changeType(2)">按月统计</div>
            </el-col>
          </el-row>
          <table cellspacing="0" class="table">
            <tr>
              <td>万元产值外付动能（元/万元）</td>
              <td>{{ outputValue }}</td>
            </tr>
            <tr>
              <td>吨投钢量动能（元/t）</td>
              <td>{{ steelQty }}</td>
            </tr>
            <tr>
              <td>修正总吨动能（元/t）</td>
              <td>{{ totalQty }}</td>
            </tr>
            <tr>
              <td>液氧单耗（t/Nm3）</td>
              <td>{{ summary.yeyangQty }}</td>
            </tr>
            <tr>
              <td>二氧化碳单耗（t/Nm3）</td>
              <td>{{ summary.coQty }}</td>
            </tr>
            <tr>
              <td>天然气单耗（t/Nm3）</td>
              <td>{{ summary.tianranqiQty }}</td>
            </tr>
            <tr>
              <td>丙烷单耗（t/Nm3）</td>
              <td>{{ summary.bianwanQty }}</td>
            </tr>
            <tr>
              <td>蒸汽单耗（t/Nm3）</td>
              <td>{{ summary.zhenqiQty }}</td>
            </tr>
          </table>
        </el-col>
        <el-col :span="16">
          <el-row class="head">
            <el-col :span="6">
              <div class="title switchText">关重参数</div>
            </el-col>
          </el-row>
          <el-table :data="list" element-loading-text="Loading" border fit style="margin-top: 10px;">
            <el-table-column label="气体类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="平均用气量(m3/h)" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.data1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="累计流量(m3)" align="center">
              <template slot-scope="scope">
                {{ scope.row.data2 }}
              </template>
            </el-table-column>
            <el-table-column label="管道平均压力(MPa)" align="center">
              <template slot-scope="scope">
                {{ scope.row.data3 }}
              </template>
            </el-table-column>
            <el-table-column label="储罐平均压力（MPa）" align="center">
              <template slot-scope="scope">
                {{ scope.row.data4 }}
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="middle switchBg">
      <div class="title switchText">用气构成</div>
      <el-row class="switch">
        <el-col :span="2">
          <div class="type switchText" :class="{active: gasType === 1}" @click="changeGasType(1)">按日统计</div>
        </el-col>
        <el-col :span="2">
          <div class="type switchText" :class="{active: gasType === 2}" @click="changeGasType(2)">按月统计</div>
        </el-col>
      </el-row>
      <div ref="chart1" class="chart" />
    </div>
    <div class="bottom switchBg">
      <div class="title switchText">产量能耗统计</div>
      <div ref="chart2" class="chart" />
    </div>
  </div>
</template>
<script>
import { getGuanZhongData } from '@/api/chart'
import { queryEquipmentSetting, queryHoursTotalQty, queryDayTotalQty } from '@/api/equipment'
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
      isDark: localStorage.getItem('theme') === 'theme-dark',
      summary: {},
      hours: {},
      monthlist: {},
      chart1Data: {},
      chart2Data: {}
    }
  },
  computed: {
    outputValue() {
      if (Object.keys(this.summary).length === 0) return ''
      if (this.type === 2) {
        return this.summary.monthOutputValue
      } else {
        return this.summary.dayOutputValue
      }
    },
    steelQty() {
      if (Object.keys(this.summary).length === 0) return ''
      if (this.type === 2) {
        return this.summary.monthSteelQty
      } else {
        return this.summary.daySteelQty
      }
    },
    totalQty() {
      if (Object.keys(this.summary).length === 0) return ''
      if (this.type === 2) {
        return this.summary.monthTotalQty
      } else {
        return this.summary.dayTotalQty
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.chart1 = echarts.init(this.$refs.chart1, 'macarons')
      this.chart2 = echarts.init(this.$refs.chart2, 'macarons')

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
      if (t === 1) {
        this.initChart1()
      } else {
        this.initChart1_2()
      }
    },
    fetchData() {
      queryHoursTotalQty().then(response => {
        this.hours = response.data.dateList
        this.chart1Data = response.data.hoursMap
        this.initChart1()
      })
      queryDayTotalQty().then(response => {
        this.monthlist = response.data.monthlist
        this.chart2Data = response.data
        this.initChart2()
      })
      getGuanZhongData().then(response => {
        this.list = response.data
      })
      queryEquipmentSetting().then(response => {
        this.summary = response.data[0]
      })
    },
    initChart1() {
      this.chart1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            let tip = "";
            if (params != null && params.length > 0) {
              for (let i = 0; i < params.length; i++) {
                tip += params[i].seriesName + ":" + params[i].value.toFixed(2) + "</br>"
              }
            }
            return tip
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          }
        },
        xAxis: {
          type: 'category',
          data: this.hours
        },
        yAxis: {
          type: 'value',
          name: 't/m3'
        },
        series: [{
          name: '液氧',
          data: this.chart1Data['液氧'],
          type: 'line',
          smooth: true,
          symbol: 'none'
        }, {
          name: '天然气',
          data: this.chart1Data['天然气'],
          type: 'line',
          smooth: true,
          symbol: 'none'
        }, {
          name: '丙烷',
          data: this.chart1Data['丙烷'],
          type: 'line',
          smooth: true,
          symbol: 'none'
        }, {
          name: '二氧化碳',
          data: this.chart1Data['二氧化碳'],
          type: 'line',
          smooth: true,
          symbol: 'none'
        }, {
          name: '蒸汽',
          data: this.chart1Data['蒸汽'],
          type: 'line',
          smooth: true,
          symbol: 'none'
        }]
      })
    },
    initChart1_2() {
      this.chart1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            let tip = "";
            if (params != null && params.length > 0) {
              for (let i = 0; i < params.length; i++) {
                tip += params[i].seriesName + ":" + params[i].value.toFixed(2) + "</br>"
              }
            }
            return tip
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          }
        },
        xAxis: {
          type: 'category',
          data: this.monthlist
        },
        yAxis: {
          type: 'value',
          name: 't/m3'
        },
        series: [{
          name: '液氧',
          data: this.chart2Data['液氧'],
          type: 'bar'
        }, {
          name: '天然气',
          data: this.chart2Data['天然气'],
          type: 'bar'
        }, {
          name: '丙烷',
          data: this.chart2Data['丙烷'],
          type: 'bar'
        }, {
          name: '二氧化碳',
          data: this.chart2Data['二氧化碳'],
          type: 'bar'
        }, {
          name: '蒸汽',
          data: this.chart2Data['蒸汽'],
          type: 'bar'
        }]
      })
    },
    initChart2() {
      this.chart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: function(params) {
            let tip = "";
            if (params != null && params.length > 0) {
              for (let i = 0; i < params.length; i++) {
                tip += params[i].seriesName + ":" + params[i].value.toFixed(2) + "</br>"
              }
            }
            return tip
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          }
        },
        xAxis: [{
          type: 'category',
          data: this.monthlist
        }],
        yAxis: [{
            type: 'value',
            name: 't/m3'
          },
          {
            type: 'value',
            name: 't'
          }
        ],
        series: [{
            name: '产量',
            type: 'bar',
            data: this.generateRandomArray(345, 20, this.monthlist.length)
          },
          {
            name: '单耗',
            type: 'line',
            yAxisIndex: 1,
            data: this.generateRandomArray(0.5, 20, this.monthlist.length),
            symbol: 'none'
          }
        ]
      })
    },
    generateRandomArray(level, percent, length) {
      var num = 0
      var ret = []
      const n = percent * level * 4 / 100
      const min = level * (100 - percent) / 100
      for (var i = 0; i < length; i++) {
        num = Math.random() * n + min
        ret.push(num)
      }
      return ret
    }
  }
}

</script>
<style lang="scss" scoped>
.top {
  background-color: #fff;
  padding: 18px 20px;

  .title {
    font-size: 14px;
    font-weight: bold;
    color: #494949;
    line-height: 20px;
  }

  .tongji {
    font-size: 14px;
    font-weight: 400;
    color: #494949;
    line-height: 20px;
    cursor: pointer;

    &.active {
      color: #1A90FE !important;
    }
  }

  .table {
    width: 100%;
    margin-top: 10px;

    td {
      border: 1px solid #F0F0F0;
      font-size: 12px;
      line-height: 32px;
      height: 32px;
      text-align: left;
      padding-left: 14px;
      width: 50%;
    }
  }
}

.middle {
  background-color: #fff;
  margin-top: 10px;

  .title {
    font-size: 14px;
    font-weight: bold;
    color: #494949;
    line-height: 20px;
    padding-top: 18px;
    padding-left: 30px;
  }

  .switch {
    margin: 10px 0 0 30px;

    .type {
      font-size: 14px;
      font-weight: 400;
      color: #494949;
      line-height: 20px;
      cursor: pointer;

      &.active {
        color: #1A90FE !important;
      }
    }
  }

  .chart {
    height: 350px;
  }
}

.bottom {
  background-color: #fff;
  margin-top: 10px;

  .title {
    font-size: 14px;
    font-weight: bold;
    color: #494949;
    line-height: 20px;
    padding-top: 18px;
    padding-left: 30px;
  }

  .chart {
    height: 350px;
  }
}

</style>
