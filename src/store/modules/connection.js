import axios from 'axios'
export default {
  state: {
    user: {
      name: '',
      icon: ''
    },
    drawer: false
  },
  actions: {
    toggleDrawer ({ commit }) { commit('toggleDrawer') },
    login ({ commit, rootState }, payload) {
      axios.post('http://localhost:5000/api/connection/login', payload).then(response => { rootState.adminConnected = true; commit('login', response.data) }).catch(error => commit('login', error.response.data))
    },
    logout ({ commit, rootState }) {
      axios.post('http://localhost:5000/api/connection/logout')
        .then(response => { rootState.adminConnected = false; commit('logout') })
        .catch(error => console.log(error.response.data))
    }
  },
  mutations: {
    toggleDrawer (state) {
      state.drawer = !state.drawer
    },
    login (state, payload) {
      console.log('essaie login, serv renvoi:', payload)
      if (!payload.error) state.user = payload.infos
    },
    logout (state) {
      state.drawer = false
    }
  },
  getters: {
    getAdminInfos (state) { return state.user },
    getDrawerStatus (state) { return state.drawer }
  }
}
