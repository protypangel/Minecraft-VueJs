<template>
  <div>
    <v-app style='background: url("https://www.solidbackgrounds.com/download/2560x1440-blue-stained-glass-free-website-background-image.jpg") repeat'>
    <Navbar></Navbar>
    <!--<v-parallax height="100%" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
    </v-parallax>-->
    <p style="margin-top:75px"></p>
    <router-view></router-view>
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
<style>
</style>
