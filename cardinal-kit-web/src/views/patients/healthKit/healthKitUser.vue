<template>
  <div>
    <div v-for="(record, idx) in getHealthData" :key="idx">
      <!-- <b-button @click="handleSelecStudy(study.id)"> -->
        {{ record.name }}
        <br/><br/><br/>
        
      <!-- </b-button> -->
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "StudyDetail",
  methods: {
    handleHealthKit() {
    //   this.$router.push(`/healthKitStudy/${this.$route.params.idStudy}`);
    },
  },
  computed:{
    ...mapGetters('patient',['getHealthData'])
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("patient/FetchUserHealthData",{ studyId:`${to.params.studyId}`  , userId:`${to.params.userId}`}).then(() => {
      next();
    });
  },
};
</script>
