<template>
  <div class="imgcut">
    <ToolsHeader title="ImgCut" slogan="图片裁剪工具"></ToolsHeader>
    <div class="content" ref="content"></div>
  </div>
</template>
<script>
  import ToolsHeader from 'components/ToolsHeader'
  import {
    Application,
    Sprite
  } from 'pixi.js'
  import test from '../../assets/img/test.jpg'
  export default {
    components: {
      ToolsHeader
    },
    methods: {
      loadImg () {
        // http://pixijs.download/release/docs/index.html
        const sprite = Sprite.fromImage(test)
        this.app.stage.addChild(sprite)
        sprite.buttonMode = true // 设置鼠标 'pointer'
        sprite.interactive = true // 启用交互事件
        const done = () => {
          sprite.dragging = 0
          sprite.position.set(0, 0)
        }
        sprite.on('pointerdown', event => {
          sprite.dragging = 1
          sprite.dragObjStart = event.data.getLocalPosition(event.currentTarget)
        }).on('pointerup', done).on('pointerupoutside', done).on('pointermove', (event) => {
          if (sprite.dragging) {
            let point = event.data.getLocalPosition(event.currentTarget)
            sprite.position.x += point.x - sprite.dragObjStart.x
            sprite.position.y += point.y - sprite.dragObjStart.y
          }
        })
      }
    },
    mounted () {
      this.app = new Application({
        width: 1019,
        height: 1028,
        transparent: true,
        preserveDrawingBuffer: true
      })
      this.$refs.content.appendChild(this.app.view)
      this.loadImg()
    }
  }
</script>
<style lang="scss">
  .imgcut {
    canvas {
      width: 400px;
    }
  }
</style>