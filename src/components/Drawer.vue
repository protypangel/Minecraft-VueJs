<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar size="62">
        <v-img class="ml-12" :src=getAdminInfos.icon></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="white--text ml-6 headline">{{getAdminInfos.name}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <div class="pa-4 mt-4">
      <v-btn block class="title success" color="blue-grey darken-1 mb-4">save</v-btn>
      <v-btn block class="title error" color="blue-grey darken-1 mb-4">cancel</v-btn>
      <v-btn block class="title" color="blue-grey darken-1 mb-4" @click="logout">Logout</v-btn>
    </div>
  </v-list>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getAdminInfos'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
