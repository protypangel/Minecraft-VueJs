<template>
  <ShowItems itemsType="basicItems" :items="getBasicItems.items" @deleteBtnClicked="deleteItem" @saveBtnClicked="updateItem" @addElementBtnClicked="createItem"/>
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
    ...mapActions(['initItems', 'updateItem', 'createItem', 'deleteItem'])
  },
  created () {
    this.initItems({ whichItems: 'basicItems' })
  }
}
</script>
