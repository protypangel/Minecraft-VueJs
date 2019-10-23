<template>
<div>
  <v-app-bar
      color="deep-purple accent-4" dark fixed app
      >
      <v-app-bar-nav-icon v-if="getAdminConnected" @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-btn text  height="100%" class=" white--text title px-3" @click="basicsClicked" >Basics</v-btn>
      <v-btn text  height="100%" class="white--text title px-3" @click="defenseClicked">Defense</v-btn>
      <v-btn text  height="100%" class="white--text title px-3" @click="foodClicked">Food </v-btn>
      <v-btn text  height="100%" class="white--text title px-3" @click="toolsClicked">Tools</v-btn>
    <v-spacer></v-spacer>
    <LoginDialog v-if="!getAdminConnected"></LoginDialog>
  </v-app-bar>
  <v-navigation-drawer v-if="getDrawerStatus" app color="deep-purple accent-3" >
    <Drawer></Drawer>
  </v-navigation-drawer>
</div>
</template>
<script>
import LoginDialog from '@/components/LoginDialog'
import Drawer from '@/components/Drawer'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    basicsClicked () {
      this.$router.replace('/basics')
    },
    defenseClicked () {
      this.$router.replace('/defense')
    },
    foodClicked () {
      this.$router.replace('/food')
    },
    toolsClicked () {
      this.$router.replace('/tools')
    },
    ...mapActions(['toggleDrawer'])
  },
  computed: {
    ...mapGetters(['getAdminConnected', 'getDrawerStatus'])
  },
  components: {
    LoginDialog,
    Drawer
  }
}
</script>
