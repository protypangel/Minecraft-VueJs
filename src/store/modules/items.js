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
    isAdminConnected ({ rootState }) { axios.get('http://localhost:5000/api/items/basicItems').then((response) => { rootState.adminConnected = response.data.adminConnected }) },
    //
    /// /////////// Create ITEM
    createItem ({ commit }, payload) {
      // console.log(`et le lien: http://localhost:5000/api/items/${payload.type}`)
      axios.post(`http://localhost:5000/api/items/${payload.type}`, payload)
        .then(response => { commit('initItems', response.data) })
        .catch(error => { console.log('erreur create: ', error.response.data) })
    },
    /// /////////// Retrieve ITEMS
    initItems ({ commit }, payload) {
      axios.get(`http://localhost:5000/api/items/${payload.whichItems}`)
        .then((response) => { commit('initItems', response.data) })
        .catch(error => { console.log(`erreur retrieve ${payload.whichItems} ${error.response.data}`) })
    },
    /// /////////// UPDATE ITEMS
    updateItem ({ commit }, payload) {
      axios.put(`http://localhost:5000/api/items/${payload.type}`, payload)
        .catch(error => commit('updateItem', error.response.data))
    },
    /// /////////// Delete  ITEM
    deleteItem ({ commit }, payload) {
      console.log('id payload recup:', payload.id)
      // console.log(`et le lien: http://localhost:5000/api/items/${payload.type}`)
      axios.delete(`http://localhost:5000/api/items/${payload.type}`)
        .then(response => { commit('initItems', response.data) })
        .catch(error => { console.log('erreur delete: ', error.response.data) })
    }
  },
  mutations: {
    /// /////////// Create  Retrieve  (quand on create, on appelle aussi init pour maj)
    initItems (state, payload) { state[payload.type] = payload },
    /// /////////// UPDATE ITEM
    updateItem (state, payload) { console.log('error lors de l\'update', payload) }
    /// /////////// Delete  ITEM
  },
  getters: {
    getBasicItems (state) { return state.basicItems },
    getDefenseItems (state) { return state.defenseItems },
    getFoodItems (state) { return state.foodItems },
    getToolItems (state) { return state.toolItems }
  }
}
