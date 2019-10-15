<template>

<v-app>
  <Navbar></Navbar>
  <div>
      <v-content>
        <Basics></Basics>
        <Defense></Defense>
        <Food></Food>
        <Tools></Tools>
      </v-content>
      </div>
    </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Basics from '@/components/items/Basics'
import Defense from '@/components/items/Defense'
import Food from '@/components/items/Food'
import Tools from '@/components/items/Tools'

// var myJson = '{"result":true, "count":42}'
// let myItems = JSON.parse('{"nom":"epee"}')
export default {
  name: 'App',
  components: {
    Navbar,
    Basics,
    Defense,
    Food,
    Tools
  },
  data: () => ({
  }),
  methods: {
  }
}
</script>
