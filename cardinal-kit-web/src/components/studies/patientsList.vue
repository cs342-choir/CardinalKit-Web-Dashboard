<template>
<div>
  patient
  <div v-for="patient in patients" :key="patient.id">
    <b-button @click="handleSelecPatient(patient.id)">
        {{patient.name}}
      </b-button>
  </div>
</div>
</template>
<script>
  export default {
    name: 'name',
    props: {
      patients:{
        type:Array,
        required:true
      },
      studyId:{
        type:String,
        required:true
      }
    },
    data(){
      return{
        
      }
    },
    methods: {
      handleSelecPatient(patientId){
        this.$router.push(`/healthKitUser/${this.studyId}/${patientId}`)
      }
    },
    computed:{
      
    }
  };
</script>