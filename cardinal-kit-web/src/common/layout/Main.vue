<template>
  <div class="flex">
    <!--  <Header
      :src-logo="logo"
      className="bg-danger"
      brandTitle="CardinalKit"
      logout
      width-logo="50"
      @handle-logout="handleLogout"
      :menu="menu"
    /> -->
      <Sidebar
        :menu="menu"
        :className="'h-auto bg-danger'"
        :logo="logo"
        logout
        @handle-logout="handleLogout"
      />
    <div class="w-100">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
/* import Header from "@/components/auth/Header"; */
import Sidebar from "@/components/auth/sidebar/index.vue";
export default {
  components: {
  /*   Header, */
    Sidebar
  },
  data: function() {
    return {
      logo: require("@/assets/logo.png"),
    };
  },
  computed: {
    ...mapGetters("user", ["getUserRol"]),
    menu() {
      let main = [
        { name: "Studies", route: "/" },
      ];
      if (this.getUserRol == "superAdmin") {
        main.push({ name: "Register doctors", route: "/register" });
      }
      if (
        this.$route.params.studyId &&
        (this.getUserRol == "superAdmin" || this.getUserRol == "doctor")
      ) {
        if (this.$route.name != "Studies") {
          main[0].children = [
            {
              name: "Patients",
              route: `/patients/${this.$route.params.studyId}`,
            },
            {
              name: "Surveys",
              route: `/surveysList/${this.$route.params.studyId}`
            }
          ];
        }
      }
      return main;
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

<style></style>
