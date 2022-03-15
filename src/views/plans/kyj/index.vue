<template>
  <div class="app-container">
    <detail :equ-id="equId" />
  </div>
</template>
<script>
import detail from '../components/detail'
export default {
  components: { detail },
  data() {
    return {
      equId: this.$route.meta.equId
    }
  },
  created() {
  },
  methods: {}
}

</script>
<style lang="scss" scoped>
</style>
