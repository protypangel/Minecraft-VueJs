<template>
  <ShowItems :items="getFoodItems.items" @saveBtnClicked="updateFood"/>
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
    ...mapGetters(['getFoodItems'])
  },
  methods: {
    ...mapActions(['initFood', 'updateFood', 'isAdminConnected'])
  },
  mounted () {
    this.initFood()
    this.isAdminConnected()
  }
}
</script>
