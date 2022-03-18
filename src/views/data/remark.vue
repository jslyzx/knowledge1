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
      <div ref="chart3" class="chart-con" />
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
    <div class="total">
      <div class="title">总体情况分析</div>
      <el-row>
        <el-col :span="12">
          <div class="name">工业气体用气指标综合评定</div>
          <div class="circle">
            <div class="inner">
              74 <span>分</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <table cellspacing="0" class="table">
            <tr>
              <td>液氧单耗（t/Nm3）</td>
              <td>498.55</td>
            </tr>
            <tr>
              <td>二氧化碳单耗（t/Nm3）</td>
              <td>319.31</td>
            </tr>
            <tr>
              <td>天然气单耗（t/Nm3）</td>
              <td>800.35</td>
            </tr>
            <tr>
              <td>丙烷单耗（t/Nm3）</td>
              <td>929.97</td>
            </tr>
            <tr>
              <td>蒸汽单耗（t/Nm3）</td>
              <td>655.20</td>
            </tr>
          </table>
          <div class="tip">•建议关注用气规律，提升用气的平稳度。</div>
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
    randomData(now, value, oneDay) {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value)
        ]
      };
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
      let base = +new Date(1988, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let data = [
        [base, Math.random() * 300]
      ];
      for (let i = 1; i < 20000; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
      }
      this.chart2.setOption({
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%'];
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [{
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: data
        }]
      })
    },
    initChart3() {
      this.chart3 = echarts.init(this.$refs.chart3, 'macarons')
      let base = +new Date(1988, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let data = [
        [base, Math.random() * 300]
      ];
      for (let i = 1; i < 20000; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
      }
      this.chart3.setOption({
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%'];
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [{
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: data
        }]
      })
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

.total {
  background-color: #fff;
  padding-bottom: 20px;

  .title {
    font-size: 14px;
    font-weight: bold;
    color: #494949;
    line-height: 20px;
    padding: 18px 20px 0;
  }

  .name {
    width: 340px;
    height: 43px;
    border-radius: 22px;
    border: 3px solid #12CAA1;
    font-size: 24px;
    font-weight: 500;
    color: #494949;
    line-height: 43px;
    text-align: center;
    margin: 30px auto;
  }

  .circle {
    width: 216px;
    height: 216px;
    margin: 0 auto;
    border-radius: 216px;
    background: #F6F6F6;
    border: 6px solid #12CAA1;

    .inner {

      width: 170px;
      height: 170px;
      background: #EBEBEB;
      border-radius: 170px;
      margin-top: 17px;
      margin-left: 17px;
      font-size: 81px;
      color: #FC642D;
      line-height: 170px;
      text-align: center;

      span {
        color: #494949;
        font-size: 14px;
        position: absolute;
        bottom: 0;
      }
    }
  }

  .table {
    width: 80%;
    margin-top: 30px;

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

  .tip {
    width: 80%;
    height: 33px;
    line-height: 33px;
    background: #F2F2F2;
    color: #494949;
    border-radius: 17px;
    font-size: 14px;
    padding: 0 10px;
    margin-top: 44px;
  }
}

</style>
