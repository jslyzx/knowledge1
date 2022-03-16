<template>
  <div class="app-container">
    <div class="h-title">分类编码库</div>
    <div class="search">
      <el-row>
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="keyword" style="padding: 24px;">
            <el-button slot="append">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <div class="item" v-for="v in list">
        <img :src="v.pic" />
        <div class="name">{{v.name}}</div>
        <div class="date">更新时间：{{v.date}}</div>
        <el-row class="bottom">
          <el-col :span="12">
            <i class="el-icon-download"></i>下载
          </el-col>
          <el-col :span="12">
            <i class="el-icon-view"></i>查看
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { getCodeList } from '@/api/table'
export default {
  data() {
    return {
      keyword: '',
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCodeList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
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

.search {
  height: 88px;
  background-color: #fff;
}

.list {

  overflow: hidden;

  .item {
    margin-top: 24px;
    float: left;
    width: calc(25% - 12px);
    margin-right: 16px;
    height: 290px;
    background-color: #fff;

    &:nth-child(4n) {
      margin-right: 0;
    }

    img {
      height: 160px;
      width: 100%;
    }

    .name {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
      line-height: 24px;
      margin-left: 23px;
      margin-top: 16px;
    }

    .date {
      font-size: 14px;
      font-weight: 400;
      color: rgb(0, 0, 0, .45);
      line-height: 22px;
      margin-left: 23px;
      margin-top: 10px;
    }

    .bottom {
      margin-top: 14px;
      border-top: 1px dotted #ccc;
      height: 40px;
      line-height: 40px;
      cursor: pointer;

      .el-col {
        text-align: center;
        color: #1A90FE;
        font-size: 14px;

        &:first-child{
          border-right: 1px dotted #ccc;
        }

        i {
          margin-right: 7px;
        }
      }
    }
  }
}

</style>
