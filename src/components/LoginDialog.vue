<template>
<v-dialog max-width="600px" v-model="loginDialog">

        <template v-slot:activator="{on}">
            <v-btn class="deep-purple accent-2 "  v-on="on">Connection</v-btn>
        </template>
        <v-card>
          <v-toolbar color="deep-purple accent-4 mb-5">
            <v-toolbar-title class="white--text">Login Form</v-toolbar-title>
          </v-toolbar>
          <v-form class="px-3 ml-3 py-3">
            <v-text-field class="mb-4" label="Name" v-model="infos.name" prepend-icon="mdi-account"></v-text-field>
            <v-text-field label="Password" type="password" v-model="infos.password" prepend-icon="mdi-lock"></v-text-field>
            <p class="ml-12 red--text">{{getErrorMessage}}</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="deep-purple accent-2" class=" white--text px-4 mb-1" @click="validateBtnClicked(infos)">LOGIN</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>

    </v-dialog>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      loginDialog: false,
      infos: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    validateBtnClicked (infos) {
      if (this.getCloseConnectionDialog) this.loginDialog = false
      this.login(infos)
    }
  },
  computed: {
    ...mapGetters(['getErrorMessage', 'getCloseConnectionDialog'])
  }
}
</script>
