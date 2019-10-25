<template>
  <div style="max-width:80%; margin-left:auto; margin-right: auto; text-align: center">
    <table class="my-5">
      <thead>
        <th style="width:220px; border-left:3px solid #0091EA">Name</th>
        <th style="width:400px">Ingredients</th>
        <th style="width:200px">Image</th>
        <th style="width:400px; border-right:3px solid #0091EA">Description</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <!-- Tout ce qui s'affiche pour tout le monde -->
          <td class="title" v-if="!item.enModif">{{item.name}}</td>
          <td class="title" v-if="!item.enModif" id="tdIngredients">{{item.ingredients}}</td>
          <td class="title" v-if="!item.enModif"><img :src="item.icon" width="204px" height="112px"></td>
          <td class="title" v-if="!item.enModif">{{item.description}}</td>
          <!-- Tout ce qui s'affiche que pour l'admin -->
          <template v-if="getAdminConnected">
            <template v-if="item.enModif">
              <td><v-text-field label="Name" v-model="item.name"></v-text-field></td>
              <td class="ingredientsCol"><v-text-field label="Ingredients" v-model="item.ingredients"></v-text-field></td>
              <td><v-text-field label="Image URL" v-model="item.icon"></v-text-field></td>
              <td><v-text-field label="Description" v-model="item.description"></v-text-field></td>
              <!-- bouton validation modifs -->
              <v-btn class="mx-2 my-4" style="display:block" fab dark small color="success" @click="saveBtnClicked(index)" v-if="item.enModif"><v-icon dark>mdi-check</v-icon></v-btn>
            </template>
            <!-- bouton supprimer element -->
            <v-btn class="mx-2 my-4 mt-5 red accent-3" style="display:block" fab dark small @click="deleteBtnClicked(index)"><v-icon dark>mdi-minus</v-icon></v-btn>
            <template v-if="!item.enModif">
              <!-- bouton passer en mode modifs -->
              <v-btn class="mx-2 my-4" style="display:block" fab dark small color="warning" v-if="!item.enModif" @click="item.enModif=true"><v-icon dark>mdi-pencil</v-icon></v-btn>
            </template>
          </template>
        </tr>
        <!-- Ligne qui permet d'ajouter un nouvel element -->
        <tr v-if="getAdminConnected">
          <td><v-text-field label="Name" v-model="newItem.name"></v-text-field></td>
          <td class="ingredientsCol"><v-text-field label="Ingredients" v-model="newItem.ingredients"></v-text-field></td>
          <td><v-text-field label="Image URL" v-model="newItem.icon"></v-text-field></td>
          <td><v-text-field label="Description" v-model="newItem.description"></v-text-field></td>
          <!-- bouton ajout nouvel element -->
          <v-btn class="mx-2 mt-6" fab dark small color="teal accent-3" @click="addElementBtnClicked"><v-icon dark>mdi-plus</v-icon></v-btn>
        </tr>
      </tbody>
    </table>
    <p class="red--text text--darken-3 text-uppercase title">{{getAddElementError}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['items', 'itemsType'],
  data () {
    return {
      newItem: {}
    }
  },
  mounted () {
    console.log('items recup dans showitems:', this.items)
  },
  methods: {
    saveBtnClicked (index) {
      this.items[index].enModif = !this.items[index].enModif
      this.$emit('saveBtnClicked', this.items[index])
    },
    deleteBtnClicked (index) {
      this.$emit('deleteBtnClicked', this.items[index])
    },
    addElementBtnClicked () {
      this.newItem.name = this.newItem.name || ''
      this.newItem.icon = this.newItem.icon || ''
      this.newItem.description = this.newItem.description || ''
      this.newItem.ingredients = this.newItem.ingredients || ''
      this.newItem.enModif = false
      this.newItem.type = this.itemsType || 'basicItems'
      this.$emit('addElementBtnClicked', this.newItem)
      this.newItem = {}
    }
  },
  computed: {
    ...mapGetters(['getAdminConnected', 'getAddElementError'])
  }
}
</script>

<style scoped>
  table {
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
  }
  td {
    border: 3px solid #424242;
    padding: 10px;
    font-size: 1.2em;
    min-height: 140;
    text-align: center;
    color: #1A237E; /* rgb(8, 100, 80); */
    background: #C6C6C6;
  }
  #tdIngredients {
    min-width: 400px;
  }
  thead {
    background-color: #0091EA;
    color: #FFF;
    height: 60px;
    font-size: 1.4em;
    text-transform: uppercase;
    padding: 2px
  }

</style>
