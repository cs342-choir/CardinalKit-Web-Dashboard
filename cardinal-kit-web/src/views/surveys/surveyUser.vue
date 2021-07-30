<template>
  <div>
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
    };
  },
  components: {
    altSelect,
    survey
  },
  methods: {
    onSurveyTypeChange() {
      console.log("change");
      this.$refs.questionSelect.setNewValue(
        this.surveyQuestions && this.surveyQuestions.length > 0
          ? this.surveyQuestions[0].id
          : null
      );
    },
  },
  computed: {
    ...mapGetters("surveys", ["getSurveysList", "getUserSurveys"]),
    surveyTypes() {
      let types = [];
      this.getSurveysList(this.studyId).map((element) => {
        types.push({ id: element, name: element, value: element });
      });
      return types;
    },
    surveyQuestions() {
      let qs = [];
      if (this.getUserSurveys[this.surveySelected]) {
        for (const [key, value] of Object.entries(
          this.getUserSurveys[this.surveySelected]
        )) {
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
        
        if(this.questionSelected){
            console.log("selected",this.getUserSurveys[this.surveySelected][this.questionSelected])
            
            return this.getUserSurveys[this.surveySelected][this.questionSelected]
        }
        return {}
    }
  },
  props: {
    studyId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log("types", this.surveyQuestions);
    this.$refs.surveyTypeSelect.setNewValue(
      this.surveyTypes && this.surveyTypes.length > 0
        ? this.surveyTypes[0].id
        : null
    );
    this.surveySelected =
      this.surveyTypes && this.surveyTypes.length > 0
        ? this.surveyTypes[0].id
        : null;
    console.log("types", this.surveyQuestions);
    this.$refs.questionSelect.setNewValue(
      this.surveyQuestions && this.surveyQuestions.length > 0
        ? this.surveyQuestions[0].id
        : null
    );
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("surveys/FetchSurveyByStudy", {
        studyId: to.params.studyId,
      }),
      store.dispatch("surveys/FetchSurveyUserData", {
        studyId: to.params.studyId,
        userId: to.params.userId,
      }),
    ]).then(() => {
      next();
    });
  },
};
</script>
