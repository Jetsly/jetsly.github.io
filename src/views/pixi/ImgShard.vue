<template>
  <div class="imgshared">
    <ToolsHeader title="ImgShared" slogan="图片分片工具"></ToolsHeader>
    <div class="content" ref="content">
      <template v-if="!imgUrl">
        <input type="file" @change="change"></input>
      </template>
    </div>
    <ToolsFooter v-if="imgUrl">
      <span class="name">高度:</span><input type="number" v-model="height" @input="changeHei"></input>
      <a href="javascript:;" class="btn-down" @click="shard">下载</a>
    </ToolsFooter>
  </div>
</template>
<script>
  import ToolsHeader from 'components/ToolsHeader'
  import ToolsFooter from 'components/ToolsFooter'
  import JSZip from 'jszip'
  import {
    Application,
    Container,
    Sprite,
    Texture,
    Graphics,
    Text
  } from 'pixi.js'
  import {
    download
  } from 'units/common.js'
  export default {
    components: {
      ToolsHeader,
      ToolsFooter
    },
    data () {
      return {
        height: 1000,
        imgUrl: '',
        fileName: '',
        fileType: ''
      }
    },
    beforeDestroy () {
      if (this.app) {
        document.body.removeChild(this.app.view)
        this.app.destroy()
      }
    },
    methods: {
      change (event) {
        const file = event.target.files[0]
        this.fileName = file.name
        this.fileType = file.type
        this.imgUrl = URL.createObjectURL(file)
        const img = new Image()
        img.onload = () => {
          this.showImg(img)
        }
        img.src = this.imgUrl
      },
      showImg (img) {
        const w = Math.min(750, img.naturalWidth)
        this.app = new Application({
          height: img.naturalHeight / img.naturalWidth * w,
          width: w,
          transparent: true,
          preserveDrawingBuffer: true
        })
        this.appLine = new Application({
          height: img.naturalHeight / img.naturalWidth * w,
          width: w,
          transparent: true
        })
        this.$refs.content.appendChild(this.app.view)
        this.appLine.view.setAttribute('class', 'lineMap')
        this.$refs.content.appendChild(this.appLine.view)
        const bunny = new Sprite(Texture.fromLoader(img))
        bunny.width = this.app.view.width
        bunny.height = this.app.view.height
        this.app.stage.addChild(bunny)
        this.container = new Container()
        this.appLine.stage.addChild(this.container)
        this.changeHei()
      },
      changeHei () {
        this.container.removeChildren()
        const count = Math.ceil(this.app.view.height / this.height)
        for (var idx = 0; idx < count; idx++) {
          let height = this.height
          if (idx === count - 1) {
            height = this.app.view.height % this.height - 1
          }
          const graphics = new Graphics()
          graphics.lineStyle(1, 0x0000ff)
          graphics.drawRect(0, 0, this.app.view.width - 1, height - 1)
          graphics.x = 1
          graphics.y = (idx * this.height) + 1
          this.container.addChild(graphics)
          const text = new Text(`第${idx + 1}切片`)
          text.style.fontSize = 20
          text.style.fill = '#ffffff'
          const textBg = new Graphics()
          textBg.beginFill(0x0000ff)
          textBg.drawRect(0, 0, text.width, text.height)
          textBg.endFill()
          graphics.addChild(textBg)
          graphics.addChild(text)
        }
      },
      shard () {
        const count = Math.ceil(this.app.view.height / this.height)
        var zip = new JSZip()
        for (var idx = 0; idx < count; idx++) {
          let height = this.height
          if (idx === count - 1) {
            height = this.app.view.height % this.height
          }
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = this.app.view.width
          canvas.height = height
          ctx.drawImage(this.app.view, 0, idx * this.height, canvas.width, canvas.height, 0, 0,
            canvas.width,
            canvas.height)
          zip.file(this.fileName.replace(/\.\w+/, val => `${idx + 1}${val}`), canvas.toDataURL(this.fileType)
            .replace(/^.*?,/, ''), {
            base64: true
          })
        }
        zip.generateAsync({
          type: 'blob'
        }).then(content => {
          download(content, this.fileName.replace(/\.\w+/, val => `.zip`))
        })
      }
    }
  }
</script>
<style lang="scss">
  .imgshared .content {
    margin: 10px;
    padding-bottom: 60px;
    position: relative;
    canvas {
      width: 400px;
    }
    .lineMap {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>