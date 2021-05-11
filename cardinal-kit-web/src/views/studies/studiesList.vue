<template>
  <div>
    <div v-for="(study, idx) in getAllStudies" :key="idx">
      <b-button @click="handleSelecStudy(study.id)">
        {{ study.text }}
      </b-button>
    </div>
    <br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import store from "@/store";
export default {
  name: "Home",
  computed: {
    ...mapGetters("studies", ["getAllStudies"]),
  },
  methods: {
    ...mapActions("user", ["changeUserName"]),
    ...mapActions("auth", ["Logout"]),
    handleLogout() {
    },
    handleSelecStudy(studyId) {
        console.log(studyId)
      this.$router.push(`/studyDetail/${studyId}`);
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log(store);
    store.dispatch("studies/FetchAllStudies").then((response) => {
      next();
    });
  },
};
</script>
