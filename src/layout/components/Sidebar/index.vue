<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="menuBg"
        :text-color="menuText"
        :unique-opened="false"
        :active-text-color="menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  data(){
    return {
      menuBg: localStorage.getItem('theme') === 'theme-dark' ? '#304156' : '#fff',
      menuText: localStorage.getItem('theme') === 'theme-dark' ? '#bfcbd9' : '#5C5C5C',
      menuActiveText: localStorage.getItem('theme') === 'theme-dark' ? '#409EFF' : '#5C5C5C',
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  watch: {
    '$store.getters.sidebar.isDark': function(newVal){
      if(newVal){ //深色
        this.menuBg = '#304156'
        this.menuText = '#bfcbd9'
        this.menuActiveText = '#409EFF'
      }else{ //浅色
        this.menuBg = '#fff'
        this.menuText = '#5C5C5C'
        this.menuActiveText = '#5C5C5C'
      }
    }
  }
}
</script>
