<template>
  <ShowItems itemsType="defenseItems" :items="getDefenseItems.items"  @deleteBtnClicked="deleteItem" @saveBtnClicked="updateItem" @addElementBtnClicked="createItem"/>
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
    ...mapGetters(['getDefenseItems'])
  },
  methods: {
    ...mapActions(['initItems', 'updateItem', 'createItem', 'deleteItem'])
  },
  mounted () {
    this.initItems({ whichItems: 'defenseItems' })
  }
}
</script>
