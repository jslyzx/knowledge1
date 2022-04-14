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
export default {
  components: { Xx, Dx, Eb },
  data() {
    return {
      data: [{
        id: 14,
        label: '空压机',
        children: [{
          label: '空压机1#',
          id: 1
        }, {
          label: '空压机2#',
          id: 2
        }]
      }, {
        id: 15,
        label: '储罐',
        children: [{
          label: '2号区液氧储罐#1',
          id: 3
        }, {
          label: '2号区液氧储罐#2',
          id: 4
        }, {
          label: '2号区二氧化碳储罐#1',
          id: 5
        }]
      }, {
        id: 16,
        label: '流量计',
        children: [{
          label: '流量计#',
          id: 6
        }, {
          label: '流量计#',
          id: 7
        }]
      }, {
        id: 17,
        label: '压力表',
        children: [{
          label: '压力表#1',
          id: 8
        }, {
          label: '压力表#2',
          id: 9
        }]
      }, {
        id: 18,
        label: '温度计',
        children: [{
          label: '温度计#1',
          id: 10
        }, {
          label: '温度计#2',
          id: 11
        }]
      }, {
        id: 19,
        label: '其他设备',
        children: [{
          label: '其他设备#1',
          id: 12
        }, {
          label: '其他设备#2',
          id: 13
        }]
      }],
      selectedId: 1,
      deviceName: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeName: 'xx'
    }
  },
  created() {
    this.deviceName = this.data[0].children[0].label
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
