<template>
  <div>
    <v-app>
    <Navbar></Navbar>
    <v-parallax height="100%" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <p style="margin-top:75px"></p>
      <router-view></router-view>
    </v-parallax>
  </v-app>
  </div>
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

  },
  mounted () {
  }
}
</script>
