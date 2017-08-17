import Router from 'vue-router'

import Index from '../views/Index.vue'
import Sprite from '../views/canvas/Sprite.vue'
import ImgRec from '../views/canvas/ImgRec.vue'

import Layout from '../views/compt/Layout.vue'

import ImgShard from '../views/pixi/ImgShard.vue'
import ImgCut from '../views/pixi/ImgCut.vue'

import Door from '../views/aframe/Door.vue'

const routes = [{
  path: '/',
  component: Index
}].concat([{
  path: '/canvas/sprite',
  component: Sprite
}, {
  path: '/canvas/imgrec',
  component: ImgRec
}]).concat([{
  path: '/compt/layout',
  component: Layout
}]).concat([{
  path: '/pixi/imgshard',
  component: ImgShard
}, {
  path: '/pixi/ImgCut',
  component: ImgCut
}]).concat([{
  path: '/aframe/door',
  component: Door
}])
export default new Router({
  routes
})
