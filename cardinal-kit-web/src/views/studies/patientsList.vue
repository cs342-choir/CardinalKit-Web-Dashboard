<template>
  <div>
    <study-list
      v-if="showStudyList"
      :studies="getUserStudies"
      :handleSelecStudy="handleSelecStudy"
    />
    <patient-list v-else :patients="getAllUsers" :studyId="studySelected" />
    <br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import store from "@/store";

//Components
import patientList from "@/components/studies/patientsList";
import studyList from "@/components/studies/studiesList";

export default {
  name: "Home",
  data() {
    return {
      showStudyList: true,
      studySelected: "",
    };
  },
  components: {
    patientList,
    studyList,
  },
  computed: {
    ...mapGetters("user", ["getUserRol", "getUserStudies", "getUserId"]),
  },
  methods: {
    ...mapActions("user", ["changeUserName"]),
    ...mapActions("auth", ["Logout"]),
    ...mapActions("studies", ["FetchUsers"]),
    handleLogout() {},
    handleSelecStudy(studyId) {
      this.studySelected = studyId;
      if (this.getUserRol == "user") {
        this.$router.push(`/healthKitUser/${this.getUserStudies[0]}/${this.getUserId}`)
      } else {
        this.FetchUsers({ studyId: studyId }).then(() => {
          this.showStudyList = false;
        });
      }
    },
  },
  mounted() {
    console.log(this.getUserStudies[0])
    if (this.getUserStudies.length == 1) {
      if (this.getUserRol == "user") {
        this.$router.push(`/healthKitUser/${this.getUserStudies[0]}/${this.getUserId}`)
      } else {
        this.showStudyList = false;
        this.studySelected = this.getUserStudies[0].id;
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
