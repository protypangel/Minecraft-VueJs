import axios from 'axios'
export default {
  state: {
    errorMessage: '',
    closeConnectionDialog: false
  },
  actions: {
    login ({ commit, rootState }, payload) {
      axios.post(`${rootState.apiURL}/api/connection/login`, payload)
        .then(response => {
          rootState.adminConnected = true
          commit('login', response.data)
          rootState.user = response.data.infos
        })
        .catch(error => commit('login', error.response.data))
    },
    logout ({ rootState }) {
      axios.post(`${rootState.apiURL}/api/connection/logout`)
        .then(response => { rootState.adminConnected = false; rootState.drawer = false; this.closeConnectionDialog = true })
        .catch(error => console.log(error.response.data))
    }
  },
  mutations: {
    login (state, payload) {
      if (payload.error) state.errorMessage = payload
      else state.errorMessage = ''
      console.log('essaie login, serv renvoi:', payload)
    }
  },
  getters: {
    getErrorMessage (state) { return state.errorMessage },
    getCloseConnectionDialog (state) { return state.closeConnectionDialog }
  }
}
