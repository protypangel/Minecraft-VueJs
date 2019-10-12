<template>
  <div>
    <table class="striped">
      <thead>
        <th>Name</th>
        <th>Ingredients</th>
        <th>Image</th>
        <th>Description</th>
      </thead>
      <tbody>
        <tr v-for="item in toolItems" :key="item.id">
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.ingredients}}
          </td>
          <td>
            <img :src="item.icon">
          </td>
          <td class="lastCol">
            {{item.description}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const toolItems = require('../data/toolItems.json')

export default {
  data () {
    return {
      toolItems,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Ingredients', value: 'ingredients' },
        { text: 'Image', value: 'icon' },
        { text: 'Description', value: 'description' }
      ]
    }
  },
  created () {
  },
  computed: {
    imageURI: function () {
      return `require(@/components/images/${this.items[0].image.visuel})`
    }
  }
}
</script>
<style scoped>
  table {
    margin-left: 30px;
    margin-top: 30px;
    border-left: 1px solid rgb(146, 189, 26);
    border-bottom: 1px solid rgb(146, 189, 26);
    border-top: 1px solid rgb(146, 189, 26);
  }
  td {
    border: 2px solid rgb(146, 189, 26);
    padding: 10px;
    font-size: 1.2em;
    max-width: 550px;
    min-width: 250px;
    text-align: center;
  }
  thead {
    background-color: rgb(146, 189, 26);
    color: #fff;
    height: 60px;
    font-size: 1.4em;
  }
</style>
