<template>
  <div class="page">
    <button @click="schedule">Scheduler</button>
    Select survey type
    <alt-select
      :options="surveyTypes"
      v-model="surveySelected"
      :onChange="onSurveyTypeChange"
      ref="surveyTypeSelect"
    />
    Select Question of survey
    <alt-select
      :options="surveyQuestions"
      v-model="questionSelected"
      ref="questionSelect"
    />
    <br/>
    <br/>
    <survey :data="surveyData" />
  </div>
</template>
<script>
import altSelect from "@/components/multiSelect/Select";
import { mapGetters } from "vuex";
import store from "@/store";
import survey from "@/components/surveys/survey";
export default {
  name: "surveyUser",
  data() {
    return {
      surveySelected: null,
      questionSelected: null,
      studyId: this.$route.query.studyId
    };
  },
  components: {
    altSelect,
    survey
  },
  methods: {
    onSurveyTypeChange() {
      this.$refs.questionSelect.setNewValue(
        this.surveyQuestions && this.surveyQuestions.length > 0
          ? this.surveyQuestions[0].id
          : null
      );
    },
    schedule() {
      this.$router.push(`/surveyScheduler/${this.studyId}?userId=${this.$route.query.userId}`)
    }
  },
  computed: {
    ...mapGetters("surveys", ["getUserAnswers"]),
    surveyTypes() {
      let types = [];
      let surveys = this.getUserAnswers(this.studyId,this.$route.query.userId)
      for (const [key, value] of Object.entries(surveys)) {
        types.push({ id: key, name: value.data.title, value: key})
    }
      return types;
    },
    surveyQuestions() {
      let qs = [];
      if(this.surveySelected){
        let surveys = this.getUserAnswers(this.studyId,this.$route.query.userId)
        let questions = surveys[this.surveySelected].questions        
        for (const [key, value] of Object.entries(questions)) {
          qs.push({
             id: value.identifier,
             name: value.question,
             value: value.identifier,
           });
        }
      }
      return qs;
    },
    surveyData(){
      let surveys = this.getUserAnswers(this.studyId,this.$route.query.userId)
      let questionData = surveys[this.surveySelected]
      if(questionData){
     //   console.log("question data",questionData.answers[this.questionSelected])
        if(questionData.answers[this.questionSelected]){
          return questionData.answers[this.questionSelected]
        }
      }
      return {}
    }
  },
  mounted() {
    this.$refs.surveyTypeSelect.setNewValue(
      this.surveyTypes && this.surveyTypes.length > 0
        ? this.surveyTypes[0].id
        : null
    );
    this.surveySelected =
      this.surveyTypes && this.surveyTypes.length > 0
        ? this.surveyTypes[0].id
        : null;
    this.$refs.questionSelect.setNewValue(
      this.surveyQuestions && this.surveyQuestions.length > 0
        ? this.surveyQuestions[0].id
        : null
    );
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("surveys/FetchUserSurveyData", {
        studyId: to.query.studyId,
        userId: to.query.userId,
      }),
    ]).then(() => {
      next();
    });
  },
};
</script>
