<template>
  <div>
    <categories :userId="$route.params.userId" :studyId="$route.params.studyId" />
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
import categories from '@/components/patients/healthKit/categories'
export default {
  name: "StudyDetail",
  components:{
    categories
  },
  methods: {
    handleHealthKit() {
    //   this.$router.push(`/healthKitStudy/${this.$route.params.idStudy}`);
    },
  },
  computed:{
    ...mapGetters('patient',['getHealthData'])
  },
};
</script>
