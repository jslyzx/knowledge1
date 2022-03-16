<template>
  <div class="app-container">
    <div class="h-title">电能质量分析</div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="功率因数" name="1">
        
      </el-tab-pane>
      <el-tab-pane label="频率" name="2">
        
      </el-tab-pane>
      <el-tab-pane label="三相电压不平衡度" name="3">
        
      </el-tab-pane>
      <el-tab-pane label="三相电流不平衡度" name="4">
        
      </el-tab-pane>
      <el-tab-pane label="无功功率" name="5">
        
      </el-tab-pane>
      <el-tab-pane label="电压总谐波" name="6">
        
      </el-tab-pane>
      <el-tab-pane label="电流总谐波" name="7">
        
      </el-tab-pane>
      <el-tab-pane label="剩余电流" name="8">
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  data() {
    return {
      depId: '',
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      activeName: '1'
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initChart1()
      this.initChart2()
      this.initChart3()
      this.initChart4()
    })
  },
  methods: {
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

.form {
  background-color: #fff;
  height: 80px;
  margin-bottom: 16px;

  .el-col {
    margin-top: 20px;
  }
}

.data {
  background-color: #fff;
  padding: 20px 20px 8px 20px;

  &-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    margin-bottom: 10px;
  }

  .item {
    border-right: 1px solid rgba(0, 0, 0, .06);

    &:last-child {
      border-right: none;
    }

    &:not(:first-child) {
      padding-left: 20px;
    }

    &-t {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
    }

    &-c {
      font-size: 30px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 38px;
    }
  }

  .compare {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;

    span {
      color: #F5222D;
    }
  }
}

.middle {
  margin-top: 16px;

  .trend {
    height: 396px;
    background-color: #fff;

    .title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      padding: 20px 0 0 20px;
    }

    .con {
      height: calc(100% - 44px);
    }
  }

  .list {
    height: 396px;
    background-color: #fff;

    .title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      padding: 20px 0 0 20px;
    }

    .con {
      height: calc(100% - 44px);
      padding: 10px 20px;

      .table {
        width: 100%;
        height: 100%;

        .thead {
          height: 32px;
          background: #D8D8D8;
          opacity: 0.37;

          .th {
            text-align: left;
            padding-left: 17px;
            line-height: 32px;
          }
        }

        .tbody {
          height: calc(100% - 32px);
          overflow: auto;

          .tr {
            line-height: 22px;
            height: 22px;
            margin: 16px 0;

            .td {
              text-align: left;
              padding-left: 17px;
              font-size: 12px;
              font-weight: 400;
              color: #494949;
              line-height: 26px;
            }
          }
        }
      }
    }
  }
}

.charts {
  margin-top: 16px;

  .chart {
    background-color: #fff;
    height: 355px;

    &-title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      padding: 20px 0 0 20px;
    }

    &-con {
      height: calc(100% - 44px);
    }
  }
}

</style>
