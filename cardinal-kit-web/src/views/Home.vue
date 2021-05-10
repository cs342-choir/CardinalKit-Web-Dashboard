<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <b-button v-on:click="handleLogout()">
                Logout
            </b-button>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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
    ...mapActions('auth',['Logout']),
    handleLogout(){
      this.Logout().then(()=>{
        console.log("Called Logout")
        this.$router.push("Login");
      })
    }
  }
}
</script>
