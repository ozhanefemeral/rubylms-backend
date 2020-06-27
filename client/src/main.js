import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

store.commit('setSchool', "5ef66e3472b9a227d0ff15ab")

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
