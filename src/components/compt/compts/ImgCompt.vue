<template>
  <div class="img-compt">
    <template v-if="view==='view'">
      <img :src="model.src" alt="">
    </template>
    <template v-if="view==='opt'">
      <textarea v-model="model.src" type="text" rows="5" ></textarea>
    </template>
  </div>
</template>
<script>
  export default {
    displayName: '图片模块',
    name: 'imgCompt',
    props: {
      view: {
        type: String,
        default: 'view',
        validator: val => ~['view', 'opt'].indexOf(val)
      },
      model: {
        type: Object,
        default: () => ({
          src: '//inimg01.jiuyan.info/in/2016/11/07/E6A452FB-FD60-E2A3-1958-5362CFAA1ED1.jpg'
        })
      }
    }
  }
</script>
<style lang="scss">
  .img-compt {
    font-size: .3rem;
    img {
      width: 100%;
    }
    textarea {
      font-size: .2rem;
      width: 100%;
    }
  }
</style>
