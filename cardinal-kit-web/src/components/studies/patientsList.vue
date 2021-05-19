<template>
<div class="page">
  <h1 class="mb-5">Patient</h1>
  <alt-table :columns="columns">
    <template #t-row>
      <tr v-for="(patient, index) in patients" :key="patient.id">
        <td>{{index + 1}}</td>
        <td>
          {{patient.name || 'NN'}}
        </td>
        <td>
          <span class="pointer" @click="handleSelecPatient(patient.id)">
            detail
          </span>
        </td>
      </tr>
    </template>
  </alt-table>
</div>
</template>
<script>
import altTable from '@/components/tables/altTable';
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
    components:{
      altTable
    },
    data(){
      return{
        columns: [{ header: 'N°' }, { header: 'Name' }, { header: 'Action' }]
      }
    },
    methods: {
      handleSelecPatient(patientId){
        this.$router.push(`/healthKitUser/${this.studyId}/${patientId}`)
      }
    }
  };
</script>