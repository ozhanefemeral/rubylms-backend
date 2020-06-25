import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

store.commit('setSchool', '5ef45965a4ff2c4384375268')

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
