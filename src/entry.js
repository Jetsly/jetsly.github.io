
import Vue from 'vue'
import App from './App.vue'
import store from 'stores'
import router from 'routers'
// import 'mocks'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
