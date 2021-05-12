<template>
<div>
  study
   <div v-for="study in studies" :key="study.id">
      <b-button @click="handleSelecStudy(study.id)">
        {{ study.text }}
      </b-button>
  </div>
</div>
</template>
<script>
  export default {
    name: 'studiesList',
    data(){
      return{
        
      }
    },
    props: {
      studies:{
        type:Array,
        required:true
      },
      handleSelecStudy:{
        type:Function,
        required:true
      }
    },
    methods: {
    },
    computed:{
      
    },
  };
</script>