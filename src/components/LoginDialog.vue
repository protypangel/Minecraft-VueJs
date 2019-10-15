<template>
<v-dialog max-width="600px">

        <template v-slot:activator="{on}">
            <v-btn text class="mx-3 lime accent-2 elevation-5 py-4" v-on="on">Connection</v-btn>
        </template>
        <v-card>
          <v-toolbar color="primary mb-5">
            <v-toolbar-title class="white--text">Login Form</v-toolbar-title>
          </v-toolbar>
          <v-form class="px-3 ml-3 py-3">
            <v-text-field class="mb-4" label="Login" v-model="login" prepend-icon="mdi-account"></v-text-field>
            <v-text-field label="Password" type="password" v-model="password" prepend-icon="mdi-lock"></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" class="px-4 mb-1">LOGIN</v-btn>
            </v-card-actions>
          </v-form>

        </v-card>

    </v-dialog>

</template>
<script>
export default {
  data () {
    return {
      login: '',
      password: ''
    }
  }
}
</script>
