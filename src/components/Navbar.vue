<template>
  <div>
    <v-toolbar class="green py-0">
      <v-toolbar-title class="grey--text ">
      </v-toolbar-title>
        <v-btn width="100px" height="100%" color="green lighten-1" class="light-green--text text--darken-4 littlemargin title" >Basics</v-btn>
        <v-btn width="100px" height="100%" color="green lighten-1" class="littlemargin light-green--text text--darken-4 title">Defense</v-btn>
        <v-btn width="100px" height="100%" color="green lighten-1" class="littlemargin light-green--text text--darken-4 title">Food</v-btn>
        <v-btn width="100px" height="100%" color="green lighten-1" class="littlemargin light-green--text text--darken-4 title">Tools</v-btn>
      <v-spacer></v-spacer>
      <LoginDialog></LoginDialog>
    </v-toolbar>
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
<style scoped>
.littlemargin {
  margin-right: 1px;
}
</style>
