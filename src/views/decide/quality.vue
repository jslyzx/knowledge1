<template>
  <div class="app-container">
    <div class="h-title switchText">电能质量分析</div>
    <div class="elec switchBg">
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
    <div class="h-title switchText" style="margin-top: 20px;">工业气体质量分析</div>
    <div class="elec switchBg">
      <el-tabs v-model="activeName2" @tab-click="handleClick2">
        <el-tab-pane label="天然气" name="1" />
        <el-tab-pane label="二氧化碳" name="2" />
        <el-tab-pane label="蒸汽" name="3" />
        <el-tab-pane label="液氧" name="4" />
        <el-tab-pane label="压缩空气" name="5" />
      </el-tabs>
      <line-chart :chart-data="lineChartData2" />
    </div>
  </div>
</template>
<script>
import { getElecAnalysis, getGasAnalysis } from '@/api/chart'
import LineChart from './components/LineChart'

export default {
  components: {
    LineChart
  },
  data() {
    return {
      activeName: '1',
      activeName2: '1',
      lineChartData: {},
      lineChartData2: {}
    }
  },
  created() {
    this.getElecAnalysis({
      name: '功率因数',
      type: '1'
    })
    this.getGasAnalysis({
      name: '天然气',
      type: '1'
    })
  },
  methods: {
    handleClick(tab, event) {
      this.getElecAnalysis({
        name: tab.label,
        type: tab.name
      })
    },
    handleClick2(tab, event) {
      this.getGasAnalysis({
        name: tab.label,
        type: tab.name
      })
    },
    getElecAnalysis(data) {
      getElecAnalysis(data).then(response => {
        this.lineChartData = response.data
      })
    },
    getGasAnalysis(data) {
      getGasAnalysis(data).then(response => {
        this.lineChartData2 = response.data
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

.elec {
  background-color: #fff;
  padding: 20px 10px;
}

</style>
