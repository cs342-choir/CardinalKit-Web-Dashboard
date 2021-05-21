<template>
  <div>
    <p>study: {{studyId}}</p>
    <p>user: {{userId}}</p>
    <p>health Kit Workout: {{hkWorkout}}</p>
  </div>
</template>

<script>
export default {
  props: {
    studyId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    hkWorkout: {
      type: String,
      required: true,
    }
  },
  setup() {
    
  },
}
</script>

<style>

</style>