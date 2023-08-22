<template>
  <div class="wrap">
    <div class="main">
      <div class="left">
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}

</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.wrap {
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background: linear-gradient(246.75deg, rgba(0, 64, 214, 1) 0%, rgba(2, 86, 233, 1) 100%);

  .main {
    left: 63px;
    top: 66px;
    width: calc(100% - 126px);
    height: calc(100% - 132px);
    opacity: 1;
    border-radius: 43px;
    background: #3075ff;
    position: absolute;
    display: flex;

    .left {
      flex-basis: 466px;
    }

    .right {
      opacity: 0.3;
      background-image: url(../assets/right-bg.png);
      background-size: cover;
      flex: 1;
      border-radius: 43px;
    }
  }
}

</style>
