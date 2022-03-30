<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <div class="title">大修信息</div>
      </el-col>
      <el-col :span="4" :offset="16" style="text-align: right;">
        <el-button size="small" type="primary">新增大修</el-button>
      </el-col>
    </el-row>
    <div class="top">
      <div class="info">
        <img src="https://seopic.699pic.com/photo/50129/2295.jpg_wh1200.jpg" class="pic">
        <div class="table-wrap">
          <table cellspacing="0">
            <tr>
              <td>
                <span class="label">设备编号</span>
                <span class="con">KYJ001</span>
              </td>
              <td>
                <span class="label">规格型号</span>
                <span class="con">JS323342223</span>
              </td>
              <td>
                <span class="label">修理类别</span>
                <span class="con">大修</span>
              </td>
              <td>
                <span class="label">计划开工日期</span>
                <span class="con">20210312</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="label">设备名称</span>
                <span class="con">2号区液氧储罐#2</span>
              </td>
              <td>
                <span class="label">复杂系数</span>
                <span class="con">3.1</span>
              </td>
              <td>
                <span class="label">设备所在班组</span>
                <span class="con">二号班组</span>
              </td>
              <td>
                <span class="label">要求完工日期</span>
                <span class="con">20210423</span>
              </td>
            </tr>
          </table>
          <table cellspacing="0" style="margin-top: 30px;">
            <tr>
              <td>
                <span class="label">停机开始时间</span>
                <span class="con">20210423</span>
              </td>
              <td>
                <span class="label">停机结束时间</span>
                <span class="con">20210423</span>
              </td>
              <td>
                <span class="label">设备负责人</span>
                <span class="con">范好文</span>
              </td>
              <td>
                <span class="label">项修人</span>
                <span class="con">张宏城</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span class="label">故障异常情况</span>
                <span class="con">不能正常运行</span>
              </td>
              <td colspan="2">
                <span class="label">大修方案</span>
                <span class="con">维护设备零件</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <el-row>
        <el-col :span="6">
          <div class="item">
            <i class="icon" />
            <span class="label">设备名称：</span>
            <span class="con">2号区液氧储罐#2</span>
          </div>
          <div class="item">
            <i class="icon" />
            <span class="label">设备型号：</span>
            <span class="con">KYJ001</span>
          </div>
          <div class="item">
            <i class="icon" />
            <span class="label">设备编号：</span>
            <span class="con">KYJ001</span>
          </div>
        </el-col>
        <el-col :span="6" style="margin-top: 20px;">
          <el-date-picker v-model="filterDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" />
        </el-col>
      </el-row>
    </div>
    <div class="part">
      <div class="part-title">项修内容</div>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row max-height="350">
        <el-table-column label="项修人" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.xxr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项修日期" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="停机开始时间" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.beginDate }}
          </template>
        </el-table-column>
        <el-table-column label="停机结束时间" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.endDate }}
          </template>
        </el-table-column>
        <el-table-column label="修理部位" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.xlbw }}
          </template>
        </el-table-column>
        <el-table-column label="更换零件" align="center">
          <template slot-scope="scope">
            {{ scope.row.lj }}
          </template>
        </el-table-column>
        <el-table-column label="更换零件型号" align="center">
          <template slot-scope="scope">
            {{ scope.row.ljxh }}
          </template>
        </el-table-column>
        <el-table-column label="调试日期" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.debugDate }}
          </template>
        </el-table-column>
        <el-table-column label="正式完成日期" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.completeDate }}
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchList" />
    </div>
  </div>
</template>
<script>
import { getDxList } from '@/api/device'
import Pagination from '@/components/Pagination'
export default {
  name: 'Dx',
  components: { Pagination },
  props: {
    deviceId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      filterDate: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.listQuery = {
      ...this.listQuery,
      deviceId: this.deviceId
    }
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.listLoading = true
      getDxList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.container {
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #1890FF;
    line-height: 22px;
    margin-bottom: 12px;
  }

  .top {
    .info {
      overflow: hidden;

      .pic {
        width: 220px;
        height: 150px;
        margin-right: 6px;
        float: left;
      }

      .table-wrap {
        float: left;
        width: calc(100% - 226px);

        table {
          width: 100%;

          td {
            font-size: 12px;
            line-height: 20px;
            padding: 4px 10px;
            width: 25%;
            border: 1px solid #eee;

            .label {
              color: #1A90FE;
            }

            .con {
              color: #494949;
              margin-left: 5px;
            }
          }
        }
      }
    }

    .item {
      margin-top: 20px;
      padding-left: 16px;

      &~.item {
        margin-top: 5px;
      }

      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background-image: url(../../../assets/device.png);
        vertical-align: middle;
      }

      .label {
        color: #1A90FE;
        font-size: 12px;
        line-height: 20px;
      }

      .con {
        color: #494949;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }

  .part {
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;

    &-title {
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      margin-bottom: 10px;
    }
  }
}

</style>
