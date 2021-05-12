<template>
  <div>
    <study-list v-if="showStudyList" :studies="getAllStudies" :handleSelecStudy="handleSelecStudy"/>
    <patient-list v-else  :patients="getAllUsers" :studyId="studySelected"/>
    <!-- <div v-for="(study, idx) in getAllStudies" :key="idx">
      <b-button @click="handleSelecStudy(study.id)">
        {{ study.text }}
      </b-button>
    </div> -->
    <br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import store from "@/store";

//Components
import patientList from '@/components/studies/patientsList'
import studyList from '@/components/studies/studiesList'

export default {
  name: "Home",
  data(){
    return {
      showStudyList:true,
      studySelected:''
    }
  },
  components:{
    patientList,
    studyList
  },
  computed: {
    ...mapGetters("studies", ["getAllStudies"]),
    ...mapGetters("studies", ["getAllUsers"])
  },
  methods: {
    ...mapActions("user", ["changeUserName"]),
    ...mapActions("auth", ["Logout"]),
    ...mapActions("studies",["FetchUsers"]),
    handleLogout() {},
    handleSelecStudy(studyId) {
      this.studySelected=studyId
      this.FetchUsers({'studyId':studyId})
        .then(()=>{
          this.showStudyList=false
        })
    },
  },
  mounted(){
    if(this.getAllStudies.length==1){
      this.showStudyList=false
      this.studySelected=this.getAllStudies[0].id
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("studies/FetchAllStudies").then((response) => {
      console.log(response)
      if (response.length == 1) {
        store
          .dispatch("studies/FetchUsers", {
            studyId:response[0].id,
          })
          .then(() => {
            next();
          });
      } else {
        next();
      }
    });
  },
};
</script>
