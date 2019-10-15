import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// plus tard utiliser axios pour recup ces données de l'api
const basicItems = require('@/data/basicItems.json')
const defenseItems = require('@/data/defenceItems.json')
const toolItems = require('@/data/toolItems.json')
const foodItems = require('@/data/foodItems.json')

export const store = new Vuex.Store({
  state: {
    adminConnected: true,
    basicItems,
    defenseItems,
    toolItems,
    foodItems
  }
})
