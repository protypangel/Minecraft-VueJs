<template>
  <ShowItems :items="getBasicItems.items" @saveBtnClicked="updateBasic"/>
</template>
<script>
import ShowItems from '@/components/ShowItems'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    ShowItems
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getBasicItems'])
  },
  methods: {
    ...mapActions(['initBasic', 'updateBasic', 'isAdminConnected'])
  },
  mounted () {
    this.initBasic()
    this.isAdminConnected()
  }
}
</script>
