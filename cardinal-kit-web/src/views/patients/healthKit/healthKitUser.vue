<template>
  <div>
    <categories :userId="$route.params.userId" :studyId="$route.params.studyId" />
    
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
import categories from '@/components/patients/healthKit/categoryList'
import category from "@/components/patients/healthKit/categoryCard";
import store from "@/store";

export default {
  name: "StudyDetail",
  components:{
    categories,
    category,
  },
  methods: {
    handleHealthKit() {
    //   this.$router.push(`/healthKitStudy/${this.$route.params.idStudy}`);
    },
  },
  computed:{
    ...mapGetters('patient',['getHealthData'])
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("patient/FecthCategoryWithData", {
        studyId: `${to.params.studyId}`,
        userId: `${to.params.userId}`
      }),
    ]).then(() => {
      next();
    });
  },
};
</script>
