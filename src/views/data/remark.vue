<template>
  <div class="app-container">
    <div class="chart switchBg">
      <div class="chart-title switchText">产量能耗统计</div>
      <div ref="chart1" class="chart-con" />
    </div>
    <div class="chart switchBg" style="padding-bottom: 20px">
      <el-menu
        :default-active="activeIndex1"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="液氧">液氧</el-menu-item>
        <el-menu-item index="二氧化碳">二氧化碳</el-menu-item>
        <el-menu-item index="天然气">天然气</el-menu-item>
        <el-menu-item index="丙烷">丙烷</el-menu-item>
        <el-menu-item index="蒸汽">蒸汽</el-menu-item>
      </el-menu>
      <div class="chart-title switchText">瞬时流量曲线</div>
      <div ref="chart2" class="chart-con" />
      <div class="tip">
        <div class="tip-title switchText">流量总体情况</div>
        <div class="tip-info">
          •本月平均瞬时流量为4343m³/h，最高瞬时流量值出现在26日为1231m³/h，最低瞬时流量出现在22日为3421m³/h.
        </div>
        <div class="tip-info">
          •本月瞬时流量波动率为12.322，上月瞬时流量波动率32.123环比下降，12.34%。
        </div>
      </div>
    </div>
    <div class="chart switchBg" style="padding-bottom: 20px">
      <el-menu
        :default-active="activeIndex2"
        mode="horizontal"
        @select="handleSelect1"
      >
        <el-menu-item index="液氧">液氧</el-menu-item>
        <el-menu-item index="二氧化碳">二氧化碳</el-menu-item>
        <el-menu-item index="天然气">天然气</el-menu-item>
        <el-menu-item index="丙烷">丙烷</el-menu-item>
        <el-menu-item index="蒸汽">蒸汽</el-menu-item>
      </el-menu>
      <div class="chart-title switchText">压力曲线</div>
      <div ref="chart3" class="chart-con" />
      <div class="tip">
        <div class="tip-title switchText">压力总体情况</div>
        <div class="tip-info">
          •本月平均压力为6.23bar，最高压力值出现在24日为7.42bar，最低压力出现在8日为2.43bar。
        </div>
        <div class="tip-info">
          •本月压力波动率为12.322%，上月压力波动率32.123%环比下降，12.34%。
        </div>
      </div>
    </div>
    <div class="chart switchBg">
      <div class="chart-title switchText">报警分布统计</div>
      <el-row>
        <el-col :span="12">
          <div ref="chart4" class="chart-pie" />
          <div class="warn switchText">
            天然气相关报警产生较多次报警，需要密切关注该类型的用气情况。
          </div>
        </el-col>
        <el-col :span="12">
          <div ref="chart5" class="bar" />
        </el-col>
      </el-row>
    </div>
    <div class="total switchBg">
      <div class="title switchText">总体情况分析</div>
      <el-row>
        <el-col :span="12">
          <div class="name switchText">工业气体用气指标综合评定</div>
          <div class="circle">
            <div class="inner">74 <span>分</span></div>
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
import { getGuanZhongData } from "@/api/chart";
import { queryMonthInstant, queryMonthInstantYL } from "@/api/equipment";
import echarts from "echarts";
echarts.registerTheme("aa", {
  backgroundColor: "#2C3748",
});
require("echarts/theme/macarons"); // echarts theme

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
      activeIndex1: "液氧",
      activeIndex2: "液氧",
      gasName: "液氧",
      gasName1: "液氧",
      theme: localStorage.getItem("theme") === "theme-dark" ? "aa" : "macarons",
      isDark: localStorage.getItem("theme") === "theme-dark",
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart1();
      this.initChart2();
      this.initChart3();
      this.initChart4();
      this.initChart5();
    });
  },
  methods: {
    changeType(t) {
      if (t === this.type) return;
      this.type = t;
    },
    changeGasType(t) {
      if (t === this.gasType) return;
      this.gasType = t;
    },
    handleSelect(e) {
      console.log(e);
      this.gasName = e;
      this.$nextTick(() => {
        this.initChart2();
      });
    },
    handleSelect1(e) {
      console.log(e);
      this.gasName1 = e;
      this.$nextTick(() => {
        this.initChart3();
      });
    },
    fetchData() {
      getGuanZhongData().then((response) => {
        this.list = response.data;
      });
    },
    randomData(now, value, oneDay) {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
          Math.round(value),
        ],
      };
    },
    initChart1() {
      this.chart1 = echarts.init(this.$refs.chart1, "macarons");
      this.chart1.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        legend: {
          textStyle: {
            color: this.isDark ? "#fff" : "#000",
          },
        },
        xAxis: {
          type: "category",
          data: this.getCurrentMonthArray(12, false),
        },
        yAxis: [
          {
            type: "value",
            name: "t",
          },
          {
            type: "value",
            name: "m3",
          },
        ],
        series: [
          {
            name: "本月产量",
            type: "bar",
            data: this.getRandomArray(9345, 20, 12),
          },
          {
            name: "上月产量",
            type: "bar",
            data: this.getRandomArray(9345, 20, 12),
          },
          {
            name: "本月用气量",
            type: "line",
            yAxisIndex: 1,
            data: this.getRandomArray(500, 20, 12),
            symbol: "none",
          },
          {
            name: "上月用气量",
            type: "line",
            yAxisIndex: 1,
            data: this.getRandomArray(500, 20, 12),
            symbol: "none",
          },
        ],
      });
    },
    initChart2() {
      var param = {};
      param.gasName = this.gasName;
      var data = [];
      queryMonthInstant(param).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          data.push([response.data[i].flowTime, response.data[i].qty]);
          this.chart2 = echarts.init(this.$refs.chart2, "macarons");
          this.chart2.setOption({
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            tooltip: {
              trigger: "axis",
              position: function (pt) {
                return [pt[0], "10%"];
              },
              formatter: function (params) {
                let tip = "";
                if (params != null && params.length > 0) {
                  tip =
                    params[0].axisValueLabel +
                    "  " +
                    params[0].data[1].toFixed(2);
                }
                return tip;
              },
            },
            xAxis: {
              type: "time",
              boundaryGap: false,
              axisLabel: {
                color: this.isDark ? "#fff" : "#000",
              },
            },
            yAxis: {
              type: "value",
              boundaryGap: [0, "100%"],
            },
            dataZoom: [
              {
                type: "inside",
                start: 97,
                end: 100,
                textStyle: {
                  color: this.isDark ? "#fff" : "#000",
                },
              },
              {
                start: 97,
                end: 100,
                textStyle: {
                  color: this.isDark ? "#fff" : "#000",
                },
              },
            ],
            series: [
              {
                type: "line",
                smooth: true,
                symbol: "none",
                areaStyle: {},
                data: data,
              },
            ],
          });
        }
      });
    },
    initChart3() {
      var param = {};
      param.gasName = this.gasName1;
      var data = [];
      queryMonthInstant(param).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          data.push([response.data[i].flowTime, response.data[i].qty]);
        }
        this.chart3 = echarts.init(this.$refs.chart3, "macarons");

        this.chart3.setOption({
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            position: function (pt) {
              return [pt[0], "10%"];
            },
            formatter: function (params) {
              let tip = "";
              if (params != null && params.length > 0) {
                tip =
                  params[0].axisValueLabel +
                  "  " +
                  params[0].data[1].toFixed(2);
              }
              return tip;
            },
          },
          xAxis: {
            type: "time",
            boundaryGap: false,
            axisLabel: {
              color: this.isDark ? "#fff" : "#000",
            },
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, "100%"],
          },
          dataZoom: [
            {
              type: "inside",
              start: 97,
              end: 100,
              textStyle: {
                color: this.isDark ? "#fff" : "#000",
              },
            },
            {
              start: 97,
              end: 100,
              textStyle: {
                color: this.isDark ? "#fff" : "#000",
              },
            },
          ],
          series: [
            {
              type: "line",
              smooth: true,
              symbol: "none",
              areaStyle: {},
              data: data,
            },
          ],
        });
      });
    },
    initChart4() {
      this.chart4 = echarts.init(this.$refs.chart4, this.theme);
      this.chart4.setOption({
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          containLabel: true,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "bottom",
          textStyle: {
            color: this.isDark ? "#fff" : "#000",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "inside",
              formatter: "{c}",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 6, name: "液氧" },
              { value: 5, name: "天然气" },
              { value: 9, name: "丙烷" },
              { value: 12, name: "二氧化碳" },
              { value: 18, name: "蒸汽" },
            ],
          },
        ],
      });
    },
    initChart5() {
      this.chart5 = echarts.init(this.$refs.chart5, "macarons");
      this.chart5.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["低级", "一般", "中级", "中高", "高级", "极高"],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 30,
          interval: 5,
        },
        series: [
          {
            type: "bar",
            data: [20, 17, 11, 3, 0, 0],
          },
        ],
      });
    },
    generateRandomArray(a, b, length) {
      var num = 0;
      var ret = [];
      for (var i = 0; i < length; i++) {
        num = parseInt(Math.random() * (b - a + 1) + a, 10);
        ret.push(num);
      }
      return ret;
    },
    getRandomArray(level, percent, length) {
      var num = 0;
      var ret = [];
      const n = (percent * level * 4) / 100;
      const min = (level * (100 - percent)) / 100;
      for (var i = 0; i < length; i++) {
        num = Math.random() * n + min;
        ret.push(num);
      }
      return ret;
    },
    getCurrentMonthArray(len, isContainCurrent) {
      var result = [];
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      if (isContainCurrent) {
        len--;
        let _month = month + 1;
        _month = _month.toString().padStart(2, "0");
        result.push(`${year}-${_month}`);
      }
      let newYear, newMonth, newStr;
      for (let i = 0; i < len; i++) {
        month -= 1;
        now.setMonth(month);
        newYear = now.getFullYear();
        newMonth = now.getMonth() + 1;
        newMonth = newMonth.toString().padStart(2, "0");
        newStr = `${newYear}-${newMonth}`;
        result.push(newStr);
        if (month === -1) {
          month = 11;
        }
      }
      return result.reverse();
    },
  },
};
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
      background: #f2f2f2;
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
    border: 3px solid #12caa1;
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
    background: #f6f6f6;
    border: 6px solid #12caa1;

    .inner {
      width: 170px;
      height: 170px;
      background: #ebebeb;
      border-radius: 170px;
      margin-top: 17px;
      margin-left: 17px;
      font-size: 81px;
      color: #fc642d;
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
      border: 1px solid #f0f0f0;
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
    background: #f2f2f2;
    color: #494949;
    border-radius: 17px;
    font-size: 14px;
    padding: 0 10px;
    margin-top: 44px;
  }
}
</style>
