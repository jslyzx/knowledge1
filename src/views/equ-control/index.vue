<template>
  <div class="app-container">
    <div class="h-title">设备控制管理</div>
    <el-row class="top">
      <el-col :span="4">
        <div class="grid-content">
          <div class="title">设备台数</div>
          <div class="num">572</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title">其中反控设备</div>
          <div class="num">72</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title"><i class="dot red"></i>当前触发报警</div>
          <div class="num">1</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title"><i class="dot gray"></i>已恢复报警</div>
          <div class="num">55</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title"><i class="dot blue"></i>未恢复报警</div>
          <div class="num">2</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title"><i class="dot green"></i>平均恢复时长（min）</div>
          <div class="num">15.12</div>
        </div>
      </el-col>
    </el-row>
    <el-form label-width="120px">
      <el-row class="form">
        <el-col :span="5">
          <el-form-item label="设备类型">
            <el-select v-model="form.type" placeholder="全部">
              <el-option label="类型一" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="设备名称">
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="设备型号">
            <el-input v-model="form.text" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="设备反控">
            <el-select v-model="form.fk" placeholder="全部">
              <el-option label="一" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="middle">重置</el-button>
          <el-button size="middle" type="primary">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-wrap">
      <el-button size="middle" type="primary">添加控制设备</el-button>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row max-height="480">
        <el-table-column label="设备编号" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备名称" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备厂商" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="设备类型" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="设备型号" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="是否支持反控" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="反控点位" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="负责人" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.pageviews }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    </div>
  </div>
</template>
<script>
import { getEquList } from '@/api/table'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      form: {
        type: '',
        name: '',
        text: '',
        fk: ''
      },
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getEquList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 16px;
}

.h-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin: 0 0 20px;
}

.top {
  height: 112px;
  background-color: #FFF;

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

.form {
  background-color: #fff;
  height: 80px;

  .el-col {
    margin-top: 20px;
  }
}

.table-wrap {
  background-color: #fff;
  padding: 16px;

  .el-button {
    margin-bottom: 16px;
  }
}

</style>
