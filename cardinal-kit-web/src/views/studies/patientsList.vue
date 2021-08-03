<template>
  <div>
    <patient-list :patients="getUsersStudy(studyId)" :studyId="studyId" />
    <br />
  </div>
  <div :onClick="showStudySurveys" class="card-category">
    <span class="surveysBtn">Surveys</span>
  </div>
      <br />
      <br />
    <div :onClick="openSurveysBuilder" class="card-category">
    <span class="surveysBtn">Surveys Builder</span>
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
  components: {
    patientList,
  },
  computed: {
    ...mapGetters("user", ["getUserRol", "getUserStudies", "getUserId"]),
    ...mapGetters("studies", ["getUsersStudy"]),
  },
  props: {
    studyId: {
      type: String,
      required: true,
    },
  },
  methods: {
    showStudySurveys() {
      this.$router.push(`/surveysList/${this.$route.params.studyId}`);
    },
    openSurveysBuilder() {
      this.$router.push(`/surveysBuilder`);
    },
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("studies/FetchUsers", { studyId: to.params.studyId }),
    ]).then(() => {
      next();
    });
  },
};
</script>
<style lang="scss">
.surveysBtn {
  margin: 65px;
  text-decoration: none;
  font-weight: 300;
  font-size: 20px;
  color: #000000;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: #000000;
  box-shadow: 5px 5px 5px
}
</style>
