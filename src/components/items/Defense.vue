<template>
  <ShowItems :items="items"/>
</template>
<script>
import ShowItems from '@/components/ShowItems'
export default {
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
