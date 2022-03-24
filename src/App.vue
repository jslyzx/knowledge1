<template>
  <div id="app" :class="themeClass">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      themeClass: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'theme-light'
    }
  }
}
</script>
