<template>
<div>
  <v-app-bar
      color="deep-purple accent-4"
      dark
      fixed
      app
    >
      <v-btn text  height="100%" class=" white--text title px-3" >Basics</v-btn>
      <v-btn text  height="100%" class="white--text title px-3">Defense</v-btn>
      <v-btn text  height="100%" class="white--text title px-3">Food </v-btn>
      <v-btn text  height="100%" class="white--text title px-3">Tools</v-btn>
    <v-spacer></v-spacer>
    <LoginDialog></LoginDialog>
  </v-app-bar>
</div>
</template>
<script>
import LoginDialog from '@/components/LoginDialog'

export default {
  data () {
    return {
    }
  },
  components: {
    LoginDialog
  }
}
</script>
