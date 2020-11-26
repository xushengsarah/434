import Vue from 'vue'
import Vuex from 'vuex'
import {state, getters, mutations, actions} from './global'
import businessMonitor from './modules/businessMonitor'
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    businessMonitor,
}
})

export default store
