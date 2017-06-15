<template>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
</template>
<script>
  export default {

  }
</script>
<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Menlo, Monaco, Consolas, "Helvetica Neue", Helvetica, "Courier New", 微软雅黑, monospace, Arial, sans-serif, 黑体;
    text-decoration: none;
  }
  body,html {
    height: 100%;
  }
</style>
