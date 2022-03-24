<template>
  <div class="app-container">
    <div class="wrap switchBg">
      <div class="title switchText">能耗结算报表</div>
      <el-form label-width="80px">
        <el-row class="middle">
          <el-col :span="3">
            <el-radio-group v-model="time">
              <el-radio-button label="按月"></el-radio-button>
              <el-radio-button label="按年"></el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="5">
            <el-form-item label="选择月份">
              <el-date-picker v-model="date" type="month" />
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="12" style="text-align: right;">
            <el-button size="middle">文件导出</el-button>
            <el-button size="middle" type="primary">库存录入</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="table">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" style="margin-bottom: 10px;">
          <el-menu-item index="液氧">液氧</el-menu-item>
          <el-menu-item index="二氧化碳">二氧化碳</el-menu-item>
          <el-menu-item index="天然气">天然气</el-menu-item>
          <el-menu-item index="丙烷">丙烷</el-menu-item>
          <el-menu-item index="液氩">液氩</el-menu-item>
          <el-menu-item index="蒸汽">蒸汽</el-menu-item>
          <el-menu-item index="水">水</el-menu-item>
        </el-menu>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row max-height="500">
          <el-table-column label="日期" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当日用量(t)" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当日用量耗费(元)" width="130" align="center">
            <template slot-scope="scope">
              {{ scope.row.amountCost }}
            </template>
          </el-table-column>
          <el-table-column label="当日入库量(t)" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.inAmount }}
            </template>
          </el-table-column>
          <el-table-column label="当日入库耗费(元)" width="130" align="center">
            <template slot-scope="scope">
              {{ scope.row.inCost }}
            </template>
          </el-table-column>
          <el-table-column label="当日库存(t)" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.storage }}
            </template>
          </el-table-column>
          <el-table-column label="当前气体单价(t/元)" width="140" align="center">
            <template slot-scope="scope">
              {{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small">用量详情</el-button>
              <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
      </div>
    </div>
  </div>
</template>
<script>
import { getConsumeList } from '@/api/table'
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
      activeIndex: '液氧'
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true
      getConsumeList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    },
    handleSelect(index) {
      this.listQuery.name = index
      this.fetchData()
    },
    handleUpdate() {

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

</style>
