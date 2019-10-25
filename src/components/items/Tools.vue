<template>
  <ShowItems itemsType="toolItems" :items="getToolItems.items" @deleteBtnClicked="deleteItem" @saveBtnClicked="updateItem" @addElementBtnClicked="createItem"/>
</template>
<script>
import ShowItems from './ShowItems'
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
    ...mapActions(['initItems', 'updateItem', 'createItem', 'deleteItem'])
  },
  mounted () {
    this.initItems({ whichItems: 'toolItems' })
  }
}
</script>
