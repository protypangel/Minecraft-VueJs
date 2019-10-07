<!-- ./images/piocheDiamant.jpg -->
<!--
  https://www.npmjs.com/package/minecraft-items
  https://forum.vuejs.org/t/decode-of-base-64-api-using-vuejs/18828
  https://github.com/dizhar/resize-base64
  <img :src="'data:image.png;base64,' + pioche_p.icon">
  <img src="./images/piocheDiamant.jpg" width="150">
 -->
<template>
  <div>
      <div class="container" v-for="item in items" :key="item.id">
        <img :src="'data:image.png;base64,' + pioche_p.icon" width="150">
        <p>{{item.nom}}</p>
      </div>
  </div>
</template>

<script>
// import resizebase64 from '../resize-base64.js'
let myItems = require('../data/item.json')
const minecraftItems = require('minecraft-items')
const piochePierre = minecraftItems.get(274)

// var myImage = resizebase64('dsf', 150, 150)
export default {
  data () {
    return {
      items: myItems,
      pioche_p: piochePierre // image: myImage
    }
  },
  created () {
    console.log(this.items[0].image.visuel)
    console.log('pioche : ', this.pioche_p)
  },
  computed: {
    imageURI: function () {
      return `require(@/components/images/${this.items[0].image.visuel})`
    }
  }
}
</script>
<style scoped>

  div .container {
    border: 7px solid grey;
    max-width: 15%;
    height: auto;
    width: auto;
    margin: 20px;
    border-radius: 10%;
    box-sizing: border-box;
    text-align: center;
  }
  div .container img {
    margin-left: auto;
    margin-right: auto;
    display: block;
    image-rendering: pixelated;
  }
  div .container p {
    border: 4px solid green;
    border-radius: 15%;
    font-size: 1.5em;
    display: inline-block;
    padding: 3px;
    box-sizing: border-box;
    margin: 10px auto;
  }
</style>
