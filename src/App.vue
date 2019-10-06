<template>
  <div>
    <menu id="menu">
      <ul  v-bind:class="header.css.class.list.contener">
        <!-- List's element -->
        <li v-bind:class="header.css.class.list.element.item"        v-on:click="bodyContent(0)"> {{ header.word.list.item          }} </li>
        <li v-bind:class="header.css.class.list.element.enchentment" v-on:click="bodyContent(1)"> {{ header.word.list.enchentment   }} </li>
        <li v-bind:class="header.css.class.list.element.biome"       v-on:click="bodyContent(2)"> {{ header.word.list.biome         }} </li>
        <li v-bind:class="header.css.class.list.element.mobs"        v-on:click="bodyContent(3)"> {{ header.word.list.mobs          }} </li>
        <!-- If the person isn't connect -->
        <div v-if="!header.connect.isConnected">
          <li  v-bind:style="header.css.animate.buttonConnect.style" v-bind:class="header.css.class.list.element.connect.false" v-on:mouseover="hoverAnimateConnectButton" v-on:mouseout="nothoverAnimateConnectButton" v-on:click="connect()"> {{ header.word.list.connect.false }}</li>
            <form v-if="header.connect.false.panelConnect"  v-bind:class="header.css.class.connect.false.contener">
              <input v-bind:id="header.css.id.pseudo"    v-bind:style="header.css.animate.login.style.pseudo"   type="text"        v-bind:class="header.css.class.connect.false.element.pseudo"    v-bind:placeholder="header.word.connect.false.pseudo">
              <input v-bind:id="header.css.id.password"  v-bind:style="header.css.animate.login.style.password" type="password"    v-bind:class="header.css.class.connect.false.element.password"  v-bind:placeholder="header.word.connect.false.password">
              <v-btn v-on:click="connectForm"                                                                                      v-bind:class="header.css.class.connect.false.element.send" > {{ header.word.connect.false.send }} </v-btn>
          </form>
        </div>
        <!-- If the person is connect -->
        <div v-else>
          <li v-bind:class="header.css.class.list.element.connect.true" @click="seePanel"> {{ header.word.list.connect.true }}</li>
            <form v-if="header.connect.true.panel" v-bind:class="header.css.class.connect.true.contener">
              <v-btn tile color="#009688" v-bind:class="header.css.class.connect.true.element.modifier"   @click="buttonPressedModeChangeApi(1)">{{ header.word.connect.true.modifier }}</v-btn>
              <v-btn tile color="#009688" v-bind:class="header.css.class.connect.true.element.ajouter"    @click="buttonPressedModeChangeApi(2)">{{ header.word.connect.true.ajouter }}</v-btn>
              <v-btn tile color="#009688" v-bind:class="header.css.class.connect.true.element.supprimer"  @click="buttonPressedModeChangeApi(3)"> {{ header.word.connect.true.supprimer }}</v-btn>
              <v-btn tile color="#009688" v-bind:class="header.css.class.connect.true.element.deconnection"  @click="deconnect"> {{ header.word.connect.true.deconnection }}</v-btn>
            </form>
        </div>
        <!-- -->
      </ul>
    </menu>
    <!-- Content page -->
    <v-app>
      <v-content v-bind:class="header.css.class.content.contener">
        <Item  v-if="body.watch === 0"/>
        <Enchentment  v-if="body.watch === 1"/>
        <Biome v-if="body.watch === 2"/>
        <Mobs  v-if="body.watch === 3"/>
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
    Biome, // Differents minecraft's biom
    Enchentment, // Differents item's enchentment
    Item, // Different's minecraft's item
    Mobs // Different's minecraft's mobs
  },
  data: () => ({
    header: {
      css: {
        class: {
          list: {
            contener: `list`,
            element: {
              item: `element`,
              enchentment: `element`,
              biome: `element`,
              mobs: `element`,
              connect: {
                true: `connect`,
                false: `connect`
              }
            }
          },
          connect: {
            true: {
              contener: `connectPanel`,
              element: {
                modifier: `ajouter`,
                ajouter: `modifier`,
                supprimer: `supprimer`,
                deconnection: `deconnection`
              }
            },
            false: {
              contener: `connectPanel`,
              element: {
                pseudo: `pseudo`,
                password: `password`,
                send: `send`
              }
            }
          },
          content: {
            contener: `contentWeb`
          }
        },
        id: {
          pseudo: `speudo`,
          password: `password`
        },
        animate: {
          buttonConnect: {
            style: {
              backgroundColor: `rgba(142,105,105,0)`
            },
            RGBA: 0.0,
            id: -1,
            duration: 1000.0 / 15.0,
            positif: true
          },
          login: {
            style: {
              pseudo: {
                border: ``
              },
              password: {
                border: ``
              }
            }
          }
        }
      },
      word: {
        list: {
          item: `Item`,
          enchentment: `Enchentment`,
          biome: `Biome`,
          mobs: `Mobs`,
          connect: {
            true: `Se connecter`,
            false: `Se connecter`
          }
        },
        connect: {
          false: {
            pseudo: `pseudo:`,
            password: `password:`,
            send: `valider`
          },
          true: {
            modifier: `modifier`,
            ajouter: `ajouter`,
            supprimer: `supprimer`,
            deconnection: `deconnection`
          }
        }
      },
      connect: {
        isConnected: false,
        false: {
          panelConnect: false
        },
        true: {
          mode: 0,
          panel: false
        }
      }
    },
    body: {
      watch: 0
    },
    serverData: {
      url: {
        login: `http://localhost:4000/api/login`,
        logout: `http://localhost:4000/api/logout`
      }
    }
  }),
  methods: {
    bodyContent: function (element) { // Change the components who need to be watch
      this.body.watch = element
    },
    deconnect: function () {
      this.axios.get(this.serverData.url.logout)
        .then(jsondata => {
          console.log('here')
          this.header.connect.isConnected = false
        }).catch(error => {
          console.log(`l'erreur est:`, error)
        })
    },
    buttonPressedModeChangeApi: function (element) {
      this.header.connect.true.mode = element
    },
    seePanel: function () {
      this.header.connect.true.panel = !this.header.connect.true.panel
    },
    hoverAnimateConnectButton: function () { // Change the admin's button's backgroundColor when i'm pointing it
      this.header.css.animate.buttonConnect.id = setInterval(this.hoverAnimateActionConnectButton, this.header.css.animate.buttonConnect.duration)
    },
    hoverAnimateActionConnectButton: function () { // Change the admin's button's backgroundColor
      /* variate color's alpha: [0;0.75] */
      this.header.css.animate.buttonConnect.positif = (this.header.css.animate.buttonConnect.RGBA <= 0) ? true : ((this.header.css.animate.buttonConnect.RGBA >= 0.75) ? false : this.header.css.animate.buttonConnect.positif)
      /* Positif is add, Negative to take off */
      this.header.css.animate.buttonConnect.RGBA += this.header.css.animate.buttonConnect.positif ? 0.025 : -0.025
      /* Change the backgroundColor */
      this.header.css.animate.buttonConnect.style.backgroundColor = `rgba(142,105,105,` + this.header.css.animate.buttonConnect.RGBA + `)`
      /* */
    },
    nothoverAnimateConnectButton: function () { // Delete the last animate of admin's button
      clearInterval(this.header.css.animate.buttonConnect.id)
    },
    connect: function () { // Click to connect
      if (!this.header.connect.isConnected) {
        this.header.connect.false.panelConnect = !this.header.connect.false.panelConnect
      }
    },
    connectForm: function () { // Try to connect
      const pseudo = document.getElementById(this.header.css.id.pseudo).value
      const password = document.getElementById(this.header.css.id.password).value
      this.axios.post(this.serverData.url.login, { username: pseudo, password: password })
        .then(jsondata => {
          alert(jsondata.data.message)
          if (jsondata.data.connect) {
            this.connectAnAdmin(pseudo)
          } else {
            this.isntAnAdmin(pseudo === ``, password === ``, password !== `` && pseudo !== ``)
          }
        }).catch(error => {
          console.log(`l'erreur est:`, error)
        })
    },
    connectAnAdmin: function (pseudo) {
      this.header.css.animate.login.style.pseudo.border = ``
      this.header.css.animate.login.style.password.border = ``
      this.header.connect.isConnected = true
      this.header.connect.false.panelConnect = false
      this.header.word.list.connect.true = pseudo
    },
    isntAnAdmin: function (emptyPseudo, emptyPassword, otherOption) {
      this.header.css.animate.login.style.pseudo.border = ``
      this.header.css.animate.login.style.password.border = ``
      if (emptyPseudo) {
        this.header.css.animate.login.style.pseudo.border = `5px solid red`
      }
      if (emptyPassword) {
        this.header.css.animate.login.style.password.border = `5px solid red`
      }
      if (otherOption) {
        this.header.css.animate.login.style.pseudo.border = `5px solid orange`
        this.header.css.animate.login.style.password.border = `5px solid orange`
      }
    }
  }
}
</script>
<style scoped>
.list{
  margin:0;
  padding:0;
  list-style-type:none;
  overflow:hidden;
  background-color:#333333;
}
.element{
  float:left;
  color:white;
  padding:15px;
  cursor:pointer;
  user-select:none;
  background-color: none;
}
.element:hover{
  background-color: black;
}
.connect{
  float:right;
  padding:5px;
  color:white;
  cursor:pointer;
  user-select:none;
  border-radius:30px;
  border:5px solid rgba(142,105,105,1);
  transform:translate(0px, 10%);
  margin-right:15px;
}
.pseudo, .password, .send{
  background-color:white;
  border:5px solid rgb(142,105,105);
  width:100px;
  margin-top:10px;
  margin-left:20px;
  margin-right:20px;
  text-align:center;
}
.send{
  cursor:pointer;
  user-select:none;
  margin-bottom:5px;
}
.connectPanel{
  background-color:black;
  width:136px;
  height: auto;
  position:absolute;
  margin:0;
  padding:0;
  right:0;
  top:48px;
  z-index:1;
}
.ajouter, .modifier, .supprimer, .deconnection{
  width: -webkit-fill-available;
}
.contentWeb{
  height: auto;
}
</style>>
