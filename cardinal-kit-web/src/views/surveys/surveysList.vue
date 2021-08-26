<template>
  <div>
    <br />
    <alt-table :columns="columns">
    <template #t-row>
      <tr v-for="(survey, index ) in surveyData" :key="survey.name">
        <td v-if="!survey.deleted">
          {{survey.title}}
        </td>
         <td v-if="!survey.deleted">
          <button class="btn" @click="details(survey.name)">Details</button>
          <button class="btn" @click="edit(survey.name, index)">Edit</button>
          <button class="btn" @click="remove(survey.name)">Delete</button>
        </td>
      </tr>
    </template>
    </alt-table>
    <br />
    <div>
      <button @click="create">Create Survey Builder</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import altTable from '@/components/tables/altTable';

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
  },
  computed: {
    ...mapGetters("user", ["getUserRol","getUserId"]),
    ...mapGetters("surveys",["getSurveysList", "getSurveysListData"]),
  },
  methods: {
    ...mapActions("surveys", ["DeleteSurvey", "UpdateSurveyData"]),
    surveysListData(){
      let data = []
      let ids = this.getSurveysList(this.studyId)
      let list = this.getSurveysListData(this.studyId)
      list.forEach((obj, i) => {
        data.push({...obj, name: ids[i]})
      });
      this.surveyData = [...data]
      console.log(this.surveyData, "key delete")
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
