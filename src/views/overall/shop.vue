<template>
  <div class="app-container">
    <div class="h-title switchText">船厂项目管理</div>
    <el-row class="top switchBg">
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText">全部项目</div>
          <div class="num">57</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText"><i class="dot gray"></i>创建中</div>
          <div class="num">0</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText"><i class="dot blue"></i>项目审查中</div>
          <div class="num">1</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText"><i class="dot red"></i>方案评审失败</div>
          <div class="num">55</div>
        </div>
      </el-col>
      <el-col :lg="{span: '4-8'}">
        <div class="grid-content">
          <div class="title switchText"><i class="dot green"></i>方案评审成功</div>
          <div class="num">2</div>
        </div>
      </el-col>
    </el-row>
    <div class="projects switchBg">
      <div class="head">
        <el-row>
          <el-col class="head" :span="3">
            <span class="head-t switchText">我的项目</span>
            <span class="num">9</span>
          </el-col>
          <el-col class="search" :span="3" :offset="18">
            <el-input placeholder="搜索项目" v-model="keyword">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row max-height="450">
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <div class="name switchText">{{ scope.row.name }}</div>
            <div class="name-wrap">
              <div class="detail">
                <i class="el-icon-document" style="font-weight: bold;"></i>
                <span>详情</span>
              </div>
              <div class="day switchText">已进行{{ scope.row.day }}天</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="流程节点" align="center" width="700">
          <template slot-scope="scope">
            <span>
              <el-steps :active="scope.row.progress" finish-status="success" align-center>
                <el-step title="项目提交"></el-step>
                <el-step title="项目审查"></el-step>
                <el-step title="项目审核"></el-step>
                <el-step title="数据采集"></el-step>
                <el-step title="方案提交"></el-step>
                <el-step title="方案评审"></el-step>
              </el-steps>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="附件" align="center">
          <template slot-scope="scope">
            <span><i class="el-icon-folder-opened" style="color: #1A90FE;margin-right: 8px;font-weight: bold;"></i>{{ scope.row.file }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建详情" align="center">
          <template slot-scope="scope">
            <div>
              <i class="el-icon-user-solid" style="color: #1A90FE;margin-right: 8px;font-weight: bold;"></i>{{ scope.row.creator }}
            </div>
            <div>
              <i class="el-icon-date" style="color: #1A90FE;margin-right: 8px;font-weight: bold;"></i>{{ scope.row.date }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    </div>
  </div>
</template>
<script>
import { getProjects } from '@/api/table'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      keyword: '',
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProjects(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    }
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

.el-col-lg-4-8 {
  width: 20%;
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

.projects {
  height: calc(100vh - 270px);
  background-color: #fff;
  margin-top: 16px;

  .head {
    padding: 20px;

    &-t {
      font-size: 16px;
      font-weight: 500;
      color: #0D0735;
      line-height: 24px;
      margin-right: 4px;
    }

    .num {
      display: inline-block;
      width: 32px;
      height: 20px;
      background: #E6F7FF;
      border-radius: 12px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      font-weight: 500;
      color: #1890FF;
    }
  }
}

.el-table {
  .name {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    line-height: 22px;
  }

  .name-wrap {
    overflow: hidden;

    .detail {
      float: left;
      color: #1A90FE;
      font-size: 14px;
      cursor: pointer;

      span {
        margin-left: 3px;
      }
    }

    .day {
      float: right;
      font-size: 14px;
      color: #8C8C8C;
      line-height: 22px;
    }
  }
}

</style>
