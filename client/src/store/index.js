import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    school: ""
  },
  mutations: {
    setSchool(state, value) {
      state.school = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
