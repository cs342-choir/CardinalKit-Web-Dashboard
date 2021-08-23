<template>
  <div>
    <div>
        <button @click="create">Create Survey Builder</button>
    </div>
    <br />
    <alt-table :columns="columns">
    <template #t-row>
      <tr v-for="(survey, index) in surveyList" :key="survey">
        <td>{{index + 1}}</td>
        <td>
          {{survey.title}}
        </td>
        <td>
            <button class="btn" @click="edit">Edit</button>
            <button class="btn" @click="remove(index)">Delete</button>
        </td>
      </tr>
    </template>
    </alt-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import altTable from '@/components/tables/altTable';

export default {
    props: {
        studyId: {
            type: String,
            required: true
        }
    },
    components: {
      altTable,
    },
    data(){
      return{
        surveyData:[],
        columns: [{ header: 'N°' }, { header: 'Name' }, { header: 'Action' }]
      }
    },
  computed: {
    ...mapGetters("surveys",["getSurveysListData"]),
    surveyList(){
        return this.surveyData
    }
  },
  methods: {
    remove(index) {
        this.surveyData.splice(index, 1);
    },
    create(){
      this.$router.push(`/surveysBuilder/${this.studyId}/`)
    },
    edit(){
      this.$router.push(`/surveysBuilder/${this.studyId}/`)
    }
  },
  created(){
    this.surveyData = this.getSurveysListData(this.studyId)
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("surveys/FetchSurveyByStudy",{studyId:to.params.studyId})
    .then(() => {
      next();
    });
  },
};
</script>
