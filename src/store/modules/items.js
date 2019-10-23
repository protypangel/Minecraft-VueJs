import axios from 'axios'
export default {
  state: {
    basicItems: [],
    defenseItems: [],
    toolItems: [],
    foodItems: []
  },
  actions: {
    // si on refresh, après s'être connecté => on continue d'avoir les boutons d'admin
    /// /////////// Create ITEM
    createItem ({ commit, rootState }, payload) {
      // console.log(`et le lien: http://localhost:5000/api/items/${payload.type}`)
      axios.post(`http://localhost:5000/api/items/{"whichItems":"${payload.type}"}`, payload)
        .then(response => { commit('initItems', response.data) })
        .catch(error => { console.log('erreur create: ', error.response.data) })
    },
    /// /////////// Retrieve ITEMS
    initItems ({ commit, rootState }, payload) {
      axios.get(`http://localhost:5000/api/items/{"whichItems":"${payload.whichItems}"}`)
        .then((response) => { commit('initItems', response.data); rootState.adminConnected = response.data.adminConnected })
        .catch(error => { console.log(`erreur retrieve ${payload.whichItems} ${error.response.data}`) })
    },
    /// /////////// UPDATE ITEMS
    updateItem ({ commit, rootState }, payload) {
      axios.put(`http://localhost:5000/api/items/{"whichItems":"${payload.type}"}`, payload)
        .catch(error => { rootState.adminConnected = false; commit('updateItem', { error: error.response.data, item: payload }) })
    },
    /// /////////// Delete  ITEM
    deleteItem ({ commit, rootState }, payload) {
      console.log('id payload recup:', payload.id)
      axios.delete(`http://localhost:5000/api/items/{"id":${payload.id},"whichItems":"${payload.type}"}`)
        .then(response => { commit('initItems', response.data) })
        .catch(error => { rootState.adminConnected = false; console.log('erreur delete: ', error.response.data) })
    }
  },
  mutations: {
    /// /////////// Create  Retrieve  (quand on create, on appelle aussi init pour maj)
    initItems (state, payload) { state[payload.type] = payload },
    /// /////////// UPDATE ITEM
    updateItem (state, payload) {
      // payload.item.enModif = true
      console.log('error lors de l\'update', payload.error)
    }
    /// /////////// Delete  ITEM
  },
  getters: {
    getBasicItems (state) { return state.basicItems },
    getDefenseItems (state) { return state.defenseItems },
    getFoodItems (state) { return state.foodItems },
    getToolItems (state) { return state.toolItems }
  }
}
