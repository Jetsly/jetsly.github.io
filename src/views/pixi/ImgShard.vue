<template>
  <div class="imgshared">
    <ToolsHeader title="ImgShared" slogan="图片分片工具"></ToolsHeader>
    <div class="content" ref="content">
      <template v-if="!files.length">
        <input type="file" @change="change" multiple></input>
      </template>
    </div>
    <ToolsFooter v-if="files.length">
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
        scale: 1,
        files: []
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
        const files = event.target.files
        Promise.all(Array.prototype.slice.call(files).map(file => new Promise(resolve => {
          this.imgUrl = URL.createObjectURL(file)
          const img = new Image()
          img.onload = () => {
            const w = Math.min(750, img.naturalWidth)
            const h = img.naturalHeight / img.naturalWidth * w
            resolve({
              img: img,
              w,
              h,
              name: file.name,
              type: file.type
            })
          }
          img.src = this.imgUrl
        }))).then(files => {
          let w = 0
          let h = 0
          this.files = files
          this.files.forEach(file => {
            w += file.w
            h = Math.max(file.h, h)
          })
          event.target.value = ''
          this.showImg(w, h)
        })
      },
      showImg (w, h) {
        this.app = new Application({
          height: h,
          width: w + (this.files.length - 1) * 2, // 2 的宽度用于画分割线
          transparent: true,
          preserveDrawingBuffer: true
        })
        if (this.files.length > 1) {
          this.app.view.style.width = `${this.files.length * 200}px`
        }
        this.$refs.content.appendChild(this.app.view)
        let x = 0
        this.files.forEach(file => {
          const bunny = new Sprite(Texture.fromLoader(file.img))
          bunny.position.set(x, 0)
          bunny.width = file.w
          bunny.height = file.h
          bunny.scale.set(this.scale, this.scale)
          x += (bunny.width + 2)
          this.app.stage.addChild(bunny)
        })
        this.container = new Container()
        this.app.stage.addChild(this.container)
        this.changeHei()
      },
      changeHei () {
        this.container.removeChildren()
        const count = Math.ceil(this.app.view.height / this.height)
        if (count !== Infinity) {
          for (var idx = 0; idx < count; idx++) {
            let height = this.height
            if (idx === count - 1) {
              // 减去1为了画出边线
              height = this.app.view.height % this.height - 1
            }
            const graphics = new Graphics()
            graphics.lineStyle(1, 0x0000ff)
            graphics.drawRect(0, 0, this.app.view.width - 1, height - 1)
            graphics.x = 1
            graphics.y = (idx * this.height) + 1
            this.container.addChild(graphics)
            const text = new Text(`第${idx + 1}切片`)
            text.style.fontSize = 20 * this.files.length
            text.style.fill = '#ffffff'
            const textBg = new Graphics()
            textBg.beginFill(0x0000ff)
            textBg.drawRect(0, 0, text.width, text.height)
            textBg.endFill()
            graphics.addChild(textBg)
            graphics.addChild(text)
          }
        }
      },
      shard () {
        var zip = new JSZip()
        this.files.forEach(file => {
          var imgs = zip.folder(file.name)
          let idx = 0
          while (idx * this.height < file.h) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            let height = this.height
            if ((idx + 1) * this.height > file.h) {
              height = file.h % this.height
            }
            canvas.width = file.w
            canvas.height = height
            ctx.drawImage(file.img, 0, idx * this.height, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
            imgs.file(`${file.name.replace(/\.\w+/, val => `${idx + 1}${val}`)}`, canvas.toDataURL(file.type).replace(/^.*?,/, ''), {base64: true})
            idx = idx + 1
          }
        })
        zip.generateAsync({
          type: 'blob'
        }).then(content => {
          download(content, 'imgShard.zip')
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