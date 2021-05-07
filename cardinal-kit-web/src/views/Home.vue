<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <b-button v-on:click="reset()">
                Reset
            </b-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods:{
    ...mapActions('user',['changeUserName']),
    ...mapActions(['reset'])
  }
}
</script>
