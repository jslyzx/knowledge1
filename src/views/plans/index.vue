<template>
  <div class="app-container">
    <el-row :gutter="24" class="main">
      <el-col :span="6" class="left">
        <el-tree :data="data" node-key="id" :current-node-key="selectedId" :props="defaultProps" :default-expand-all="true" :highlight-current="true" @node-click="handleNodeClick" />
      </el-col>
      <el-col :span="18" class="right switchBg">
        <el-tabs v-model="activeName">
          <el-tab-pane label="项修" name="xx">
            <Xx :device-id="selectedId" :device-name="deviceName" />
          </el-tab-pane>
          <el-tab-pane label="大修" name="dx">
            <Dx :device-id="selectedId" :device-name="deviceName" />
          </el-tab-pane>
          <el-tab-pane label="二保计划" name="eb">
            <Eb :device-id="selectedId" :device-name="deviceName" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Xx from './components/Xx'
import Dx from './components/Dx'
import Eb from './components/Eb'
import { getAllMachineList } from '@/api/equipment'
export default {
  components: { Xx, Dx, Eb },
  data() {
    return {
      data: [],
      selectedId: 498,
      deviceName: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeName: 'xx'
    }
  },
  created() {
    getAllMachineList().then(res => {
      this.data = res.data
      this.deviceName = this.data[0].children[0].label
    })
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      this.selectedId = data.id
      this.activeName = 'xx'
      this.deviceName = data.label
    }
  }
}

</script>
<style lang="scss" scoped>
.main {
  height: calc(100vh - 100px);

  .left {
    height: 100%;

    .el-tree {
      height: 100%;
    }
  }

  .right {
    height: 100%;
    background: #fff;
  }
}

</style>
