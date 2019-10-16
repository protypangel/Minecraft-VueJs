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
  }
}
</script>
