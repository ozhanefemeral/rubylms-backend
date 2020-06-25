import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

store.commit('setSchool', '5ef4d1dbe3aa7d3804783d4f')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
