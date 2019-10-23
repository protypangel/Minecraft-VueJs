<template>
<div>
  <v-app-bar
      color="deep-purple accent-4"
      dark
      fixed
      app
    >
      <v-btn text  height="100%" class=" white--text title px-3" @click="basicsClicked" >Basics</v-btn>
      <v-btn text  height="100%" class="white--text title px-3" @click="defenseClicked">Defense</v-btn>
      <v-btn text  height="100%" class="white--text title px-3" @click="foodClicked">Food </v-btn>
      <v-btn text  height="100%" class="white--text title px-3" @click="toolsClicked">Tools</v-btn>
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
  methods: {
    basicsClicked () {
      this.$router.push('/basics')
    },
    defenseClicked () {
      this.$router.push('/defense')
    },
    foodClicked () {
      this.$router.push('/food')
    },
    toolsClicked () {
      this.$router.push('/tools')
    }
  },
  components: {
    LoginDialog
  }
}
</script>
