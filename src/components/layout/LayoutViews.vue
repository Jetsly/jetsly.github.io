<template>
    <div class="views">
        <div class="phone iphone6">
            <div class="phone-head"></div>
            <div class="phone-body">
                <div class="phone-content" @click="optAction" v-dropzone="dropAction" v-sortable="sortAction">
                    <slot></slot>
                </div>
            </div>
            <div class="phone-foot"></div>
        </div>
    </div>
</template>
<script>
    export default {
      mounted () {
        document.documentElement.style.fontSize = '75px'
      },
      beforeDestroy () {
        document.documentElement.style.fontSize = ''
      },
      methods: {
        dropAction (type, data) {
          this.$emit('drop', {
            type,
            data
          })
        },
        sortAction (type, data) {
          this.$emit('sort', data)
        },
        optAction (e) {
          if (e.target === e.currentTarget) return
          let target = e.target
          while (target.parentNode !== e.currentTarget) {
            target = target.parentNode
          }
          this.$emit('opt', [].slice.call(e.currentTarget.children).indexOf(target))
          e.stopPropagation()
        }
      }
    }
</script>
<style lang="scss">
    .layout .views {
        height: 100%;
        flex: auto;
        text-align: center;
        .phone {
            margin-top: 20px;
            margin-left: 20px;
            border-radius: 25px;
            box-shadow: 0px 20px 120px rgba(0, 0, 0, 0.3);
            &.iphone6 {
                width: 375px;
                height: 667px+100px;
                .phone-body {
                    height: 667px;
                }
                .phone-content {
                    overflow-x: auto;
                    width: 750px;
                    height: 1334px;
                    transform: scale(.5);
                    transform-origin: 0 0;
                    &::-webkit-scrollbar{
                        display: none;
                    }
                }
            }
        }
        .phone-head {
            height: 40px;
            background: linear-gradient(60deg, rgba(250, 250, 250, 1) 25%, rgba(210, 210, 210, 1));
            border-radius: 25px 25px 0 0;
            padding-top: 15px;
            border-bottom: 1px solid #eee;
            &::after {
                height: 8px;
                width: 50px;
                margin: 0 auto;
                background-color: #ccc;
                border-radius: 4px;
                content: '';
                display: block;
            }
        }
        .phone-body {
            z-index: 1;
            background: #fff;
            position: relative;
            text-align: left;
            .emptyCompt {
                outline: 1px dashed #ccc;
                height: 50px;
            }
        }
        .phone-foot {
            height: 60px;
            background: linear-gradient(60deg, rgba(250, 250, 250, 1) 25%, rgba(210, 210, 210, 1));
            border-radius: 0 0 25px 25px;
            border-top: 1px solid #eee;
            position: relative;
            &::after {
                content: '';
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                height: 34px;
                width: 34px;
                border: 6px solid #ccc;
                border-radius: 50%;
                margin: 0 auto;
                -webkit-transform: translate(-50%, -50%);
            }
        }
    }
</style>
