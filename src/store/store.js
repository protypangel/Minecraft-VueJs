import Vue from 'vue'
import Vuex from 'vuex'
import itemsModule from './modules/items'
import connectionModule from './modules/connection'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    adminConnected: false,
    user: {
      name: '',
      icon: ''
    },
    drawer: false,
    apiURL: ''//    192.168.1.23:5000
  },
  modules: {
    itemsModule,
    connectionModule
  },
  actions: {
    toggleDrawer ({ commit }) { commit('toggleDrawer') }
  },
  mutations: {
    toggleDrawer (state) {
      state.drawer = !state.drawer
    }
  },
  getters: {
    getAdminConnected (state) {
      return state.adminConnected
    },
    getDrawerStatus (state) { return state.drawer },
    getAdminInfos (state) { return state.user }
  }
})
