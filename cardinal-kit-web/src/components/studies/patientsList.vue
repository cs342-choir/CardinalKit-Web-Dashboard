<template>
<div class="page">
  <h1 class="mb-5">Patient</h1>
  <alt-table :columns="columns" pagination @onPagination="handlePagination">
    <template #t-row>
      <tr v-for="(patient, index) in patients" :key="patient.id">
        <td>{{index + 1}}</td>
        <td>
          {{patient.name || 'NN'}}
        </td>
        <td>
          <span class="pointer" @click="handleSelecPatient(patient.id)">
            details
          </span>
        </td>
        <td>
        <loading-icon v-show="loadingId == patient.id" size="3px"/>
        </td>
      </tr>
    </template>
  </alt-table>
</div>
</template>
<script>
import altTable from '@/components/tables/altTable';
import loadingIcon from "@/components/loading";
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
      altTable,
      loadingIcon
    },
    data(){
      return{
        columns: [{ header: 'N°' }, { header: 'Name' }, { header: 'Action' },{ header: '' }],
        loadingId : 0
      }
    },
    methods: {
      handleSelecPatient(patientId){
        this.loadingId = patientId
        this.$router.push(`/healthKitUser/${this.studyId}/${patientId}`)
      }, 
      handlePagination(pagination) {
        console.log('arraival from table', pagination);
      }
    }
  };
</script>