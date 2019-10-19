<template>
  <ShowItems :items="getBasicItems" @saveBtnClicked="updateBasic"/>
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
    ...mapActions(['initBasic', 'updateBasic'])
  },
  mounted () {
    this.initBasic()
  }
}
</script>
