import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import socket from './socket'

Vue.config.productionTip = false

new Vue({
  socket,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
