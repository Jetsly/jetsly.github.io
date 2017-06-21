<template>
  <div class="text-compt">
    <template v-if="view==='view'">
      <div class="title">
        {{model.header}}
      </div>
    </template>
    <template v-if="view==='opt'">
      <input v-model="model.header" type="text" />
    </template>
  </div>
</template>
<script>
  export default {
    displayName: '文字模块',
    name: 'textCompt',
    props: {
      view: {
        type: String,
        default: 'view',
        validator: val => ~['view', 'opt'].indexOf(val)
      },
      model: {
        type: Object,
        default: () => ({
          header: '标题'
        })
      }
    }
  }
</script>
<style lang="scss">
  .text-compt {
    font-size: .3rem;
  }
</style>
