<template>
  <div class="app-container">
    <div class="h-title switchText">工单人效</div>
    <el-form label-width="120px">
      <el-row class="form switchBg">
        <el-col :span="8">
          <el-form-item label="选择部门">
            <el-select
              v-model.number="depId"
              placeholder="请选择"
              @change="selectDep"
            >
              <el-option label="全部" :value="1" />
              <el-option label="加工部" :value="2" />
              <el-option label="组力部" :value="3" />
              <el-option label="涂装部" :value="4" />
              <el-option label="搭载部" :value="5" />
              <el-option label="船装部" :value="6" />
              <el-option label="机装调试部" :value="7" />
              <el-option label="模块部" :value="8" />
              <el-option label="工务保障部" :value="9" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="13">
          <el-button size="small">重置</el-button>
          <el-button size="small" type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="data switchBg">
      <div class="data-title switchText">核心指标</div>
      <el-row>
        <el-col :span="4" class="item">
          <div class="item-t switchText">工单总数</div>
          <div class="item-c switchText">{{ infoData[depId - 1][0] }}</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t switchText">待指派</div>
          <div class="item-c switchText">{{ infoData[depId - 1][1] }}</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t switchText">已指派</div>
          <div class="item-c switchText">{{ infoData[depId - 1][2] }}</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t switchText">进行中</div>
          <div class="item-c switchText">{{ infoData[depId - 1][3] }}</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t switchText">今日完成</div>
          <div class="item-c switchText">{{ infoData[depId - 1][4] }}</div>
        </el-col>
        <el-col :span="4" class="item">
          <div class="item-t switchText">异常工单</div>
          <div class="item-c switchText">{{ infoData[depId - 1][5] }}</div>
        </el-col>
      </el-row>
      <div class="compare switchText">
        同比上周 <span>8.04% <i class="el-icon-caret-top"></i></span>
      </div>
    </div>
    <el-row :gutter="16" class="middle">
      <el-col :span="16">
        <div class="trend switchBg">
          <div class="title switchText">工单趋势</div>
          <div ref="chart1" class="con"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="list switchBg">
          <div class="title switchText">未完成的工单</div>
          <div class="con">
            <div class="table">
              <el-row class="thead">
                <el-col :span="6">
                  <div class="th switchText">工单编号</div>
                </el-col>
                <el-col :span="6">
                  <div class="th switchText">工单类型</div>
                </el-col>
                <el-col :span="6">
                  <div class="th switchText">负责人</div>
                </el-col>
                <el-col :span="6">
                  <div class="th switchText">状态</div>
                </el-col>
              </el-row>
              <div class="tbody">
                <el-row class="tr">
                  <el-col :span="6">
                    <div class="td switchText">TNM5574</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">默认工单</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">佴云</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">已指派</div>
                  </el-col>
                </el-row>
                <el-row class="tr">
                  <el-col :span="6">
                    <div class="td switchText">TNM8376</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">默认工单</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">巨波茜</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">已指派</div>
                  </el-col>
                </el-row>
                <el-row class="tr">
                  <el-col :span="6">
                    <div class="td switchText">TNM1265</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">默认工单</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">燕姬</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">已指派</div>
                  </el-col>
                </el-row>
                <el-row class="tr">
                  <el-col :span="6">
                    <div class="td switchText">TNM4248</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">默认工单</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">左冰辉</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">已指派</div>
                  </el-col>
                </el-row>
                <el-row class="tr">
                  <el-col :span="6">
                    <div class="td switchText">TNM7037</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">默认工单</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">赵伦璧</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">已指派</div>
                  </el-col>
                </el-row>
                <el-row class="tr">
                  <el-col :span="6">
                    <div class="td switchText">TNM7378</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">默认工单</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">松谦</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">已指派</div>
                  </el-col>
                </el-row>
                <el-row class="tr">
                  <el-col :span="6">
                    <div class="td switchText">TNM5429</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">默认工单</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">咸坚</div>
                  </el-col>
                  <el-col :span="6">
                    <div class="td switchText">已指派</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="charts">
      <el-col :span="8">
        <div class="chart switchBg">
          <div class="chart-title switchText">团队工单统计</div>
          <div ref="chart2" class="chart-con"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart switchBg">
          <div class="chart-title switchText">工单分类统计</div>
          <div ref="chart3" class="chart-con"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart switchBg">
          <div class="chart-title switchText">工单分类统计</div>
          <div ref="chart4" class="chart-con"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
