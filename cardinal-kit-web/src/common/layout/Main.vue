<template>
  <section>
    <Header
      :src-logo="logo"
      className="bg-danger"
      brandTitle="CardinalKit"
      logout
      width-logo="50"
      @handle-logout="handleLogout"
      :menu="menu"
    />
    <div>
      <router-view />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "@/components/auth/Header";
export default {
  components: {
    Header,
  },
  data: function() {
    return {
      logo: require("@/assets/logo.png"),
    };
  },
  computed: {
    ...mapGetters("user", ["getUserRol"]),
    menu() {
      let main = [{ name: "Home", route: "/" }];
      if (this.getUserRol == "superAdmin") {
        main.push({ name: "Register doctors", route: "/register" });
      }

      if (
        this.$route.params.studyId &&
        (this.getUserRol == "superAdmin" || this.getUserRol == "doctor")
      ) {
        if (this.$route.name != "surveysList") {
          main.push({
            name: "Surveys",
            route: `/surveysList/${this.$route.params.studyId}`,
          });
        }
        if (this.$route.name != "patients") {
          main.push({
            name: "Users",
            route: `/patients/${this.$route.params.studyId}`,
          });
        }
      }

      return main;
    },
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

<style></style>
