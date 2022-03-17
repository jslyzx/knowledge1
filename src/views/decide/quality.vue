<template>
  <div class="app-container">
    <div class="h-title">电能质量分析</div>
    <div class="elec">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="功率因数" name="1" />
      <el-tab-pane label="频率" name="2" />
      <el-tab-pane label="三相电压不平衡度" name="3" />
      <el-tab-pane label="三相电流不平衡度" name="4" />
      <el-tab-pane label="无功功率" name="5" />
      <el-tab-pane label="电压总谐波" name="6" />
      <el-tab-pane label="电流总谐波" name="7" />
      <el-tab-pane label="剩余电流" name="8" />
    </el-tabs>
    <line-chart :chart-data="lineChartData" />
    </div>
    
  </div>
</template>
<script>
import echarts from 'echarts'
import { getElecAnalysis } from '@/api/chart'
import LineChart from './components/LineChart'
require('echarts/theme/macarons') // echarts theme

export default {
  components: {
    LineChart
  },
  data() {
    return {
      depId: '',
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      activeName: '1',
      lineChartData: {}
    }
  },
  created() {
    this.getElecAnalysis({
      name: '功率因数',
      type: '1'
    })
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initChart1()
    //   this.initChart2()
    //   this.initChart3()
    //   this.initChart4()
    // })
  },
  methods: {
    handleClick(tab, event) {
      this.getElecAnalysis({
        name: tab.label,
        type: tab.name
      })
    },
    getElecAnalysis(data){
      getElecAnalysis(data).then(response => {
        this.lineChartData = response.data
      })
    },
    initChart1() {
      this.chart1 = echarts.init(this.$refs.chart1, 'macarons')
      this.chart1.setOption({
        legend: {},
        xAxis: {
          type: 'category',
          data: ['06-08', '07-08', '08-08', '09-08', '10-08', '11-08', '12-08']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '新增工单',
          data: [10, 8, 15, 20, 25, 30, 45],
          type: 'line',
          symbol: 'none'
        }, {
          name: '完成工单',
          data: [8, 8, 9, 12, 19, 27, 39],
          symbol: 'none',
          type: 'line'
        }]
      })
    },
    initChart2() {
      this.chart2 = echarts.init(this.$refs.chart2, 'macarons')
      this.chart2.setOption({
        legend: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['保障部', '生产部', '涂装部']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '当前未完成',
          data: [120, 220, 320],
          type: 'bar',
          barWidth: 20
        }, {
          name: '已完成',
          data: [280, 210, 150],
          type: 'bar',
          barWidth: 20
        }]
      })
    },
    initChart3() {
      this.chart3 = echarts.init(this.$refs.chart3, 'macarons')
      this.chart3.setOption({
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
            { value: 55, name: '工单类型' },
            { value: 43, name: '产品类型' },
            { value: 33, name: '服务类型' },
            { value: 33, name: '服务内容' }
          ]
        }]
      })
    },
    initChart4() {
      this.chart4 = echarts.init(this.$refs.chart4, 'macarons')
      this.chart4.setOption({
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
          radius: '50%',
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 55, name: '满意' },
            { value: 43, name: '一般' },
            { value: 33, name: '不满意' }
          ]
        }]
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.h-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin: 0 0 20px;
}

.elec{
  background-color: #fff;
  padding: 20px 10px;
}
</style>
