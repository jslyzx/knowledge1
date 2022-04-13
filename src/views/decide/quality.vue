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
    this.getElecAnalysis('功率因数')
    this.getGasAnalysis('天然气')
  },
  methods: {
    handleClick(tab, event) {
      this.getElecAnalysis(tab.label)
    },
    handleClick2(tab, event) {
      this.getGasAnalysis(tab.label)
    },
    getElecAnalysis(name) {
      let data, color
      if (name === '功率因数') {
        data = this.generateRandomFloatArray(0.8, 1, 7)
          color = '#C95FF2'
      } else if (name === '频率') {
        data = this.generateRandomFloatArray(49, 51, 7)
        color = '#FF7F00'
      } else if (name === '三相电压不平衡度') {
        data = this.generateRandomFloatArray(0, 0.5, 7)
        color = '#00ADFF'
      } else if (name === '三相电流不平衡度') {
        data = this.generateRandomFloatArray(0, 0.5, 7)
        color = '#61E493'
      } else if (name === '无功功率') {
        data = this.generateRandomFloatArray(130, 200, 7)
        color = '#9382FF'
      } else if (name === '电压总谐波') {
        data = this.generateRandomFloatArray(0, 0.5, 7)
        color = 'blue'
      } else if (name === '电流总谐波') {
        data = this.generateRandomFloatArray(0, 0.5, 7)
        color = 'green'
      } else if (name === '剩余电流') {
        data = this.generateRandomFloatArray(300, 310, 7)
        color = 'yellow'
      }
      this.lineChartData = {
        yAxisName: name,
        xAxisData: this.getLastDayArray(7, false),
        data: data,
        color: color
      }
    },
    getGasAnalysis(name) {
      let color
      if (name === '天然气') {
          color = '#C95FF2'
      } else if (name === '二氧化碳') {
        color = '#FF7F00'
      } else if (name === '蒸汽') {
        color = '#00ADFF'
      } else if (name === '液氧') {
        color = '#61E493'
      } else if (name === '压缩空气') {
        color = '#9382FF'
      }
      this.lineChartData2 = {
        yAxisName: name,
        xAxisData: this.getLastDayArray(7, false),
        data: this.generateRandomFloatArray(0.3, 0.8, 7),
        color: color
      }
    },
    generateRandomFloatArray(a, b, length) {
      var c = b - a
      var num = 0
      var ret = []
      for (let i = 0; i < length; i++) {
        num = Math.random() * c + a
        ret.push(num.toFixed(2))
      }
      return ret
    },
    getLastDayArray(len, isContainCurrent) {
      var result = []
      var now = new Date()
      let start, end
      if (isContainCurrent) {
        start = 0
        end = len
      } else {
        start = 1
        end = len + 1
      }
      let currentDay, newMonth, newDay
      const oneDay = 24 * 60 * 60 * 1000
      for (; start < end; start++) {
        currentDay = new Date(now - oneDay * start)
        newMonth = currentDay.getMonth() + 1
        newMonth = newMonth.toString().padStart(2, "0")
        newDay = currentDay.getDate()
        newDay = newDay.toString().padStart(2, "0")
        result.push(`${newMonth}-${newDay}`)
      }
      return result.reverse()
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
