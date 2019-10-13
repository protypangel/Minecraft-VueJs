<template>
  <div>
    <menu id="menu">
      <ul  v-bind:style="styleMenu">
        <!-- List's element -->
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(0)" v-on:mouseout="notHoverMenuElement(0)" v-on:click="changeWebContent(0)">Tools</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(1)" v-on:mouseout="notHoverMenuElement(1)" v-on:click="changeWebContent(1)">Basic</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(2)" v-on:mouseout="notHoverMenuElement(2)" v-on:click="changeWebContent(2)">Defence</li>
        <li v-bind:style="styleMenuList" v-on:mouseover="hoverMenuElement(3)" v-on:mouseout="notHoverMenuElement(3)" v-on:click="changeWebContent(3)">Food</li>
        <!-- If the person isn't connect -->
        <li v-bind:style="admin.menu_style" v-on:mouseover="hoverAdminButton()" v-on:mouseout="notHoverAdminButton()" v-on:click="connect()"> {{ admin.menu_text }}</li>
        <div v-if="admin.connect.panel.watch" v-bind:style="admin.connect.panel.style">
          <form id="connect">
            <input id="speudo" type="text" v-bind:style="admin.connect.panel.form.style[0]" v-bind:placeholder="admin.connect.panel.form.placeholder[0].text">
            <input id="password" type="password" v-bind:style="admin.connect.panel.form.style[1]" v-bind:placeholder="admin.connect.panel.form.placeholder[1].text">
            <v-btn v-on:click="connectForm" v-bind:style="admin.connect.panel.form.style[2]"> {{ admin.connect.panel.form.placeholder[2].text }}</v-btn>
          </form>
        </div>
        <div v-else></div>
        <!-- -->
      </ul>
    </menu>
    <!-- Content page -->
    <v-app>
      <v-content>
        <Tools v-if="webConponentWatch === 0"/>
        <Enchentment v-if="webConponentWatch === 1"/>
        <Biome v-if="webConponentWatch === 2"/>
        <Mobs  v-if="webConponentWatch === 3"/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Biome from './components/Biome'
import Enchentment from './components/Enchentment'
import Tools from './components/Tools'
import Mobs from './components/Mobs'

// var myJson = '{"result":true, "count":42}'
// let myItems = JSON.parse('{"nom":"epee"}')
export default {
  name: 'App',
  components: {
    Biome,
    Enchentment,
    Tools,
    Mobs
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
      intervalIDTime: 1000.0 / 15.0,
      /* connect panel and other */
      connect: {
        isConnect: false, // Admin is connect
        identifiant: { speudo: ``, password: `` }, // Element of admin
        panel: { // Panel connect
          watch: true, // This the panel connect
          style: {
            backgroundColor: `black`,
            width: `136px`,
            height: `130px`,
            position: `absolute`,
            margin: `0`,
            padding: `0`,
            right: `0`,
            top: `48px`,
            zIndex: `1`
          },
          form: { // Form of connect panel
            placeholder: [ // Table of placeholder
              {
                text: `speudo:`
              },
              {
                text: `password:`
              },
              {
                text: `valider`
              }
            ],
            style: [ // Table's style
              {
                backgroundColor: `white`,
                border: `5px solid rgb(142,105,105)`,
                width: `100px`,
                marginTop: `10px`,
                marginLeft: `20px`,
                marginRight: `20px`,
                textAlign: `center`
              },
              {
                backgroundColor: `white`,
                border: `5px solid rgb(142,105,105)`,
                width: `100px`,
                marginTop: `10px`,
                marginLeft: `20px`,
                marginRight: `20px`,
                textAlign: `center`
              },
              {
                backgroundColor: `white`,
                border: `5px solid rgb(142,105,105)`,
                width: `100px`,
                marginTop: `10px`,
                marginLeft: `20px`,
                marginRight: `20px`,
                textAlign: `center`,
                cursor: `pointer`,
                userSelect: `none`
              }
            ]
          }
        }
      },
      url: {
        login: `http://localhost:4000/api/login`
      }
      /* */
    },
    webConponentWatch: 0 // What's component need to be watch 0:Item, 1:Enchentment, 2:Biome, 3:Mobs
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
    connect: function () { // Click to connect
      // If the admin isnt connect display the panel to connect
      if (!this.admin.connect.isConnect) {
        this.admin.connect.panel.watch = !this.admin.connect.panel.watch
      }
    },
    connectForm: function () { // Try to connect
      this.axios.post('http://localhost:4000/api/login', { username: 'moi', password: 'toi' })
        .then(jsondata => console.log(`response is:`, jsondata.data))
        .catch(error => console.log(`l'erreur est:`, error))
    /*
      const pseudo = document.getElementById('speudo').value
      const password = document.getElementById('password').value
      if (pseudo === `` || password === ``) {
        if (pseudo === ``) {
          this.admin.connect.panel.form.style[0].border = `5px solid red`
        }
        if (password === ``) {
          this.admin.connect.panel.form.style[1].border = `5px solid red`
        }
      } else {
        this.admin.connect.panel.form.style[0].border = `5px solid rgb(142,105,105)`
        this.admin.connect.panel.form.style[1].border = `5px solid rgb(142,105,105)`
        this.axios.post(this.admin.url.login, {
          login: pseudo,
          password: password
        })
          .then(jsondata => console.log(`response is:`, jsondata.data))
          .catch(error => console.log(`l'erreur est:`, error))
      }
  */
    }
  }
}
</script>
