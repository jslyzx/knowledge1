<template>
  <div class="app-container">
    <div class="h-title">工单人效</div>
    <el-form label-width="120px">
      <el-row class="form">
        <el-col :span="8">
          <el-form-item label="选择部门">
            <el-select v-model="depId" placeholder="全部">
              <el-option label="部门一" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="14">
          <el-button size="small">重置</el-button>
          <el-button size="small" type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="data">
      <div class="data-title">核心指标</div>
      <el-row>
        <el-col :span="4" class="item">
          <div class="item-t">工单总数</div>
          <div class="item-c">79</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t">待指派</div>
          <div class="item-c">79</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t">已指派</div>
          <div class="item-c">79</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t">进行中</div>
          <div class="item-c">79</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t">今日完成</div>
          <div class="item-c">79</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t">异常工单</div>
          <div class="item-c">79</div>
        </el-col>
      </el-row>
      <div class="compare">
        同比上周 <span>8.04% <i class="el-icon-caret-top"></i></span>
      </div>
    </div>
    <el-row :gutter="16" class="middle">
      <el-col :span="16">
        <div class="trend">
        </div>
      </el-col>
      <el-col :span="8">
        <div class="list">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="charts">
      <el-col :span="8">
        <div class="chart">
          <div class="chart-title">团队工单统计</div>
          <div class="chart-con" ref="chart2"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart">
          <div class="chart-title">工单分类统计</div>
          <div class="chart-con" ref="chart3"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart">
          <div class="chart-title">工单分类统计</div>
          <div class="chart-con" ref="chart4"></div>
        </div>
      </el-col>
    </el-row>
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
      chart4: null
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initChart2()
    })
  },
  methods: {
    initChart2() {
      this.chart = echarts.init(this.$refs.chart2, 'macarons')
      this.chart.setOption({
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
  }

  .list {
    height: 396px;
    background-color: #fff;
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
