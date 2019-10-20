<template>
  <ShowItems :items="getDefenseItems.items" @saveBtnClicked="updateDefense"/>
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
    ...mapGetters(['getDefenseItems'])
  },
  methods: {
    ...mapActions(['initDefense', 'updateDefense', 'isAdminConnected'])
  },
  mounted () {
    this.initDefense()
    this.isAdminConnected()
  }
}
</script>
