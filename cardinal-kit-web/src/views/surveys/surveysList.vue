<template>
  <div>
    <br />
    
    <alt-table :columns="columns">
    <template #t-row>
      <tr v-for="(survey, index) in getSurveysList(studyId)" :key="survey">
        <td>{{index + 1}}</td>
        <td>
          {{survey}}
        </td>
        <td>
          <span class="pointer" @click="handleSelecStudy(survey)">
            detail
          </span>
        </td>
      </tr>
    </template>
    </alt-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

//Components
import altTable from '@/components/tables/altTable';

export default {
  name: "SurveysList",
  data(){
      return{
        columns: [{ header: 'N°' }, { header: 'Name' }, { header: 'Action' }]
      }
    },
  components: {
    altTable,
  },
  computed: {
    ...mapGetters("user", ["getUserRol","getUserId"]),
    ...mapGetters("surveys",["getSurveysList"])
  },
  methods: {
    handleSelecStudy(survey) {
      this.$router.push(`/surveyDetail/${this.studyId}/${survey}`)
    },
  },
  props: {
    studyId: {
      type: String,
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch("surveys/FetchSurveyByStudy",{studyId:to.params.studyId})]).then(() => {
      next();
    });
  },
};
</script>