echarts.registerTheme("aa", {
  backgroundColor: "#2C3748",
});
require("echarts/theme/macarons"); // echarts theme

export default {
  data() {
    return {
      depId: 1,
      chart1: null,
      chart2: null,
      chart3: null,
      chart4: null,
      theme: localStorage.getItem("theme") === "theme-dark" ? "aa" : "macarons",
      isDark: localStorage.getItem("theme") === "theme-dark",
      infoData: [
        [120, 40, 12, 32, 18, 18],
        [30, 7, 8, 5, 3, 7],
        [10, 1, 2, 4, 3, 0],
        [5, 1, 0, 0, 4, 0],
        [20, 4, 2, 11, 2, 1],
        [15, 2, 3, 0, 4, 6],
        [10, 1, 1, 7, 1, 0],
        [15, 5, 2, 3, 1,4],
        [5, 1, 1, 1, 1, 1],
      ],
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initChart1();
      this.initChart2();
      this.initChart3();
      this.initChart4();
    });
  },
  methods: {
    initChart1() {
      this.chart1 = this.chart1 || echarts.init(this.$refs.chart1, "macarons");
      this.chart1.setOption({
        legend: {
          textStyle: {
            color: this.isDark ? "#fff" : "#000",
          },
        },
        xAxis: {
          type: "category",
          data: this.getCurrentMonthArray(6, false),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "新增工单",
            data: this.generateRandomArray(8, 45, 6),
            type: "line",
            symbol: "none",
          },
          {
            name: "完成工单",
            data: this.generateRandomArray(7, 39, 6),
            symbol: "none",
            type: "line",
          },
        ],
      });
    },
    initChart2() {
      this.chart2 = echarts.init(this.$refs.chart2, "macarons");
      this.chart2.setOption({
        legend: {
          textStyle: {
            color: this.isDark ? "#fff" : "#000",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: ["保障部", "生产部", "涂装部"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "当前未完成",
            data: [120, 220, 320],
            type: "bar",
            barWidth: 20,
          },
          {
            name: "已完成",
            data: [280, 210, 150],
            type: "bar",
            barWidth: 20,
          },
        ],
      });
    },
    initChart3() {
      this.chart3 = echarts.init(this.$refs.chart3, "macarons");
      this.chart3.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "middle",
          left: "right",
          orient: "verticalAlign",
          textStyle: {
            color: this.isDark ? "#fff" : "#000",
          },
          formatter: function (a, b, c) {
            if (a === "工单类型") {
              return a + "    55";
            }
            if (a === "产品类型") {
              return a + "    43";
            }
            if (a === "服务类型") {
              return a + "    33";
            }
            if (a === "服务内容") {
              return a + "    33";
            }
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
              formatter: "{d} %",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 55, name: "工单类型" },
              { value: 43, name: "产品类型" },
              { value: 33, name: "服务类型" },
              { value: 33, name: "服务内容" },
            ],
          },
        ],
      });
    },
    initChart4() {
      this.chart4 = echarts.init(this.$refs.chart4, "macarons");
      this.chart4.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "middle",
          left: "right",
          orient: "verticalAlign",
          textStyle: {
            color: this.isDark ? "#fff" : "#000",
          },
          formatter: function (a, b, c) {
            if (a === "满意") {
              return a + "    55";
            }
            if (a === "一般") {
              return a + "    43";
            }
            if (a === "不满意") {
              return a + "    33";
            }
          },
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 55, name: "满意" },
              { value: 43, name: "一般" },
              { value: 33, name: "不满意" },
            ],
          },
        ],
      });
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
    selectDep() {
      this.initChart1();
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
  },
};
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
    border-right: 1px solid rgba(0, 0, 0, 0.06);

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
      color: #f5222d;
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
          background: #d8d8d8;
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
