<template>
  <div>
    <patient-list :patients="getUsersStudy(idStudy)" :studyId="idStudy" />
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
  components: {
    patientList,
  },
  computed: {
    ...mapGetters("user", ["getUserRol", "getUserStudies", "getUserId"]),
    ...mapGetters("studies",["getUsersStudy"])
  },
  props: {
    idStudy:{
      type:String,
      required:true
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch("studies/FetchUsers",{studyId:to.params.idStudy})]).then(() => {
      next();
    });
  },
};
</script>
