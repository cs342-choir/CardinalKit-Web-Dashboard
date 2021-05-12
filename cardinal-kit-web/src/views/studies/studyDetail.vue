<template>
  <div>
     <b-button @click="handleHealthKit()">
        HealthKit
      </b-button>
  </div>
</template>

<script>
export default {
  name: "StudyDetail",
  methods:{
    handleHealthKit(){
      this.$router.push(`/healthKitStudy/${this.$route.params.idStudy}`);
    }
  }
};
</script>
