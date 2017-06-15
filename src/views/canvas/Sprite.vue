<template>
    <div>
        <ToolsHeader title="Sprite" slogan="合成雪碧图工具"></ToolsHeader>
        <div class="content">
            <div class="imgs" ref="imgs" :class="direction">
                <img @dragstart="dragstart" @drop.prevent="moveImg" @dragover.prevent
                     :src="img.src" :title="img.title" v-for="(img,idx) in imgs" 
                     :index="idx"
                     :key="idx" class="imgs-item" :style="itemsStyle">
            </div>
            <template v-if="direction === 'horizontal'">
                <br />
            </template>
            <div class="add-img" :class="direction">
                <input type="file" @change="uploadFile" multiple accept="image/jpeg,image/jpg,image/png" />
            </div>
            <div class="del-img" data-tips="把元素拖到此处删除" :class="direction" @drop.prevent="delImg" @dragover.prevent></div>
        </div>
        <div class="footer">
            <span class="name">方向:</span><select v-model="direction">
                <option value="horizontal">水平</option>
                <option value="vertical">垂直</option>
            </select>
            <span class="name">间隔:</span><input type="number" v-model="span" />
            <a href="javascript:;" class="btn-down" @click="compose">下载</a>
        </div>
    </div>
</template>
<script>
    import ToolsHeader from 'components/ToolsHeader'
    import 'units/toBlobPolyfill'
    export default {
      data () {
        return {
          direction: 'horizontal',
          span: 0,
          imgs: []
        }
      },
      computed: {
        itemsStyle: function () {
          let changeStyle = 'margin-bottom'
          if (this.direction === 'horizontal') {
            changeStyle = 'margin-right'
          }
          const style = {}
          style[`${changeStyle}`] = `${this.span}px`
          return style
        }
      },
      components: {
        ToolsHeader
      },
      methods: {
        uploadFile (event) {
          [].slice.call(event.target.files).forEach(file => {
            this.imgs.push({
              src: URL.createObjectURL(file),
              title: file.name
            })
          })
        },
        dragstart (event) {
          event.dataTransfer.setData('Text', [].slice.call(event.target.parentElement.children).indexOf(event.target))
        },
        delImg (event) {
          const index = parseFloat(event.dataTransfer.getData('Text'))
          this.imgs.splice(index, 1)
        },
        moveImg (event) {
          const curIndex = [].slice.call(event.target.parentElement.children).indexOf(event.target)
          const index = parseFloat(event.dataTransfer.getData('Text'))
          this.imgs.splice(curIndex, 0, ...this.imgs.splice(index, 1))
        },
        compose () {
          const imgs = this.$refs.imgs.querySelectorAll('img')
          if (imgs.length === 0) return ''
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          let downName = 'sprite.png'
          imgs.forEach((img, idx) => {
            if (idx === 0) {
              canvas.width = img.naturalWidth
              canvas.height = img.naturalHeight
              if (this.direction === 'horizontal') {
                canvas.width = canvas.width * imgs.length + (imgs.length - 1) * parseFloat(this.span)
              } else {
                canvas.height = canvas.height * imgs.length + (imgs.length - 1) * parseFloat(this.span)
              }
              downName = `${img.getAttribute('title').replace(/.\w+$/, downName)}`
            }
            if (this.direction === 'horizontal') {
              ctx.drawImage(img, idx * (img.naturalWidth + parseFloat(this.span)), 0)
            } else {
              ctx.drawImage(img, 0, idx * (img.naturalHeight + parseFloat(this.span)))
            }
          })
          canvas.toBlob(blob => {
            const a = document.createElement('a')
            a.download = downName
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
            border: #b7b0b0 1px dotted;
            margin-bottom: 5px;
            &:empty {
                border: none;
            }
            &.horizontal {
                white-space: nowrap;
                max-width: 100%;
                border-bottom: none;
                overflow-x: auto;
            }
            &.vertical {
                max-width: 100px;
                box-sizing: content-box;
            }
        }
        .imgs-item {
            max-width: 100px;
            display: inline-block;
            &:last-child {
                margin-bottom: 0 !important;
                margin-right: 0 !important;
            }
        }
        .del-img,
        .add-img {
            display: inline-block;
            position: relative;
            width: 50px;
            height: 50px;
            border: #b7b0b0 1px dotted;
            cursor: pointer;
            vertical-align: middle;
            &.vertical {
                vertical-align: top;
                margin-left: 10px;
            }
        }
        .del-img {
            margin-left: 10px;
            font-size: 14px;
            text-align: center;
            &::before,
            &::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: 50%;
                border-top: #c12b2b 1px solid;
                transform: translate(-50%, -50%) rotate(45deg);
            }
            &::after {
                transform: translate(-50%, -50%) rotate(135deg);
            }
        }
        .add-img {
            &::before,
            &::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                width: 50%;
                border-top: #a09d9d 1px solid;
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
