<template>
  <div class="app-container">
    <div class="wrap switchBg">
      <div class="title switchText">能耗结算报表</div>
      <el-form label-width="80px">
        <el-row class="middle">
          <el-col :span="3">
            <el-radio-group v-model="time" @change="changeType">
              <el-radio-button label="按月" />
              <el-radio-button label="按年" />
            </el-radio-group>
          </el-col>
          <el-col :span="5">
            <el-form-item label="选择月份">
              <el-date-picker v-model="date" type="month" />
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="12" style="text-align: right;">
            <el-button size="middle">文件导出</el-button>
            <el-button size="middle" type="primary" @click="handleInput">库存录入</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <el-menu :default-active="activeIndex" mode="horizontal" style="margin-bottom: 10px;" @select="handleSelect">
          <el-menu-item index="液氧">液氧</el-menu-item>
          <el-menu-item index="二氧化碳">二氧化碳</el-menu-item>
          <el-menu-item index="天然气">天然气</el-menu-item>
          <el-menu-item index="丙烷">丙烷</el-menu-item>
          <el-menu-item index="液氩">液氩</el-menu-item>
          <el-menu-item index="蒸汽">蒸汽</el-menu-item>
          <el-menu-item index="水">水</el-menu-item>
        </el-menu>
        <el-table v-loading="listLoading" :data="list.slice((listQuery.page-1)*listQuery.limit,listQuery.page*listQuery.limit)" element-loading-text="Loading" border fit highlight-current-row max-height="500">
          <template v-if="time === '按月'">
            <el-table-column label="日期" align="center">
              <template slot-scope="{row}">
                <span>{{ row.energyDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="当日用量(t)" align="center">
              <template slot-scope="{row}">
                <el-input v-model="row.energyDayQty" class="edit-input" size="small" v-if="row.edit" />
                <span v-else>{{ row.energyDayQty }}</span>
              </template>
            </el-table-column>
            <el-table-column label="当日用量耗费(元)" align="center">
              <template slot-scope="{row}">
                <el-input v-model="row.energyDayCost" class="edit-input" size="small" v-if="row.edit" />
                <span v-else>{{ row.energyDayCost }}</span>
              </template>
            </el-table-column>
            <el-table-column label="当日入库量(t)" align="center">
              <template slot-scope="{row}">
                <el-input v-model="row.energyWarehouseQty" class="edit-input" size="small" v-if="row.edit" />
                <span v-else>{{ row.energyWarehouseQty }}</span>
              </template>
            </el-table-column>
            <el-table-column label="当日入库耗费(元)" align="center">
              <template slot-scope="{row}">
                <el-input v-model="row.energyWarehouseCost" class="edit-input" size="small" v-if="row.edit" />
                <span v-else>{{ row.energyWarehouseCost }}</span>
              </template>
            </el-table-column>
            <el-table-column label="当日库存(t)" align="center">
              <template slot-scope="{row}">
                <el-input v-model="row.energyStock" class="edit-input" size="small" v-if="row.edit" />
                <span v-else>{{ row.energyStock }}</span>
              </template>
            </el-table-column>
            <el-table-column label="当前气体单价(t/元)" align="center">
              <template slot-scope="{row}">
                <el-input v-model="row.energyPrice" class="edit-input" size="small" v-if="row.edit" />
                <span v-else>{{ row.energyPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="{row}">
                <el-button type="text" size="small" @click="viewDetail(row)">用量详情</el-button>
                <el-button v-if="row.edit" type="text" size="small" @click="confirmEdit(row)">确定</el-button>
                <el-button v-if="row.edit" type="text" size="small" @click="cancelEdit(row)">取消</el-button>
                <el-button v-if="!row.edit" type="text" size="small" @click="row.edit=!row.edit">编辑</el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column label="月份" align="center">
              <template slot-scope="{row}">
                <span>{{ row.energyDate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="累计用量" align="center">
              <template slot-scope="{row}">
                <span>{{ row.energyDayQty }}</span>
              </template>
            </el-table-column>
            <el-table-column label="累计能耗金额" align="center">
              <template slot-scope="{row}">
                <span>{{ row.energyDayCost }}</span>
              </template>
            </el-table-column>
            <el-table-column label="累计入库量" align="center">
              <template slot-scope="{row}">
                <span>{{ row.energyWarehouseQty }}</span>
              </template>
            </el-table-column>
            <el-table-column label="日平均库存" align="center">
              <template slot-scope="{row}">
                <span>{{ row.energyStock }}</span>
              </template>
            </el-table-column>
            <el-table-column label="日平均用量" align="center">
              <template slot-scope="{row}">
                <span>{{ row.energyWarehouseCost }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
      </div>
    </div>
    <el-dialog title="用量详情" :visible.sync="dialogFormVisible">
      <el-table :data="scheduleList" :span-method="objectSpanMethod" row-class-name="no-border" header-row-class-name="no-border">
        <el-table-column prop="projectName" label="区域"></el-table-column>
        <el-table-column prop="amount" label="区域日用量"></el-table-column>
        <el-table-column prop="machineName" label="分管"></el-table-column>
        <el-table-column prop="flowQty" label="分管日用量"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="库存录入" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="130px" style="width: 400px; margin-left:50px;">
        <el-form-item label="类型" prop="gasName">
          <el-select v-model="temp.gasName" placeholder="请选择气体类型">
            <el-option label="液氧" value="液氧" />
            <el-option label="二氧化碳" value="二氧化碳" />
            <el-option label="天然气" value="天然气" />
            <el-option label="丙烷" value="丙烷" />
            <el-option label="液氮" value="液氮" />
            <el-option label="液氩" value="液氩" />
            <el-option label="蒸汽" value="蒸汽" />
            <el-option label="水" value="水" />
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="energyPrice">
          <el-input v-model="temp.energyPrice">
            <template slot="append">T/吨</template>
          </el-input>
        </el-form-item>
        <el-form-item label="入库量" prop="energyStock">
          <el-input v-model="temp.energyStock">
            <template slot="append">吨</template>
          </el-input>
        </el-form-item>
        <el-form-item label="录入时间" prop="energyDate">
          <el-date-picker v-model="temp.energyDate" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryEnergyList, saveEnergy, queryEnergyTotalByYear, saveEnergyStock,queryGasInfoByDay } from '@/api/equipment'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      time: '按月',
      date: '',
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        name: '液氧'
      },
      activeIndex: '液氧',
      dialogFormVisible: false,
      dialogFormVisible1: false,
      rules: {
        gasName: [{ required: true, message: '请选择气体类型', trigger: 'blur' }]
      },
      temp: {
        gasName: '',
        energyPrice: '',
        energyStock: 0,
        energyDate: ''
      },
      scheduleList: [],
      rowIndex: '-1',
      orderIndexArr: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.getOrderNumber();
  },
  methods: {
    changeType() {
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      if (this.time === '按月') {
        queryEnergyList({
          gasName: this.listQuery.name
        }).then(response => {
          this.list = response.data.map(v => {
            this.$set(v, 'edit', false)
            // v.originalTitle = v.title //  will be used when user click the cancel botton
            return v
          })
          this.listLoading = false
          this.total = response.data.length
        })
      } else {
        queryEnergyTotalByYear({
          gasName: this.listQuery.name,
          year: '2022'
        }).then(response => {
          this.listLoading = false
          this.total = response.data.length
        })
      }
    },
    handleSelect(index) {
      this.listQuery.name = index
      this.fetchData()
    },
    updateData() {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          saveEnergyStock(this.temp).then(response => {
            this.dialogFormVisible1 = false
            this.$notify({
              title: '成功',
              message: '数据提交成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })

    },
    cancelEdit(row) {
      // row.energyDayQty = row.originalTitle
      // row.energyDayQty = row.originalEnergyDayQty
      row.edit = false
    },
    confirmEdit(row) {
      row.edit = false
      // row.originalEnergyDayQty = row.energyDayQty
      saveEnergy(row).then(response => {
        this.$notify({
          title: '成功',
          message: '数据提交成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    getOrderNumber() {
      const orderObj = {}
      this.scheduleList.forEach((item, index) => {
        item.rowIndex = index
        if (orderObj[item.projectName]) {
          orderObj[item.projectName].push(index)
        } else {
          orderObj[item.projectName] = []
          orderObj[item.projectName].push(index)
        }
      })
      // 将数组长度大于1的值 存储到this.orderIndexArr（也就是需要合并的项）
      Object.keys(orderObj).forEach((key) => {
        if (orderObj[key].length > 1) {
          this.orderIndexArr.push(orderObj[key])
        }
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        for (let i = 0; i < this.orderIndexArr.length; i += 1) {
          let element = this.orderIndexArr[i]
          for (let j = 0; j < element.length; j += 1) {
            let item = element[j];
            if (rowIndex === item) {
              if (j === 0) {
                return {
                  rowspan: element.length,
                  colspan: 1
                }
              }
              if (j !== 0) {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
        }
      }
    },
    viewDetail(row) {
      var param = {
        flowDate: row.energyDate,
        gasName: row.gasName
      }
      queryGasInfoByDay(param).then(response => {
        this.scheduleList = response.data
        this.getOrderNumber()
        this.dialogFormVisible = true
      })
    },
    handleInput() {
      this.temp.energyDate = this.getNowTime()
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getNowTime() {
      var now = new Date()
      var year = now.getFullYear() //得到年份
      var month = now.getMonth() //得到月份
      var date = now.getDate() //得到日期
      month = month + 1
      month = month.toString().padStart(2, "0")
      date = date.toString().padStart(2, "0")
      var defaultDate = `${year}-${month}-${date}`
      return defaultDate
    }
  }
}

</script>
<style lang="scss" scoped>
.wrap {
  background-color: #fff;

  .title {
    font-size: 14px;
    font-weight: 500;
    color: #494949;
    line-height: 20px;
    padding: 25px 22px;
  }

  .middle {
    padding-left: 35px;
    padding-right: 53px;
  }

  .table {
    padding: 10px 20px;
  }
}

.el-select {
  width: 270px;
}

.el-date-editor.el-input {
  width: 270px;
}

::v-deep .el-table .no-border td,
::v-deep .el-table .no-border th.is-leaf{
  border: none;
}

</style>
