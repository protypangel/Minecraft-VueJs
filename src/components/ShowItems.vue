<template>
  <div>
    <table class="my-5">
      <thead>
        <th style="width:250px">Name</th>
        <th style="width:550px">Ingredients</th>
        <th style="width:204px">Image</th>
        <th style="width:500px">Description</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <!-- Tout ce qui s'affiche pour tout le monde -->
          <td v-if="!item.enModif">{{item.name}}</td>
          <td v-if="!item.enModif" id="tdIngredients">{{item.ingredients}}</td>
          <td v-if="!item.enModif"><img :src="item.icon"></td>
          <td v-if="!item.enModif">{{item.description}}</td>
          <!-- Tout ce qui s'affiche que pour l'admin -->
          <template v-if="adminConnected">
            <template v-if="item.enModif">
              <td><v-text-field label="Name" v-model="item.name"></v-text-field></td>
              <td class="ingredientsCol"><v-text-field label="Ingredients" v-model="item.ingredients"></v-text-field></td>
              <td><v-text-field label="Image URL" v-model="item.icon"></v-text-field></td>
              <td><v-text-field label="Description" v-model="item.description"></v-text-field></td>
              <!-- bouton validation modifs -->
              <v-btn class="mx-2" fab dark small color="success" @click="item.enModif=false" v-if="item.enModif"><v-icon dark>mdi-check</v-icon></v-btn>
            </template>
            <!-- bouton supprimer element -->
            <v-btn class="mx-2" fab dark small color="error" @click="deleteBtnClicked(index)"><v-icon dark>mdi-minus</v-icon></v-btn>
            <template v-if="!item.enModif">
              <!-- bouton passer en mode modifs -->
              <v-btn class="mx-2" fab dark small color="warning" v-if="!item.enModif" @click="item.enModif=true"><v-icon dark>mdi-pencil</v-icon></v-btn>
            </template>
          </template>
        </tr>
        <!-- Ligne qui permet d'ajouter un nouvel element -->
        <tr v-if="adminConnected">
          <td><v-text-field label="Name" v-model="newItem.name"></v-text-field></td>
          <td class="ingredientsCol"><v-text-field label="Ingredients" v-model="newItem.ingredients"></v-text-field></td>
          <td><v-text-field label="Image URL" v-model="newItem.icon"></v-text-field></td>
          <td><v-text-field label="Description" v-model="newItem.description"></v-text-field></td>
          <!-- bouton ajout nouvel element -->
          <v-btn class="mx-2" fab dark small color="cyan" @click="addElementBtnClicked"><v-icon dark>mdi-plus</v-icon></v-btn>
        </tr>
      </tbody>
    </table>
    <!-- bouton pour valider updates -->
    <div class="my-2 validation"><v-btn large color="primary" id="validateAllButton">Validate Changes</v-btn></div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Ingredients', value: 'ingredients' },
        { text: 'Image', value: 'icon' },
        { text: 'Description', value: 'description' }
      ],
      adminConnected: true,
      newItem: { enModif: false, id: this.items[this.items.length - 1].id + 1, type: this.items[0].type }
    }
  },
  created () {
    console.log(this.items)
  },
  methods: {
    editBtnClicked (index) {
      this.items[index].enModif = !this.items[index].enModif
    },
    saveBtnClicked (index) {
      this.items[index].enModif = !this.items[index].enModif
    },
    deleteBtnClicked (index) {
      this.items.splice(index, 1)
      // console.log(this.items)
    },
    addElementBtnClicked () {
      this.items.push(this.newItem)
      this.newItem = { enModif: false, id: this.items[this.items.length - 1].id + 1, type: this.items[0].type }
    }
  }
}
</script>

<style scoped>
  table {
    margin-left: auto;
    margin-right: auto;
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
