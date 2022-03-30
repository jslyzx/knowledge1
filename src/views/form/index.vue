<template>
  <div class="app-container switchBg">
    <el-row class="row">
      <el-col :span="8" class="part">
        <div class="part-title switchText">月产量信息录入</div>
        <el-form label-position="top" :model="form1" size="small">
          <el-form-item label="万元产值外付动能：">
            <el-input v-model="form1.monthOutputValue" placeholder="请输入">
              <template slot="append">元/万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="吨投钢量动能：">
            <el-input v-model="form1.monthSteelQty" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
          <el-form-item label="修正总吨动能：">
            <el-input v-model="form1.monthTotalQty" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" class="part">
        <div class="part-title switchText">日产量信息录入</div>
        <el-form label-position="top" :model="form2" size="small">
          <el-form-item label="万元产值外付动能：">
            <el-input v-model="form2.dayOutputValue" placeholder="请输入">
              <template slot="append">元/万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="吨投钢量动能：">
            <el-input v-model="form2.daySteelQty" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
          <el-form-item label="修正总吨动能：">
            <el-input v-model="form2.dayTotalQty" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" class="part">
        <div class="part-title switchText">月产量信息录入</div>
        <el-form label-position="top" :model="form3" size="small">
          <el-form-item label="当月用电量累积：">
            <el-input v-model="form3.totalElectricQty" placeholder="请输入">
              <template slot="append">kWh</template>
            </el-input>
          </el-form-item>
          <el-form-item label="当月压缩空气累积：">
            <el-input v-model="form3.totalAirQty" placeholder="请输入">
              <template slot="append">Nm3</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="8" class="part">
        <div class="part-title switchText">单耗录入</div>
        <el-form label-position="top" :model="form4" size="small">
          <el-form-item label="液氧单耗：">
            <el-input v-model="form4.yeyangQty" placeholder="请输入">
              <template slot="append">t/Nm3：</template>
            </el-input>
          </el-form-item>
          <el-form-item label="二氧化碳单耗：">
            <el-input v-model="form4.coQty" placeholder="请输入">
              <template slot="append">t/Nm3：</template>
            </el-input>
          </el-form-item>
          <el-form-item label="天然气单耗：">
            <el-input v-model="form4.tianranqiQty" placeholder="请输入">
              <template slot="append">t/Nm3：</template>
            </el-input>
          </el-form-item>
          <el-form-item label="丙烷单耗：">
            <el-input v-model="form4.bianwanQty" placeholder="请输入">
              <template slot="append">t/Nm3：</template>
            </el-input>
          </el-form-item>
          <el-form-item label="蒸汽单耗：">
            <el-input v-model="form4.zhenqiQty" placeholder="请输入">
              <template slot="append">t/Nm3：</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" class="part">
        <div class="part-title switchText">单价录入</div>
        <el-form label-position="top" :model="form5" size="small">
          <el-form-item label="液氧单价：">
            <el-input v-model="form5.yeyangPrice" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
          <el-form-item label="二氧化碳单价：">
            <el-input v-model="form5.coPrice" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
          <el-form-item label="天然气单价：">
            <el-input v-model="form5.tianranqiPrice" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
          <el-form-item label="丙烷单价：">
            <el-input v-model="form5.bianwanPrice" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
          <el-form-item label="蒸汽单价：">
            <el-input v-model="form5.zhenqiPrice" placeholder="请输入">
              <template slot="append">元/t</template>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="row" :gutter="30">
      <el-col :span="6">
        <div class="item">
          <div class="item-t switchText">核心动力设备能耗</div>
          <el-form size="small" v-model="form6" label-width="60px">
            <el-form-item label="年份：">
              <el-select v-model="form6.year">
                <el-option label="2022" value="2022" />
              </el-select>
            </el-form-item>
            <el-form-item label="1月：">
              <el-input v-model="form6.month1" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="2月：">
              <el-input v-model="form6.month2" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="3月：">
              <el-input v-model="form6.month3" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="4月：">
              <el-input v-model="form6.month4" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="5月：">
              <el-input v-model="form6.month5" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="6月：">
              <el-input v-model="form6.month6" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="7月：">
              <el-input v-model="form6.month7" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="8月：">
              <el-input v-model="form6.month8" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="9月：">
              <el-input v-model="form6.month9" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="10月：">
              <el-input v-model="form6.month10" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="11月：">
              <el-input v-model="form6.month11" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
            <el-form-item label="12月：">
              <el-input v-model="form6.month12" size="small" placeholder="请输入">
                <template slot="append">kWh</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="item">
          <div class="item-t switchText">万修正吨</div>
          <el-form size="small" v-model="form7" label-width="60px">
            <el-form-item label="年份：">
              <el-select v-model="form7.year">
                <el-option label="2022" value="2022" />
              </el-select>
            </el-form-item>
            <el-form-item label="1月：">
              <el-input v-model="form7.month1" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="2月：">
              <el-input v-model="form7.month2" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="3月：">
              <el-input v-model="form7.month3" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="4月：">
              <el-input v-model="form7.month4" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="5月：">
              <el-input v-model="form7.month5" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="6月：">
              <el-input v-model="form7.month6" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="7月：">
              <el-input v-model="form7.month7" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="8月：">
              <el-input v-model="form7.month8" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="9月：">
              <el-input v-model="form7.month9" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="10月：">
              <el-input v-model="form7.month10" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="11月：">
              <el-input v-model="form7.month11" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
            <el-form-item label="12月：">
              <el-input v-model="form7.month12" size="small" placeholder="请输入">
                <template slot="append">t</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="item">
          <div class="item-t switchText">整体生产能耗</div>
          <el-form size="small" v-model="form8" label-width="60px">
            <el-form-item label="年份：">
              <el-select v-model="form8.year">
                <el-option label="2022" value="2022" />
              </el-select>
            </el-form-item>
            <el-form-item label="1月：">
              <el-input v-model="form8.month1" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="2月：">
              <el-input v-model="form8.month2" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="3月：">
              <el-input v-model="form8.month3" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="4月：">
              <el-input v-model="form8.month4" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="5月：">
              <el-input v-model="form8.month5" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="6月：">
              <el-input v-model="form8.month6" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="7月：">
              <el-input v-model="form8.month7" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="8月：">
              <el-input v-model="form8.month8" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="9月：">
              <el-input v-model="form8.month9" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="10月：">
              <el-input v-model="form8.month10" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="11月：">
              <el-input v-model="form8.month11" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
            <el-form-item label="12月：">
              <el-input v-model="form8.month12" size="small" placeholder="请输入">
                <template slot="append">吨标煤/万修正吨</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="item">
          <div class="item-t switchText">主要设备停机率</div>
          <el-form size="small" v-model="form9" label-width="60px">
            <el-form-item label="年份：">
              <el-select v-model="form9.year">
                <el-option label="2022" value="2022" />
              </el-select>
            </el-form-item>
            <el-form-item label="1月：">
              <el-input v-model="form9.month1" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="2月：">
              <el-input v-model="form9.month2" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="3月：">
              <el-input v-model="form9.month3" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="4月：">
              <el-input v-model="form9.month4" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="5月：">
              <el-input v-model="form9.month5" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="6月：">
              <el-input v-model="form9.month6" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="7月：">
              <el-input v-model="form9.month7" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="8月：">
              <el-input v-model="form9.month8" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="9月：">
              <el-input v-model="form9.month9" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="10月：">
              <el-input v-model="form9.month10" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="11月：">
              <el-input v-model="form9.month11" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="12月：">
              <el-input v-model="form9.month12" size="small" placeholder="请输入">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form1: {
        monthOutputValue : '',
        monthSteelQty: '',
        monthTotalQty: ''
      },
      form2: {
        dayOutputValue: '',
        daySteelQty: '',
        dayTotalQty: ''
      },
      form3: {
        totalElectricQty: '',
        totalAirQty: ''
      },
      form4: {
        yeyangQty: '',
        coQty: '',
        tianranqiQty: '',
        bianwanQty: '',
        zhenqiQty: '',
      },
      form5: {
        yeyangPrice: '',
        coPrice: '',
        tianranqiPrice: '',
        bianwanPrice: '',
        zhenqiPrice: '',
      },
      form6: {
        year: '2022',
        month1: '',
        month2: '',
        month3: '',
        month4: '',
        month5: '',
        month6: '',
        month7: '',
        month8: '',
        month9: '',
        month10: '',
        month11: '',
        month12: ''
      },
      form7: {
        year: '2022',
        month1: '',
        month2: '',
        month3: '',
        month4: '',
        month5: '',
        month6: '',
        month7: '',
        month8: '',
        month9: '',
        month10: '',
        month11: '',
        month12: ''
      },
      form8: {
        year: '2022',
        month1: '',
        month2: '',
        month3: '',
        month4: '',
        month5: '',
        month6: '',
        month7: '',
        month8: '',
        month9: '',
        month10: '',
        month11: '',
        month12: ''
      },
      form9: {
        year: '2022',
        month1: '',
        month2: '',
        month3: '',
        month4: '',
        month5: '',
        month6: '',
        month7: '',
        month8: '',
        month9: '',
        month10: '',
        month11: '',
        month12: ''
      },
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.line {
  text-align: center;
}

.row {
  &:not(:first-child) {
    margin-top: 60px;
  }

  .part {
    &-title {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      line-height: 20px;
      margin-bottom: 40px;
    }

    .el-form {
      width: 60%;
    }
  }

  .item {
    &-t {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
      margin-bottom: 16px;
    }

    .el-input {
      width: 75%;
    }
  }
}

</style>
