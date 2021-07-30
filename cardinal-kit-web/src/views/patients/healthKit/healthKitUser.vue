<template>
  <div>
    <categories :userId="$route.params.userId" :studyId="$route.params.studyId" />
   </div>
</template>

<script>
import store from "@/store";
import { mapActions, mapGetters } from 'vuex';
import categories from '@/components/patients/healthKit/categoryList'
import category from "@/components/patients/healthKit/categoryCard";
export default {
  name: "StudyDetail",
  components:{
    categories,
    category
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
