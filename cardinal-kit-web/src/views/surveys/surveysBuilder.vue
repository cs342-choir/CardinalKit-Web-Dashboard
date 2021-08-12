<template>
  <div id="app" class="container">
      <h1>Surveys Builder</h1>
      <br />
      <h3>Enter The Survey Name</h3>
      <br />
      <br />
      <input v-model="surveyName" type="text" placeholder="Survey Name" />
      <template v-if="surveys.length"> 
      <Question  :Survey ="surveys"  @DeleteQuestion="deleteQuestions"/>

      </template>
      <br>
      <div class="form-group">
      <button @click="addQuestion" type="button" class="btn btn-secondary">
        Add question
      </button>
      </div>


      <div class="form-group">
        <button @click="printJson" type="button" class="btn btn-primary">
          Print
      </button>
      </div>
  </div>
</template>

<script>
import FormQuestion from "@/components/surveys/SurveyBuilder/Forms";
import Question from "@/components/surveys/SurveyBuilder/Questions";
import { mapActions } from "vuex";
import {uuidv4} from "@/helpers"


export default {
  name: "App",
  props: {
    studyId: {
      type: String,
      required: true,
    },
  },

  data: () => ({

    scopeTypes: ["Public", "Private"],
    surveyName: "",
    surveys: [],
  }),
  components: {
    FormQuestion,
    Question,
  },

  methods: {
    ...mapActions("surveys", ["SaveSurvey"]),
    
    addQuestion() {
      this.surveys.push({    
        surveyName:this.surveyName,   
        id: uuidv4(),
        type: "",
        scope: "public",
        identifier: "",
        description: "",
        questions: [],
        required: true,
        options: [],
      });
    },
      
    deleteQuestions(index) {
        console.log("Esta seria la que voy a eliminar",this.surveys[index] )
        this.surveys.splice(index, 1);
     },

    


    // handleChangeQuestion({ question, id }) {
    //   const surveyIndex = this.surveys.findIndex((data) => data.id === id);
    //   this.surveys[surveyIndex] = { ...this.surveys[surveyIndex], ...question };
    // },

    printJson() {
      console.log(this.surveyName);
      const data = {
        surveys: this.surveys,
      };
      console.log(JSON.stringify(data, null, 2));

      // this.SaveSurvey({
      //   studyId: this.studyId,
      //   name: this.surveyName,
      //   questions:this.surveys
      // })
    },
  },
};

</script>

<style lang="scss">
.surveys > div {
  margin: 10px 0;
  padding-bottom: 10px;
}
.btn {
  text-decoration: underline;
  color: black;
  background: transparent;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-secondary {
  text-decoration: none;
  color: black;
  border-color: #000000;
  background: #b71540;
}
.btn-terceary {
  text-decoration: underline;
  color: black;
  border-color: #000000;
  background: transparent;
}
</style>
