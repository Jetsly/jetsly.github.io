<template>
    <div class="layout">
        <ToolsHeader title="Layout" slogan="可视化编辑"></ToolsHeader>
        <div class="content">
            <!--名字列表-->
            <LayoutCompts :comptsName="comptsName"></LayoutCompts>
            <!--预览区域-->
            <LayoutViews>
                <div class="phone" v-dropzone="">

                </div>
            </LayoutViews>
            <!--编辑区域 右边划入-->
            <div class="opt">

            </div>
        </div>
    </div>
</template>
<script>
    // http://www.bootcss.com/p/layoutit/
    import compts from 'components/compt/index.js'
    import ToolsHeader from 'components/ToolsHeader'
    import LayoutCompts from 'components/layout/LayoutCompts'
    import LayoutViews from 'components/layout/LayoutViews'
    export default {
      components: {
        ToolsHeader,
        LayoutCompts,
        LayoutViews
      },
      computed: {
        comptsName: () => Object.keys(compts).map(key => ({
          key: key,
          displayName: compts[`${key}`].displayName
        }))
      }
    }
</script>
<style lang="scss">
    .layout {
        height: 100%;
        .content {
            height: calc(100% - 50px);
            display: flex;
            flex-direction: row;
        }

        .opt {
            height: 100%;
        }
    }
</style>
