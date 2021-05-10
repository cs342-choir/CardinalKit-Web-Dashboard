<template>
  <header>
      <Logo :width="'100'" />
      <div class="header-menu">
       <router-link class="ev-link" to="#">Profile</router-link>
       <span class="ev-link" @click="logoutAction">Log out</span>
      </div>
    </header>
</template>

<script>
import { mapActions } from 'vuex'

export default{
  methods:{
    ...mapActions('auth',['logout']),
    logoutAction(){
      this.logout().then(()=>{
        //Action after logout
      })
    }
  }
}

</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: .5rem 2rem;
  background-color: whitesmoke;
  box-shadow: 0px 2px 4px 0px #2c2c2c;

  .header-menu {
    display: flex;
    gap: 15px;
  }
}
</style>
