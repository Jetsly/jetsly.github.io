import Router from 'vue-router'

import Index from '../views/Index.vue'
import Sprite from '../views/canvas/Sprite.vue'
import Layout from '../views/compt/Layout.vue'

const routes = [{
  path: '/',
  component: Index
}, {
  path: '/canvas/sprite',
  component: Sprite
}, {
  path: '/compt/layout',
  component: Layout
}]
export default new Router({
  routes
})
