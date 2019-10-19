import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
// plus tard utiliser axios pour recup ces données de l'api
/* const basicItems = require('@/data/basicItems.json')
const defenseItems = require('@/data/defenseItems.json')
const toolItems = require('@/data/toolItems.json')
const foodItems = require('@/data/foodItems.json') */

export const store = new Vuex.Store({
  state: {
    adminConnected: true,
    basicItems: {},
    defenseItems: {},
    toolItems: {},
    foodItems: {}
  },
  actions: {
    toggleAdmin ({ commit }) {
      commit('toggleAdmin')
    },
    /// /////////// Create ITEM
    /// /////////// Retrieve ITEMS
    initBasic ({ commit }) { axios.get('http://localhost:5000/api/items/basicItems').then((response) => { commit('initBasic', response.data) }) },
    initDefense ({ commit }) { axios.get('http://localhost:5000/api/items/defenseItems').then((response) => { commit('initDefense', response.data) }) },
    initFood ({ commit }) { axios.get('http://localhost:5000/api/items/toolItems').then((response) => { commit('initDefense', response.data) }) },
    initTool ({ commit }) { axios.get('http://localhost:5000/api/items/foodItems').then((response) => { commit('initFood', response.data) }) },
    /// /////////// UPDATE ITEMS
    updateBasic ({ commit }, payload) { axios.put('http://localhost:5000/api/items/basicItems', payload).catch(error => commit('updateBasic', error.response.data)) },
    updateDefense ({ commit }, payload) { axios.put('http://localhost:5000/api/items/defenseItems', payload).catch(error => commit('updateDefense', error.response.data)) },
    updateFood ({ commit }, payload) { axios.put('http://localhost:5000/api/items/toolItems', payload).catch(error => commit('updateFood', error.response.data)) },
    updateTool ({ commit }, payload) { axios.put('http://localhost:5000/api/items/foodItems', payload).catch(error => commit('updateTool', error.response.data)) }
    /// /////////// Delete  ITEM
  },
  mutations: {
    toggleAdmin (state) { state.adminConnected = !state.adminConnected },
    /// /////////// Create ITEM
    /// /////////// Retrieve ITEMS
    initBasic (state, payload) { state.basicItems = payload },
    initDefense (state, payload) { state.defenseItems = payload },
    initFood (state, payload) { state.toolItems = payload },
    initTool (state, payload) { state.foodItems = payload },
    /// /////////// UPDATE ITEM
    updateBasic (state, payload) { console.log('error lors de l\'update', payload) },
    updateDefense (state, payload) { console.log('error lors de l\'update', payload) },
    updateFood (state, payload) { console.log('error lors de l\'update', payload) },
    updateTool (state, payload) { console.log('error lors de l\'update', payload) }
    /// /////////// Delete  ITEM
  },
  getters: {
    getBasicItems (state) { return state.basicItems },
    getDefenseItems (state) { return state.defenseItems },
    getFoodItems (state) { return state.foodItems },
    getToolItems (state) { return state.toolItems }
  }
})
