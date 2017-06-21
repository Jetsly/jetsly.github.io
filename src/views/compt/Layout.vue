  <template>
  <div class="layout" @click="optIdx = -1">
    <ToolsHeader title="Layout" slogan="可视化编辑"></ToolsHeader>
    <div class="content">
      <!--名字列表-->
      <LayoutCompts :comptsName="comptsName"></LayoutCompts>
      <!--预览区域-->
      <LayoutViews @drop="drop" @sort="sort" @opt="opt">
        <template v-for="(compt,idx) in compts">
          <EmptyCompt v-if="idx === emptyIdx"></EmptyCompt>
          <DynamicCompt :is="compt.type" view="view" :model="compt.model"></DynamicCompt>
        </template>
        <EmptyCompt v-if="emptyIdx === -1"></EmptyCompt>
      </LayoutViews>
      <!--编辑区域 右边划入-->
      <transition name="slide-fade">
        <div class="opt" @click.stop v-if="optIdx >= 0 && optIdx < compts.length">
          <component :is="compts[this.optIdx].type" view="opt" :model="compts[this.optIdx].model "></component>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  // http://www.bootcss.com/p/layoutit/
  import compts from 'components/compt/index.js'
  import ToolsHeader from 'components/ToolsHeader'
  import LayoutCompts from 'components/layout/LayoutCompts'
  import LayoutViews from 'components/layout/LayoutViews'
  const EmptyCompt = {
    render: h => h('div', {
      'class': 'emptyCompt'
    })
  }
  export default {
    data () {
      return {
        comptsName: Object.keys(compts).map(key => ({
          key: key,
          compt: compts[`${key}`]
        })),
        compts: [],
        optIdx: -1,
        emptyIdx: undefined
      }
    },
    components: {
      ToolsHeader,
      LayoutCompts,
      LayoutViews,
      EmptyCompt,
      ...compts
    },
    methods: {
      drop ({
        type,
        data
      }) {
        if (type === 'progress' && (data === -1 || this.emptyIdx !== data) || ~['done', 'leave'].indexOf(type)) {
          if (~['done', 'leave'].indexOf(type)) {
            data && this.compts.splice(this.emptyIdx === -1 ? this.compts.length : this.emptyIdx, 0, {
              type: data,
              model: compts[`${data}`].props.model.default()
            })
            this.emptyIdx = undefined
          } else {
            this.emptyIdx = data
          }
        }
      },
      sort ({
        from,
        to
      }) {
        const [move] = this.compts.splice(from, 1)
        this.compts.splice(to, 0, move)
      },
      opt (idx) {
        this.optIdx = idx
      }
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
      position: relative;
      overflow: hidden;
    }
    .opt {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 250px;
      z-index: 10;
      padding-left: 3px;
      box-shadow: 4px 10px 24px rgba(144, 134, 134, 0.75);
      background: #f5f5f5;
    }

    .slide-fade-enter-active,
    .slide-fade-leave-active {
      transition: transform .3s linear;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
      transform: translateX(100%);
    }
  }
</style>
