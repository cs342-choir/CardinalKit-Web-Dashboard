<template>
  <div class="page">
    <br />
    <div class="header">
      <h1 class="text-muted">Survey</h1>
      <button @click="create">Create new survey</button>
    </div>
    <alt-table :columns="columns" pagination >
    <template #t-row>
      <tr v-for="(survey, index ) in surveyData" :key="survey.name">
        <td v-if="!survey.deleted">
          {{survey.data.title}}
        </td>
        {{survey}}
         <td v-if="!survey.deleted">
          <button class="btn" @click="details(survey.data.title)">Details</button>
          <button class="btn" @click="edit(survey.name, index)">Edit</button>
          <modal
            :label="'Remove'"
            :name="survey.name"
            title="Are you sure?"
            content="Do you want to delete the survey?"
            @remove="remove"
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
      surveyData: []
    }
  },
  components: {
    altTable,
    modal
  },
  computed: {
    ...mapGetters("user", ["getUserRol","getUserId"]),
    ...mapGetters("surveys",["getSurveysList", "getSurveysListData"]),
  },
  methods: {
    ...mapActions("surveys", ["DeleteSurvey", "UpdateSurveyData"]),
    surveysListData(){
      let data = []
      
      let list = this.getSurveysListData(this.studyId)
      for (const [key, value] of Object.entries(list)) {
        data.push({...value, name: key})
      }
      this.surveyData = [...data]
    },
    remove(name) {
      let item = this.surveyData.filter((obj) => obj.name == name)[0]
      item["deleted"] = true
      this.UpdateSurveyData({
        studyId: this.studyId,
        id: name,
        data: item
      }).then(()=>{
        this.surveyData = this.surveyData.filter((obj) => obj.name != name)
      })
    },
    create(){
      this.$router.push(`/surveysBuilder/${this.studyId}/`)
    },
    edit(id, index){
      this.$router.push(`/edit/surveyBuilder/${this.studyId}/${id}/${index}`)
    },
    details(survey) {
      this.$router.push(`/surveyDetail/${this.studyId}/${survey}`)
    }
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
      store.dispatch("surveys/FetchSurveyByStudy",{studyId:to.params.studyId})])
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