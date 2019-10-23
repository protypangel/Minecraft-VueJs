import axios from 'axios'
export default {
  state: {
  },
  actions: {
    login ({ commit, rootState }, payload) {
      axios.post('http://localhost:5000/api/connection/login', payload).then(response => { rootState.adminConnected = true; commit('login', response.data) }).catch(error => commit('login', error.response.data))
    }
  },
  mutations: {
    login (state, payload) {
      console.log('essaie login, serv renvoi:', payload)
    }
  }
}
