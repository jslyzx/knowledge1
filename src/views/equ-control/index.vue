<template>
  <div class="app-container">
    <div class="h-title">设备控制管理</div>
    <el-row class="top switchBg">
      <el-col :span="4">
        <div class="grid-content">
          <div class="title switchText">设备台数</div>
          <div class="num">572</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title switchText">其中反控设备</div>
          <div class="num">72</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title switchText"><i class="dot red"></i>当前触发报警</div>
          <div class="num">1</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title switchText"><i class="dot gray"></i>已恢复报警</div>
          <div class="num">55</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title switchText"><i class="dot blue"></i>未恢复报警</div>
          <div class="num">2</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="title switchText"><i class="dot green"></i>平均恢复时长（min）</div>
          <div class="num">15.12</div>
        </div>
      </el-col>
    </el-row>
    <el-form label-width="120px">
      <el-row class="form switchBg">
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
    <div class="table-wrap switchBg">
      <el-button size="middle" type="primary" @click="handleCreate">添加控制设备</el-button>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row max-height="380">
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
        <el-table-column label="是否支持反控" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.isFk | isFkFilter }}
          </template>
        </el-table-column>
        <el-table-column label="反控点位" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.fk }}
          </template>
        </el-table-column>
        <el-table-column label="负责人" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.fzr }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <router-link :to="'/equ-control/detail/' + scope.row.id">
              <el-button type="text" size="small" style="margin-right: 10px;">查看</el-button>
            </router-link>
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
        <el-form-item label="是否支持反控">
          <el-select v-model="temp.isFk" class="filter-item" placeholder="请选择">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备负责人">
          <el-select v-model="temp.fzr" class="filter-item" placeholder="请选择设备负责人">
            <el-option v-for="item in fzrList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
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
import { getEquList } from '@/api/table'
import Pagination from '@/components/Pagination'

const fzrList = [
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
]

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
      fzrList,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        type: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
      },
      temp: {
        id: undefined,
        no: '', // 设备编号
        name: '', // 设备名称
        cs: '', // 设备厂商
        type: '', // 设备类型
        xh: '', // 设备型号
        isFk: 1, // 是否反控
        fk: '', // 反控点位
        fzr: '' // 负责人
      }
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
        no: '', // 设备编号
        name: '', // 设备名称
        cs: '', // 设备厂商
        type: '', // 设备类型
        xh: '', // 设备型号
        isFk: undefined, // 是否反控
        fk: '', // 反控点位
        fzr: '' // 负责人
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

.el-dialog__body .filter-item {
  width: 280px;
}

</style>
