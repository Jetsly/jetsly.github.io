<template>
    <div class="imgrec">
        <ToolsHeader title="ImgRec" slogan="图像处理工具"></ToolsHeader>
        <div class="content">
            <div class="resource">
                <img :src="url" />
            </div>
            <div class="result">
                <canvas ref="canvas"></canvas>
            </div>
        </div>
        <ToolsFooter>
            <a href="javascript:;" class="btn-down" @click="refresh">刷新</a>
        </ToolsFooter>
    </div>
</template>
<script>
    // 去噪
    // 二值化
    // 切分
    // 归一化
    // 特征提取
    // 训练模型
    // 再优化
    import ToolsHeader from 'components/ToolsHeader'
    import ToolsFooter from 'components/ToolsFooter'
    export default {
      components: {
        ToolsHeader,
        ToolsFooter
      },
      data () {
        return {
          url: ''
        }
      },
      computed: {
        ctx: function () {
          return this.$refs.canvas.getContext('2d')
        }
      },
      mounted () {
        this.refresh()
      },
      methods: {
        loadImg () {
          return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => resolve(img)
            img.crossOrigin = '*'
            img.src = this.url
          })
        },
        recImg (img) {
          let w = img.naturalWidth
          let h = img.naturalHeight
          this.ctx.drawImage(img, 0, 0)
          var imgData = this.ctx.getImageData(0, 0, w, h)
          // 去噪
          // 灰度
          for (var i = 0, dl = imgData.data.length; i < dl; i += 4) {
            let R = imgData.data[i]
            let G = imgData.data[i + 1]
            let B = imgData.data[i + 2]
            imgData.data[i] = Math.max(R, G, B)
            imgData.data[i + 1] = Math.max(R, G, B)
            imgData.data[i + 2] = Math.max(R, G, B)
          }
          // 二值化
          for (var j = 0, jl = imgData.data.length; j < jl; j += 4) {
            let R = imgData.data[i]
            let D = R >= 127 ? 255 : 0
            // let G = imgData.data[i + 1]
            // let B = imgData.data[i + 2]
            imgData.data[i] = D
            imgData.data[i + 1] = D
            imgData.data[i + 2] = D
          }
          this.ctx.putImageData(imgData, 0, 0)
        },
        refresh () {
          this.url =
                    `//inimg02.jiuyan.info/in/2017/08/16/88D81BAD-7BD8-8357-51C3-E810C0BDF31B.jpeg?${Date.now()}`
          this.loadImg().then(img => {
            this.$refs.canvas.height = img.naturalHeight
            this.$refs.canvas.width = img.naturalWidth
            this.recImg(img)
          })
        }
      }
    }
</script>
<style lang="scss" scoped>
    .imgrec {
        .content {
            display: flex;
            flex-direction: column;
        }
        .result {}
    }
</style>