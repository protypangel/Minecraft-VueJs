<template>
  <div>
    <table>
      <thead>
        <th>Name</th>
        <th>Ingredients</th>
        <th>Image</th>
        <th>Description</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in basicItems" :key="item.id">
          <td v-if="!item.enModif">
            {{item.name}}
          </td>
          <td v-if="adminConnected && item.enModif">
            <v-text-field label="Name" v-model="item.name"></v-text-field>
          </td>
          <td v-if="!item.enModif" id="tdIngredients">
            {{item.ingredients}}
          </td>
          <td v-if="adminConnected && item.enModif" class="ingredientsCol">
            <v-text-field label="Ingredients" v-model="item.ingredients"></v-text-field>
          </td>
          <td v-if="!item.enModif">
            <img :src="item.icon">
          </td>
          <td v-if="adminConnected && item.enModif">
            <v-text-field label="Image URL" v-model="item.icon"></v-text-field>
          </td>
          <td class="lastCol" v-if="!item.enModif">
            {{item.description}}
          </td>
          <td v-if="adminConnected && item.enModif" class="lastColumn">
            <v-text-field label="Description" v-model="item.description"></v-text-field>
          </td>
          <!-- bouton validation modifs -->
          <v-btn class="mx-2" fab dark small color="success" @click="item.enModif=false" v-if="item.enModif">
            <v-icon dark>mdi-check</v-icon>
          </v-btn>
          <!-- bouton supprimer element -->
          <v-btn class="mx-2" fab dark small color="error" @click="deleteBtnClicked(index)">
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <!-- bouton passer en mode modifs -->
          <v-btn class="mx-2" fab dark small color="warning" v-if="!item.enModif" @click="item.enModif=true">
            <v-icon dark>mdi-pencil</v-icon>
          </v-btn>
        </tr>
        <!-- Ligne qui permet d'ajouter un nouvel element -->
        <tr v-if="adminConnected">
          <td>
            <v-text-field label="Name" v-model="newItem.name"></v-text-field>
          </td>
          <td class="ingredientsCol">
            <v-text-field label="Ingredients" v-model="newItem.ingredients"></v-text-field>
          </td>
          <td>
            <v-text-field label="Image URL" v-model="newItem.icon"></v-text-field>
          </td>
          <td class="lastColumn">
            <v-text-field label="Description" v-model="newItem.description"></v-text-field>
          </td>
          <!-- bouton ajout nouvel element -->
          <v-btn class="mx-2" fab dark small color="cyan" @click="addElementBtnClicked">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </tr>
      </tbody>
    </table>
    <!-- bouton pour valider updates -->
    <div class="my-2 validation">
      <v-btn large color="primary" id="validateAllButton">Valider</v-btn>
    </div>
  </div>
</template>

<script>
const basicItems = require('../data/basicItems.json')

export default {
  data () {
    return {
      basicItems,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Ingredients', value: 'ingredients' },
        { text: 'Image', value: 'icon' },
        { text: 'Description', value: 'description' }
      ],
      adminConnected: true,
      newItem: { enModif: false, id: basicItems[basicItems.length - 1].id + 1, type: basicItems[0].type }
    }
  },
  created () {
    console.log(this.basicItems)
  },
  methods: {
    editBtnClicked (index) {
      this.basicItems[index].enModif = !this.basicItems[index].enModif
    },
    saveBtnClicked (index) {
      this.basicItems[index].enModif = !this.basicItems[index].enModif
    },
    deleteBtnClicked (index) {
      this.basicItems.splice(index, 1)
      // console.log(this.basicItems)
    },
    addElementBtnClicked () {
      this.basicItems.push(this.newItem)
      this.newItem = { enModif: false, id: basicItems[basicItems.length - 1].id + 1, type: basicItems[0].type }
    }
  }
}
</script>

<style scoped>
  table {
    margin: 30px 30px;
    border-left: 1px solid rgb(146, 189, 26);
  }
  td {
    border: 2px solid rgb(146, 189, 26);
    padding: 10px;
    font-size: 1.2em;
    max-width: 550px;
    min-width: 250px;
    min-height: 140;
    text-align: center;
    color: rgb(8, 100, 80);
    background: rgb(221, 226, 221);
  }
  td.lastCol {
    max-width: 500px;
  }
  #tdIngredients {
    min-width: 400px;
  }
  .mx-2 {
    display: block;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  thead {
    background-color: rgb(146, 189, 26);
    color: rgb(217, 240, 12);
    height: 60px;
    font-size: 1.4em;
    text-transform: uppercase;
  }
  .validation {
    text-align: center;
  }
  #validateAllButton {
    display: block;
    margin: 50px auto;
  }
</style>
