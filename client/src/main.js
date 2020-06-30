import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
Vue.config.productionTip = false

axios.get('/api/test/school')
  .then(res => res.data)
  .then(school => {
    store.commit('setSchool', school._id);
  })

const token = localStorage.getItem('token')

if (!token || token.length == 0) {
  router.push('Login');
} else {
  store.commit('setToken', token);
  router.push('Home');
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
