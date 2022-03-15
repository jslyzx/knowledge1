<template>
  <div class="app-container">
    <div class="h-title">设备详情</div>
    <div class="main">
      <div class="part">
        <el-row>
          <el-col :span="4">
            <div class="title">基本信息</div>
          </el-col>
          <el-col :span="2" :offset="18" class="tr">
            <el-button size="small" type="primary">编辑</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">设备编号:</span>
              <span class="item-c">BH23423423</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">设备名称:</span>
              <span class="item-c">空压机#01</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">设备厂商:</span>
              <span class="item-c">英格索兰</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">设备类型:</span>
              <span class="item-c">船坞泵</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">设备型号:</span>
              <span class="item-c">JS2341</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">是否支持反控:</span>
              <span class="item-c">是</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">负责人:</span>
              <span class="item-c">封欢</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">出厂日期:</span>
              <span class="item-c">2018-02-14</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">调试日期:</span>
              <span class="item-c">2018-02-16</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">采集网管:</span>
              <span class="item-c">D2493435</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">备注:</span>
              <span class="item-c">34059820383204</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="part">
        <el-row>
          <el-col :span="4">
            <div class="title">采集配置</div>
          </el-col>
          <el-col :span="2" :offset="18" class="tr">
            <el-button size="small" type="primary">编辑</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">模版名称:</span>
              <span class="item-c">Test demo 001</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">模板描述:</span>
              <span class="item-c">英格索兰</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">驱动类型:</span>
              <span class="item-c">ModBus_RTU</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">采集间隔:</span>
              <span class="item-c">25 ms</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">采集超时:</span>
              <span class="item-c">2000 ms</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">重试次数:</span>
              <span class="item-c">3</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">串口号:</span>
              <span class="item-c">COM2</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">站号:</span>
              <span class="item-c">1</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">波特率:</span>
              <span class="item-c">19200</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">数据位:</span>
              <span class="item-c">8</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">停止位:</span>
              <span class="item-c">1</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <span class="item-lable">校验:</span>
              <span class="item-c">无校验</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>

export default {
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
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        type: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
      },
      id: this.$route.params.id
    }
  },
  created() {
  },
  methods: {
  }
}

</script>
<style lang="scss" scoped>
.h-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin: 0 0 20px;
}

.tr {
  text-align: right;
}

.main {
  background-color: #FFF;
  padding: 24px;
  min-height: 70vh;

  .part {
    &:not(:first-child) {
      margin-top: 30px;
    }

    &:last-child {
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, .06);
    }

    .title {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      font-weight: 500;
    }

    .item {
      margin-top: 16px;

      .item-lable {
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
      }

      .item-c {
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.65);
        margin-left: 5px;
      }
    }
  }

  .table-title {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    line-height: 24px;
    margin: 20px 0;
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
