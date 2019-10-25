import axios from 'axios'
export default {
  state: {
    basicItems: [],
    defenseItems: [],
    toolItems: [],
    foodItems: [],
    addElementError: ''
  },
  actions: {
    // si on refresh, après s'être connecté => on continue d'avoir les boutons d'admin
    /// /////////// Create ITEM
    createItem ({ commit, rootState }, payload) {
      // console.log(`et le lien: ${rootState.apiURL}/api/items/${payload.type}`)
      axios.post(`${rootState.apiURL}/api/items/{"whichItems":"${payload.type}"}`, payload)
        .then(response => { commit('createItem', response.data) })
        .catch(error => { commit('createItem', error.response.data); console.log('erreur create: ', error.response.data) })
    },
    /// /////////// Retrieve ITEMS
    initItems ({ commit, rootState }, payload) {
      axios.get(`${rootState.apiURL}/api/items/{"whichItems":"${payload.whichItems}"}`)
        .then((response) => {
          commit('initItems', response.data)
          rootState.adminConnected = response.data.adminConnected
          console.log(response.data)
          if (response.data.infos) rootState.user = response.data.infos
        })
        .catch(error => { console.log(`erreur retrieve ${payload.whichItems} ${error.response.data}`) })
    },
    /// /////////// UPDATE ITEMS
    updateItem ({ commit, rootState }, payload) {
      axios.put(`${rootState.apiURL}/api/items/{"whichItems":"${payload.type}"}`, payload)
        .catch(error => { rootState.adminConnected = false; commit('updateItem', { error: error.response.data, item: payload }) })
    },
    /// /////////// Delete  ITEM
    deleteItem ({ commit, rootState }, payload) {
      console.log('id payload recup:', payload.id)
      axios.delete(`${rootState.apiURL}/api/items/{"id":${payload.id},"whichItems":"${payload.type}"}`)
        .then(response => { commit('initItems', response.data) })
        .catch(error => { rootState.adminConnected = false; console.log('erreur delete: ', error.response.data) })
    }
  },
  mutations: {
    /// /////////// Create
    createItem (state, payload) {
      if (!payload.error) {
        state[payload.type] = payload
        state.addElementError = ''
      } else {
        state.addElementError = payload.error
      }
    },
    /// ///////////  Retrieve
    initItems (state, payload) { state[payload.type] = payload },
    /// /////////// UPDATE ITEM
    updateItem (state, payload) {
      payload.item.enModif = true
      console.log('error lors de l\'update', payload.error)
    }
    /// /////////// Delete  ITEM
  },
  getters: {
    getBasicItems (state) { return state.basicItems },
    getDefenseItems (state) { return state.defenseItems },
    getFoodItems (state) { return state.foodItems },
    getToolItems (state) { return state.toolItems },
    getAddElementError (state) { return state.addElementError }
  }
}
