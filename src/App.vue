<template>
  <div>
    <menu id="menu">
      <ul  v-bind:style="styleMenu">
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(0)" v-on:mouseout="notHoverMenuElement(0)" v-on:click="changeWebContent(0)">Item</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(1)" v-on:mouseout="notHoverMenuElement(1)" v-on:click="changeWebContent(1)">Enchentment</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(2)" v-on:mouseout="notHoverMenuElement(2)" v-on:click="changeWebContent(2)">Biome</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(3)" v-on:mouseout="notHoverMenuElement(3)" v-on:click="changeWebContent(3)">Mobs</li>
        <li v-bind:style="admin.menu_style" v-on:mouseover="hoverAdminButton()" v-on:mouseout="notHoverAdminButton()"> {{ admin.menu_text }}</li>
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
    <div id="independantPage" v-bind:style="independantPage.style">
      <div v-bind:style="independantPage.close.style">
        <p v-bind:style="independantPage.close.move.style" v-on:click="DragIndependantPage()" v-on:click.stop="DropIndependantPage()"></p> <!-- Probleme quoi ajouter pour qu'il comprend bouger quand je suis en mode boutton sourie préssé et boutton sourrie non préssé-->
        <p v-bind:style="independantPage.close.buttonX.style" v-on:click="clickTocloseIndependantPage()">X</p>
      </div>
      <div id="contenentIndependantPage"></div>
    </div>
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
    Biome, // Differents minecraft's biom
    Enchentment, // Differents item's enchentment
    Item, // Different's minecraft's item
    Mobs // Different's minecraft's mobs
  },
  data: () => ({
    /* Differents style of the list's element */
    styleMenu: { // Style of the list
      listStyleType: `none`,
      margin: `0`,
      padding: `0`,
      overflow: `hidden`,
      backgroundColor: `#333333`
    },
    styleMenuList: { // Style of list's element
      float: `left`,
      color: `white`,
      padding: `15px`,
      cursor: `pointer`,
      userSelect: `none`
    },
    /* */
    admin: { // Button Admin (Style, Text, Animate)
      menu_style: { // Style of it
        float: `right`,
        padding: `5px`,
        color: `white`,
        cursor: `pointer`,
        userSelect: `none`,
        borderRadius: `30px`,
        border: `5px solid rgba(142,105,105,1)`,
        backgroundColor: `rgba(142,105,105,0)`,
        transform: `translate(0px, 10%)`,
        marginRight: `15px`
      },
      menu_text: `Se connecter`, // Text
      /* Animate it */
      animateButtonRGBA: 0,
      animatePossitive: true,
      intervalID: 0,
      intervalIDTime: 1000.0 / 15.0
      /* */
    },
    webConponentWatch: 0, // What's component need to be watch 0:Item, 1:Enchentment, 2:Biome, 3:Mobs
    independantPage: { // Independant page
      style: { // Style of it
        width: `500px`,
        height: `500px`,
        backgroundColor: `red`,
        position: `absolute`,
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%,-50%)`,
        border: `solid black 5px`,
        display: ``
      },
      close: { // Menu of independant page
        style: { // Style of it
          backgroundColor: `grey`,
          borderBottom: `solid black 5px`,
          height: `33px`
        },
        move: { // Move div
          style: { // Style of it
            width: `94%`,
            height: `-webkit-fill-available`,
            float: `left`
          }
        },
        buttonX: { // Button close
          style: { // Style of it
            width: `fit-content`,
            float: `left`,
            borderLeft: `5px solid black`,
            padding: `5px`,
            cursor: `pointer`,
            userSelect: `none`
          },
          mouse: { // Initialise position of mouse
            top: `0`,
            left: `0`
          }
        }
      }
    }
  }),
  methods: {
    hoverMenuElement: function (element) { // Change the pointing list's element's backgroundColor into black
      document.getElementById(`menu`).childNodes[0].childNodes[element].style.backgroundColor = `black`
    },
    notHoverMenuElement: function (element) { // Change the last pointing list's element's backgroundColor into nothing
      document.getElementById(`menu`).childNodes[0].childNodes[element].style.backgroundColor = ``
    },
    changeWebContent: function (element) { // Change the components who need to be watch
      this.webConponentWatch = element
    },
    hoverAdminButton: function () { // Change the admin's button's backgroundColor when i'm pointing it
      this.admin.intervalID = setInterval(this.hoverAdminButtonInterval, this.admin.intervalIDTime)
    },
    hoverAdminButtonInterval: function () { // Change the admin's button's backgroundColor
      /* variate color's alpha: [0;0.75] */
      if (this.admin.animateButtonRGBA >= 0.75) {
        this.admin.animatePossitive = false
      } else if (this.admin.animateButtonRGBA <= 0) {
        this.admin.animatePossitive = true
      }
      /* Positif is add, Negative to take off */
      if (this.admin.animatePossitive) {
        this.admin.animateButtonRGBA += 0.025
      } else {
        this.admin.animateButtonRGBA -= 0.025
      }
      /* */
      this.admin.menu_style.backgroundColor = `rgba(142,105,105,` + this.admin.animateButtonRGBA + `)` // Change the backgroundColor
    },
    notHoverAdminButton: function () { // Delete the last animate of admin's button
      clearInterval(this.admin.intervalID)
    },
    clickTocloseIndependantPage: function () { // Close IndependantPage
      this.independantPage.style.display = `none`
    },
    DragIndependantPage: function () { // Drag IndependantPage
      console.log(`here`)
    },
    DropIndependantPage: function () { // Drop IndependantPage
      console.log('here2')
    }
  }
}
</script>
