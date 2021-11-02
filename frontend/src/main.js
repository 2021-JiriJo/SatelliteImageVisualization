import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false


if(process.env.NODE_ENV == 'development'){
  console.log("Vue Render On Devserver");
  axios.defaults.baseURL = "http://localhost:3000/";
}
else{
  axios.defaults.baseURL = "http://104.198.232.60:3000/";
}
axios.defaults.withCredentials = true;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
