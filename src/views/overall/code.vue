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
    height: 160px;
    background-color: #fff;

    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}

</style>
