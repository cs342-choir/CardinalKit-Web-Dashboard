<template>
  <div class="page">
    <br />
    <div class="header">
      <h1 class="text-muted">Survey</h1>
      <button @click="schedule">Scheduler</button>
      <button @click="create">Create new survey</button>
    </div>
    <alt-table :columns="columns" pagination 
      :paginationOptions="paginationOptions"
      @onPagination="handlePagination"
    >
    <template #t-row>
      <tr v-for="survey in getPageItems" :key="survey.data.identifier">
        <td v-if="!survey.deleted">
          {{survey.data.title}}
        </td>
        <td v-if="!survey.deleted">
          <a class="button mr-1" @click="details(survey.data.identifier)">Details</a>
          <a class="button mr-1" @click="edit(survey.data.identifier)">Edit</a>
          <modal
            :label="'Remove'"
            :name="survey.data.identifier"
            title="Are you sure?"
            content="Do you want to delete the survey?"
            @accept="remove"
          />
        </td>
      </tr>
    </template>
    </alt-table>
    <br />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import altTable from '@/components/tables/altTable';
import modal from "@/components/modals/modal.vue"

export default {
  name: "SurveysList",
  data(){
    return{
      columns: [{ header: 'Name' }, { header: 'Action' }],
      surveyData: [],
      currentPage: 1,
      limit: 10,
    }
  },
  components: {
    altTable,
    modal
  },
  computed: {
    ...mapGetters("user", ["getUserRol","getUserId"]),
    ...mapGetters("surveys",["getSurveysData"]),
   
    paginationOptions() {
      return {
        limit: [10, 20],
        total: this.surveyData.length,
        currentPage: this.currentPage,
      };
    },
     getPageItems() {
      if (this.surveyData){
        let items = this.surveyData;
        let lowerLimit = (this.currentPage - 1) * this.limit;
        let upperLimit = this.currentPage * this.limit;
        return items.slice(lowerLimit, upperLimit);
      }
      return {}
    },
  },
  methods: {
    ...mapActions("surveys", ["DeleteSurvey", "UpdateSurveyData"]),
    surveysListData(){
      let data = []
      
      let list = this.getSurveysData(this.studyId)
      for (const [key, value] of Object.entries(list)) {
        data.push({...value, name: key})
      }
      this.surveyData = [...data]
    },
    remove(name) {
      this.DeleteSurvey({
      studyId: this.studyId,
        surveyId: name,
      }).then(()=>{
        this.surveyData = this.surveyData.filter((obj) =>  obj.data.identifier != name )
      })
    },
    create(){
      this.$router.push(`/surveysBuilder/${this.studyId}/`)
    },
    edit(survey){
      this.$router.push(`/edit/surveyBuilder/${this.studyId}/${survey}`)
    },
    details(survey) {
      this.$router.push(`/surveyDetail/${this.studyId}/${survey}`)
    },
    schedule() {
      this.$router.push(`/surveyScheduler/${this.studyId}`)
    },
    handlePagination(pagination) {
      this.currentPage=pagination.currentPage
      this.limit=pagination.limit
      let total = this.surveyData.length
      if(this.currentPage > Math.ceil(total/this.limit)){
        this.currentPage = Math.ceil(total/this.limit)
      }
    },
  },
  props: {
    studyId: {
      type: String,
      required: true,
    }
  },
  created(){
    this.surveysListData()
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("surveys/FetchAllSurveysData",{studyId:to.params.studyId})])
      .then(() => {
      next();
    });
  }
};
</script>
<style lang="scss" scoped>
  .header {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }


</style>