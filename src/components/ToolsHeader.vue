<template>
    <div class="header">
        <a href="javascript:;" class="logo">{{title}}</a>
        <span class="slogan"> {{slogan}} </span>
    </div>
</template>
<script>
    export default {
      props: {
        title: {
          type: String
        },
        slogan: {
          type: String
        }
      }
    }
</script>
<style lang="scss">
    .header {
        height: 50px;
        line-height: 50px;
        border-bottom: #DDD 1px solid;
        padding-left: 10px;
        font-size: 0;
        .logo {
            font-size: 20px;
            color: #f34e5c;
        }
        .slogan {
            padding-left: 20px;
            font-size: 12px;
            color: #b1b1b1;
        }
    }
</style>
