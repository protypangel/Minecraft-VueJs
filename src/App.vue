<template>
  <v-app>
    <Navbar></Navbar>
    <p style="margin-top:75px"></p>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
  }),
  methods: {
    initItems () {
      let basicItems
      let defenseItems
      let toolItems
      let foodItems
      this.axios.get('http://localhost:5000/api/items/basicItems').then((response) => { basicItems = response.data; this.$store.commit('initBasic', { basicItems }) }).catch(error => console.log('error acces api:', error))
      this.axios.get('http://localhost:5000/api/items/defenseItems').then((response) => { defenseItems = response.data; this.$store.commit('initDefense', { defenseItems }) })
      this.axios.get('http://localhost:5000/api/items/toolItems').then((response) => { toolItems = response.data; this.$store.commit('initFood', { toolItems }) })
      this.axios.get('http://localhost:5000/api/items/foodItems').then((response) => { foodItems = response.data; this.$store.commit('initTool', { foodItems }) })
      /* this.$store.commit('initItems', {
        basicItems,
        defenseItems,
        toolItems,
        foodItems
      }) */
    }
  },
  mounted () {
    // this.initItems()
  }
}
</script>
