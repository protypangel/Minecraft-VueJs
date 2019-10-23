<template>
  <ShowItems itemsType="foodItems" :items="getFoodItems.items" @deleteBtnClicked="deleteItem" @saveBtnClicked="updateItem" @addElementBtnClicked="createItem"/>
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
    ...mapActions(['initItems', 'updateItem', 'createItem', 'deleteItem'])
  },
  mounted () {
    this.initItems({ whichItems: 'foodItems' })
  }
}
</script>
