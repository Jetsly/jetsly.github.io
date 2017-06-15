
import Vue from 'vue'
import App from './App.vue'
import store from 'stores'
import router from 'routers'
// import 'mocks'

import draggable from 'directives/draggable'

Vue.use(draggable)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
