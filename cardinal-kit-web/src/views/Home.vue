<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <br/>
     <b-button @click="handleLogout()">
      Logout
    </b-button>
    <br/>
    <b-button @click="handleSeeStudies()">
      See StudiesList
    </b-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: "Home",
  methods: {
    ...mapActions("auth", ["Logout"]),
    handleSeeStudies() {
      this.$router.push("studies");
    },
    handleLogout() {
      this.Logout().then(() => {
        console.log("Called Logout");
        this.$router.push("Login");
      });
    },
  },
};
</script>