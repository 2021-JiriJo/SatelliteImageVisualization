import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$apiServerDev = "localhost:3000/";
Vue.prototype.$apiServer = "104.198.232.60:3000/";
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
