<template>
  <div class="app-container">
    <div class="h-title switchText">安全辅助决策</div>
    <el-row class="top switchBg">
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText">报警总数</div>
          <div class="num">57</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText"><i class="dot red" />极高类型报警</div>
          <div class="num">1</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText"><i class="dot gray" />已恢复</div>
          <div class="num">55</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText"><i class="dot blue" />未恢复</div>
          <div class="num">2</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText"><i class="dot green" />平均恢复时长</div>
          <div class="num">1</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="14" class="charts">
      <el-col :span="12">
        <div class="chart switchBg">
          <div class="chart-title switchText">本月报警类型统计</div>
          <div ref="chart1" class="chart-con" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart switchBg">
          <div class="chart-title switchText">各区域报警排名统计</div>
          <div class="chart-con">
            <div class="rank-list">
              <div class="item" v-for="v in rankList">
                <el-row>
                  <el-col :span="1">
                    <div class="rank switchText" :class="{active: v.rank <= 3}">{{v.rank}}</div>
                  </el-col>
                  <el-col :span="5">
                    <div class="name switchText">{{v.name}}</div>
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
    <div class="full-chart switchBg">
      <div class="chart-title switchText">报警趋势分析</div>
      <div ref="chart2" class="chart-con" />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
echarts.registerTheme('aa', {
  backgroundColor: "#2C3748"
});
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
        num: 12
      }, {
        rank: 2,
        name: '1#空压站',
        num: 11
      }, {
        rank: 3,
        name: '2#站房',
        num: 8
      }, {
        rank: 4,
        name: '1#站房',
        num: 5
      }, {
        rank: 5,
        name: '1#配电房',
        num: 4
      }, {
        rank: 6,
        name: '1#站房',
        num: 4
      }],
      theme: 'macarons',
      isDark: localStorage.getItem('theme') === 'theme-dark'
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
      this.chart1 = echarts.init(this.$refs.chart1, this.theme)
      this.chart1.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'middle',
          left: 'right',
          orient: 'verticalAlign',
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          },
          formatter: function(a, b, c) {
            if (a === '用电类型报警') {
              return a + '    12'
            }
            if (a === '空压类型报警') {
              return a + '    22'
            }
            if (a === '工业气体报警') {
              return a + '    18'
            }
            if (a === '其它类型报警') {
              return a + '    5'
            }
          }
        },
        series: [{
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'inside',
            formatter: '{d} %'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 12, name: '用电类型报警' },
            { value: 22, name: '空压类型报警' },
            { value: 18, name: '工业气体报警' },
            { value: 5, name: '其它类型报警' }
          ]
        }]
      })
    },
    initChart2() {
      this.chart2 = echarts.init(this.$refs.chart2, this.theme)
      this.chart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
              let tip = "";
              if (params != null && params.length > 0) {
                tip += params[0].name + '<br/>'
                for (let i = 0; i < params.length; i++) {
                  tip += params[i].marker + params[i].seriesName + ":" + params[i].value + (params[i].seriesName === '同比上涨' ? '%' : '') +  "</br>"
                }
              }
              return tip
            }
        },
        legend: {
          left: 125,
          textStyle: {
            color: this.isDark ? '#fff' : '#000'
          }
        },
        xAxis: [{
          type: 'category',
          data: this.getLastDayArray(10, false)
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            max: 20,
            interval: 5
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
            data: this.generateRandomArray(5, 20, 10)
          },
          {
            name: '同比上涨',
            type: 'line',
            yAxisIndex: 1,
            data: this.generateRandomArray(0, 100, 10),
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
            background-color: #aaa;
            text-align: center;
            color: #fff;
            font-size: 12px;
            line-height: 18px;

            &.active {
              background-color: #314659;
            }
          }

          .name {
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 0, 0, .85);
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
