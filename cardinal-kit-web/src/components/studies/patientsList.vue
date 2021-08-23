<template>
  <div class="page">
    <h1 class="mb-5">Patient</h1>
    <alt-table :columns="columns" pagination :paginationOptions="paginationOptions" @onPagination="handlePagination">
      <template #t-row>
        <tr v-for="(patient, index) in patients" :key="patient.id">
          <td>{{index + 1}}</td>
          <td>
            {{patient.email || 'NN'}}
          </td>
          <td>
            {{patient.id || 'NN'}}
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
        columns: [{ header: 'N°' }, { header: 'Email' } ,{header: 'userId'},{ header: 'Action' },{ header: '' }],
        loadingId : 0,
        currentPage: 1,
        limit: 10,
      }
    },
    methods: {
      handleSelecPatient(patientId){
        this.loadingId = patientId
        this.$router.push(`/healthKitUser/${this.studyId}/${patientId}`)
      }, 
      handlePagination(pagination) {
        this.currentPage=pagination.currentPage
        this.limit=pagination.limit
        let total = this.patients.length
        if(this.currentPage > Math.ceil(total/this.limit)){
          this.currentPage = Math.ceil(total/this.limit)
        }
      },
    },
    computed:{
      paginationOptions() {
        return {
          limit: [10, 20],
          total: this.patients.length,
          currentPage: this.currentPage,
        };
      },
      getPageItems() {
        let items = this.patients;
        let lowerLimit = (this.currentPage - 1) * this.limit;
        let upperLimit = this.currentPage * this.limit;
        return items.slice(lowerLimit, upperLimit);
      },
    }
  };
</script>