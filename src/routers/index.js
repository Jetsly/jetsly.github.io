import Router from 'vue-router'

import Sprite from '../views/canvas/Sprite.vue'

const routes = [{
  path: '/canvas/sprite',
  component: Sprite
}, {
  path: '/',
  redirect: '/canvas/sprite'
}]
export default new Router({
  routes
})
