<template>
  <ShowItems :items="getToolItems.items" @saveBtnClicked="updateTool"/>
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
    ...mapGetters(['getToolItems'])
  },
  methods: {
    ...mapActions(['initTool', 'updateTool', 'isAdminConnected'])
  },
  mounted () {
    this.initTool()
    this.isAdminConnected()
  }
}
</script>
