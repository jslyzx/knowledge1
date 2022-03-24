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
              <td>8205.48</td>
            </tr>
            <tr>
              <td>吨投钢量动能（元/t）</td>
              <td>8205.48</td>
            </tr>
            <tr>
              <td>修正总吨动能（元/t）</td>
              <td>8205.48</td>
            </tr>
            <tr>
              <td>液氧单耗（t/Nm3）</td>
              <td>8205.48</td>
            </tr>
            <tr>
              <td>二氧化碳单耗（t/Nm3）</td>
              <td>8205.48</td>
            </tr>
            <tr>
              <td>天然气单耗（t/Nm3）</td>
              <td>8205.48</td>
            </tr>
            <tr>
              <td>丙烷单耗（t/Nm3）</td>
              <td>8205.48</td>
            </tr>
            <tr>
              <td>蒸汽单耗（t/Nm3）</td>
              <td>8205.48</td>
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
            <el-table-column label="气体类型" width="130" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="平均用气量(m3/h)" width="180" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.data1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="累计流量(m3)" width="180" align="center">
              <template slot-scope="scope">
                {{ scope.row.data2 }}
              </template>
            </el-table-column>
            <el-table-column label="管道平均压力(MPa)" width="180" align="center">
              <template slot-scope="scope">
                {{ scope.row.data3 }}
              </template>
            </el-table-column>
            <el-table-column label="储罐平均压力（MPa）" width="180" align="center">
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
      <div ref="chart1" class="chart"></div>
    </div>
    <div class="bottom switchBg">
      <div class="title switchText">产量能耗统计</div>
      <div ref="chart2" class="chart"></div>
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
      isDark: localStorage.getItem('theme') === 'theme-dark'
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart1()
      this.initChart2()
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
        legend: {
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          }
        },
        xAxis: {
          type: 'category',
          data: ['09-01', '09-02', '09-03', '09-04', '09-05', '09-06', '09-07', '09-08', '09-09', '09-10']
        },
        yAxis: {
          type: 'value',
          name: 't/m3',
          min: 0,
          max: 600,
          interval: 100
        },
        series: [{
          name: '液氧',
          type: 'bar',
          data: this.generateRandomArray(0, 600, 10)
        }, {
          name: '天然气',
          type: 'bar',
          data: this.generateRandomArray(0, 600, 10)
        }, {
          name: '丙烷',
          type: 'bar',
          data: this.generateRandomArray(0, 600, 10)
        }, {
          name: '二氧化碳',
          type: 'bar',
          data: this.generateRandomArray(0, 600, 10)
        }, {
          name: '蒸汽',
          type: 'bar',
          data: this.generateRandomArray(0, 600, 10)
        }]
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
        legend: {
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          }
        },
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
            name: '产量',
            type: 'bar',
            data: this.generateRandomArray(0, 1000, 10)
          },
          {
            name: '单耗',
            type: 'line',
            yAxisIndex: 1,
            data: this.generateRandomArray(100, 300, 10),
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
