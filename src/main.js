import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store/store'
import VueRouter from 'vue-router'
import Routes from './routes'
Vue.config.productionTip = false
// cette ligne est importante pour les sessions (en mode développement)
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
const router = new VueRouter({
  routes: Routes
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
