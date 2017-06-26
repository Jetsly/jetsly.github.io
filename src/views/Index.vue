<template>
    <div class="tools">
        <ToolsHeader title="tools" slogan="个性化工具"></ToolsHeader>
        <div class="content">
            <div class="path" v-for="path in paths">
                <div class="type">{{path.type}}</div>
                <ul class="routers">
                    <template v-for="(router,idx) in path.routers">
                        <router-link tag="li" :to="path.base+router.path">{{router.name}}</router-link>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import ToolsHeader from 'components/ToolsHeader'
    export default {
      components: {
        ToolsHeader
      },
      data () {
        return {
          paths: [{
            type: 'canvas',
            base: '/canvas',
            routers: [{
              name: '帧序列图',
              path: '/sprite'
            }]
          }, {
            type: 'compt',
            base: '/compt',
            routers: [{
              name: '可视化编辑',
              path: '/layout'
            }]
          }, {
            type: 'pixi',
            base: '/pixi',
            routers: [{
              name: '图片分片',
              path: '/ImgShard'
            }]
          }]
        }
      }
    }
</script>
<style lang="scss">
    .tools {
        height: 100%;
        .content {
            padding-top: 20px;
        }
        .path {
            display: flex;
            padding: 8px;
        }
        .type {
            width: 100px;
            text-align: center;
        }
        .routers {
            flex: auto;
            list-style: none;
            font-size: 16px;
            li {
                cursor: pointer;
                display: inline-flex;
                border: 1px solid #dddee1;
                border-radius: 30px;
                padding: 0 9px;
                color: #495060;
                font-size: 14px;
            }
        }
    }
</style>
