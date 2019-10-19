<template>
  <ShowItems :items="items"/>
</template>
<script>
import ShowItems from '@/components/ShowItems'
export default {
  created () {
    // this.$store.commit('toggleAdmin')
    console.log(this.$store.state.adminConnected)
  },
  components: {
    ShowItems
  },
  data () {
    return {
    }
  },
  computed: {
    items () {
      return this.$store.state.defenseItems
    }
  }
}
</script>
