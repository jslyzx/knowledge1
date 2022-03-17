<template>
  <div class="app-container">
    <div class="h-title">安全辅助决策</div>
    <el-form label-width="90px">
      <el-row class="form">
        <el-col :span="5">
          <el-form-item label="选择月份">
            <el-date-picker v-model="date" type="month" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="middle">重置</el-button>
          <el-button size="middle" type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="top">
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title">报警总数</div>
          <div class="num">57</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title"><i class="dot red" />极高类型报警</div>
          <div class="num">72</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title"><i class="dot gray" />已恢复</div>
          <div class="num">1</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title"><i class="dot blue" />未恢复</div>
          <div class="num">55</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title"><i class="dot green" />平均恢复时长</div>
          <div class="num">2</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="14" class="charts">
      <el-col :span="12">
        <div class="chart">
          <div class="chart-title">本月报警类型统计</div>
          <div ref="chart1" class="chart-con" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart">
          <div class="chart-title">各区域报警排名统计</div>
          <div class="chart-con">
            <div class="rank-list">
              <div class="item" v-for="v in rankList">
                <el-row>
                  <el-col :span="1">
                    <div class="rank" :class="{active: v.rank <= 3}">{{v.rank}}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="name">{{v.name}}</div>
                  </el-col>
                  <el-col :span="18">
                    <el-progress :percentage="v.num"></el-progress>
                  </el-col>
                  
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="full-chart">
      <div class="chart-title">报警趋势分析</div>
      <div ref="chart2" class="chart-con" />
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
      chart2: null,
      rankList: [{
        rank: 1,
        name: '2#空压站',
        num: 83
      }, {
        rank: 2,
        name: '1#空压站',
        num: 83
      }, {
        rank: 3,
        name: '2#站房',
        num: 83
      }, {
        rank: 4,
        name: '1#站房',
        num: 83
      }, {
        rank: 5,
        name: '1#配电房',
        num: 83
      }]
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
        legend: {
          left: 125
        },
        xAxis: [{
          type: 'category',
          data: ['07-08', '07-09', '07-10', '07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17', '07-18']
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            max: 2000,
            interval: 500
          },
          {
            type: 'value',
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
            yAxisIndex: 1,
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
.el-col-lg-4-8 {
  width: 20%;
}

.el-row {
  margin-bottom: 16px;
}

.h-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin: 0 0 20px;
}

.form {
  background-color: #fff;
  height: 80px;

  .el-col {
    margin-top: 20px;
  }
}

.top {
  height: 112px;
  background-color: #FFF;

  .el-col:first-child {
    .grid-content {
      border-right: 1px solid #ccc;
    }
  }

  .grid-content {
    text-align: center;

    .title {
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, .65);
      margin: 24px 0 4px;

      .dot {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        vertical-align: middle;
        margin-right: 8px;

        &.red {
          background-color: #F5222D;
        }

        &.gray {
          background-color: rgba(0, 0, 0, .45);
        }

        &.blue {
          background-color: #1890FF;
        }

        &.green {
          background-color: #52C41A;
        }
      }
    }

    .num {
      font-size: 30px;
      line-height: 38px;

    }
  }
}

.charts {
  margin-top: 16px;

  .chart {
    background-color: #fff;
    height: 440px;

    &-title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      padding: 20px 0 0 20px;
    }

    &-con {
      height: calc(100% - 44px);

      .rank-list {
        padding: 20px;

        .item {
          .rank {
            width: 18px;
            height: 18px;
            border-radius: 18px;
            background-color: #D9D9D9;
            text-align: center;
            color: #fff;
            font-size: 12px;
            line-height: 18px;

            &.active {
              background-color: #314659;
            }
          }
          .name{
            font-size: 14px;
            font-weight: 400;
            color: rgba(0,0,0,.85);
            line-height: 18px;
          }
        }
      }
    }
  }
}

.full-chart {
  margin-top: 16px;
  background-color: #fff;
  height: 300px;

  .chart-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    padding: 20px 0 0 20px;
  }

  .chart-con {
    height: calc(100% - 44px);
  }
}

</style>
