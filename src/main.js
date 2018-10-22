// import "@/assets/scss/main.scss";
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import img from './assets/img/background-textures.png';


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
