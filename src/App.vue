<template>
  <div>
    <menu id="menu">
      <ul  v-bind:style="styleMenu">
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(0)" v-on:mouseout="notHoverMenuElement(0)" v-on:click="changeWebContent(0)">Item</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(1)" v-on:mouseout="notHoverMenuElement(1)" v-on:click="changeWebContent(1)">Enchentment</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(2)" v-on:mouseout="notHoverMenuElement(2)" v-on:click="changeWebContent(2)">Biome</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(3)" v-on:mouseout="notHoverMenuElement(3)" v-on:click="changeWebContent(3)">Mobs</li>
        <li v-bind:style="admin.MenuStyle"> {{ admin.connectedText }}</li>
      </ul>
    </menu>
    <v-app>
      <v-content>
        <Item  v-if="webConponentWatch === 0"/>
        <Enchentment  v-if="webConponentWatch === 1"/>
        <Biome v-if="webConponentWatch === 2"/>
        <Mobs  v-if="webConponentWatch === 3"/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Biome from './components/Biome'
import Enchentment from './components/Enchentment'
import Item from './components/Item'
import Mobs from './components/Mobs'

export default {
  name: 'App',
  components: {
    Biome,
    Enchentment,
    Item,
    Mobs
  },
  data: () => ({
    styleMenu: {
      listStyleType: `none`,
      margin: `0`,
      padding: `0`,
      overflow: `hidden`,
      backgroundColor: `#333333`
    },
    styleMenuList: {
      float: `left`,
      color: `white`,
      padding: `15px`,
      cursor: `pointer`,
      userSelect: `none`
    },
    admin: {
      MenuStyle: {
        float: `right`,
        padding: `15px`,
        paddingRight: `25px`,
        color: `white`,
        cursor: `pointer`,
        userSelect: `none`
      },
      connectedText: `Se connecter`
    },
    webConponentWatch: 0
  }),
  methods: {
    hoverMenuElement: function (element) {
      document.getElementById(`menu`).childNodes[0].childNodes[element].style.backgroundColor = `black`
    },
    notHoverMenuElement: function (element) {
      document.getElementById(`menu`).childNodes[0].childNodes[element].style.backgroundColor = ``
    },
    changeWebContent: function (element) {
      this.webConponentWatch = element
    }
  }
}
</script>
