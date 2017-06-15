import Router from 'vue-router'

import Inxde
import Sprite from '../views/canvas/Sprite.vue'
import Layout from '../views/compt/Layout.vue'

const routes = [{
  path: '/canvas/sprite',
  component: Sprite
}, {
  path: '/compt/layout',
  component: Layout
}, {
  path: '/',
  redirect: '/canvas/sprite'
}]
export default new Router({
  routes
})
