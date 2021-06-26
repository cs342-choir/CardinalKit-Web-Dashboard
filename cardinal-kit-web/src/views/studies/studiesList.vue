<template>
  <div>
    <study-list
      :studies="getUserStudies"
      :handleSelecStudy="handleSelecStudy"
    />
    <br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import store from "@/store";

//Components
import studyList from "@/components/studies/studiesList";

export default {
  name: "Home",
  components: {
    studyList,
  },
  computed: {
    ...mapGetters("user", ["getUserStudies","getUserRol","getUserId"]),
  },
  methods: {
    handleSelecStudy(studyId) {
      this.studySelected = studyId;
      if (this.getUserRol == "doctor" || this.getUserRol=="superAdmin") {
        this.$router.push(`/patients/${studyId}`)
      } else {
        this.$router.push(`/healthKitUser/${studyId}/${this.getUserId}`)
      }
    },
  },
  mounted() {
    if (this.getUserStudies.length == 1) {
      if (this.getUserRol == "user") {
        this.$router.push(`/healthKitUser/${this.getUserStudies[0]}/${this.getUserId}`)
      } else {
        this.$router.push(`/patients/${this.getUserStudies[0]}`)
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch("user/FetchUserRolesAndStudies")]).then(() => {
      next();
    });
  },
};
</script>
