<template>
  <div class="app-container">
    <div class="h-title">船坞泵设备管理</div>
    <el-row class="top">
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title">船坞泵台数</div>
          <div class="num">321</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title">总功率（kW）</div>
          <div class="num">2200</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title">总流量（m3/h）</div>
          <div class="num">3424</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title">平均转速（r/min）</div>
          <div class="num">500</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title">平均每天工作时长（H）</div>
          <div class="num">10</div>
        </div>
      </el-col>
    </el-row>
    <div class="table-wrap">
      <el-row>
        <el-col :span="4">
          <el-button size="middle" type="primary" @click="handleCreate">添加船坞泵设备</el-button>
        </el-col>
        <el-col :span="6" :offset="14">
          <el-input placeholder="请输入搜索关键字" suffix-icon="el-icon-search" v-model="keyword">
          </el-input>
        </el-col>
      </el-row>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row max-height="450">
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
            {{ scope.row.cs }}
          </template>
        </el-table-column>
        <el-table-column label="设备类型" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column label="设备型号" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.xh }}
          </template>
        </el-table-column>
        <el-table-column label="流量（m3/h）" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.ll }}
          </template>
        </el-table-column>
        <el-table-column label="扬程（m）" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.yc }}
          </template>
        </el-table-column>
        <el-table-column label="压力（MPa）" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.yl }}
          </template>
        </el-table-column>
        <el-table-column label="转速（r/min）" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.zs }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-popconfirm confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" title="确定删除吗？" @onConfirm="deleteItem(scope.row)">
              <el-button slot="reference" type="text" size="small" style="margin-left: 10px;">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择设备类型">
            <el-option label="类型一" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="设备型号">
          <el-input v-model="temp.xh" placeholder="请输入设备型号" />
        </el-form-item>
        <el-form-item label="设备厂商">
          <el-input v-model="temp.cs" placeholder="请输入设备厂商" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCwbList } from '@/api/table'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    isFkFilter(isFk) {
      if (isFk === 1) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  data() {
    return {
      keyword: '',
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        type: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
      },
      temp: {
        id: undefined,
        no: '', //设备编号
        name: '', //设备名称
        cs: '', //设备厂商
        type: '', //设备类型
        xh: '', //设备型号
        isFk: 1, //是否反控
        fk: '', //反控点位
        fzr: '' //负责人
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCwbList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    },
    deleteItem(row) {
      console.log(row)
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    updateData() {

    },
    resetTemp() {
      this.temp = {
        id: undefined,
        no: '', //设备编号
        name: '', //设备名称
        cs: '', //设备厂商
        type: '', //设备类型
        xh: '', //设备型号
        isFk: undefined, //是否反控
        fk: '', //反控点位
        fzr: '' //负责人
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
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

.el-dialog__body .filter-item {
  width: 280px;
}

</style>
