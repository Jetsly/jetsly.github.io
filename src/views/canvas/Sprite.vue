<template>
    <div>
        <ToolsHeader title="Sprite" slogan="合成雪碧图工具"></ToolsHeader>
        <div class="content">
            <div class="imgs" ref="imgs">
                <img :src="img" v-for="img in imgs" class="imgs-item">
            </div>
            <br/>
            <div class="add-img">
                <input type="file" @change="uploadFile" multiple accept="image/jpeg,image/jpg,image/png" />
            </div>
        </div>
        <div class="footer">
            <span class="name">方向:</span><select v-model="direction">
                <option value="horizontal">水平</option>
                <option value="vertical">垂直</option>
            </select>
            <span class="name">间隔:</span><input type="text" v-model="span" />
            <a href="javascript:;" class="btn-down" @click="compose">下载</a>
        </div>
    </div>
</template>
<script>
    import ToolsHeader from 'components/ToolsHeader'
    export default {
      data () {
        return {
          direction: 'horizontal',
          span: 0,
          imgs: []
        }
      },
      components: {
        ToolsHeader
      },
      methods: {
        uploadFile (event) {
          [].slice.call(event.target.files).forEach(file => {
            this.imgs.push(URL.createObjectURL(file))
          })
        },
        compose () {
          const imgs = this.$refs.imgs.querySelectorAll('img')
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          imgs.forEach((img, idx) => {
            if (idx === 0) {
              canvas.width = img.naturalWidth
              canvas.height = img.naturalHeight
              if (this.direction === 'horizontal') {
                canvas.width = canvas.width * imgs.length
              } else {
                canvas.height = canvas.height * imgs.length
              }
            }
            if (this.direction === 'horizontal') {
              ctx.drawImage(img, idx * img.naturalWidth, 0)
            } else {
              ctx.drawImage(img, 0, idx * img.naturalHeight)
            }
          })
          canvas.toBlob(blob => {
            const a = document.createElement('a')
            a.download = 'sprite.png'
            a.href = URL.createObjectURL(blob)
            a.click()
          }, 'image/png')
        }
      }
    }
</script>
<style lang="scss">
    .content {
        padding: 10px;
        font-size: 0;
        .imgs {
            display: inline-block;
            border: #b7b0b0 1px dashed;
            margin-bottom: 5px;
            &:empty {
                border: none;
            }
        }
        .imgs-item {
            max-width: 100px;
            display: inline-block;
        }
        .add-img {
            display: inline-block;
            position: relative;
            width: 50px;
            height: 50px;
            border: #b7b0b0 1px dashed;
            cursor: pointer;
            &::before,
            &::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: 50px;
                height: 1px;
                background: #a09d9d;
                transform: translate(-50%, -50%)
            }
            &::after {
                transform: translate(-50%, -50%) rotate(90deg);
            }
            input {
                opacity: 0;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                cursor: inherit;
            }
        }
    }

    .footer {
        padding-left: 10px;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 50px;
        line-height: 50px;
        width: 100%;
        border-top: #DDD 1px solid;

        .name {
            padding: 0 5px 0 15px;
        }
        input,
        select {
            padding: 4px 7px;
            font-size: 12px;
            border: 1px solid #dddee1;
            border-radius: 4px;
            color: #495060;
            background-color: #fff;
        }
        .btn-down {
            padding: 4px 7px;
            font-size: 15px;
            border: 1px solid #dddee1;
            border-radius: 4px;
        }
    }
</style>
