<template>
  <div class="home">
    <Header :src-logo="logo" width-logo="50">
      <template #menu>
        <router-link class="ev-link" to="studies">See StudiesList</router-link>
        <span class="ev-link" @click="handleLogout()">Logout</span>
      </template>
    </Header>
    <br/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '@/components/auth/Header';
export default {
  name: "Home",
  components: {
    Header
  },
  data: function () {
    return {
      logo: require('@/assets/logo.png')
    }
  },
  methods: {
    ...mapActions("auth", ["Logout"]),
    handleLogout() {
      this.Logout().then(() => {
        console.log("Called Logout");
        this.$router.push("Login");
      });
    },
  },
};
</script>