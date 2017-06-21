
import Vue from 'vue'
import App from './App.vue'
import store from 'stores'
import router from 'routers'
// import 'mocks'

import draggable from 'directives/draggable'
import sortable from 'directives/sortable'

Vue.use(draggable)
Vue.use(sortable)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
