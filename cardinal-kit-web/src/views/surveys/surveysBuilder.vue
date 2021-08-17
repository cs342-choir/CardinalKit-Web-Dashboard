<template>
  <div id="app" class="container">
    <h1>Surveys Builder</h1>
    <br />
    <div>
      <label>Enter The Survey Name:</label>
      <input v-model="surveyName" type="text" placeholder="Survey Name" />
    </div>
    
    <label>Enter the title: </label>
    <input v-model="title" type="text" placeholder="Title" />
     <br>
    <label>Enter the subtitle: </label>
    <input v-model="subtitle" type="text" placeholder="Subtitle" />
     <br>
    <label>Section: </label>
    <input v-model="section" type="text" placeholder="Section" />
     <br>

    <label>Icon: </label>
    <input type="file" placeholder="Icon" accept="image/*" />
     <br>

    <!-- <template v-if="surveys.count"> -->
      <Question :survey="survey" @DeleteQuestion="deleteQuestions"   v-for="survey in surveys" :key="survey.id"  />
    <!-- </template> -->
    <br />
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
import Question from "@/components/surveys/SurveyBuilder/Questions";
import { mapActions } from "vuex";
import { uuidv4 } from "@/helpers";

export default {
  name: "App",
  props: {
    studyId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    image: null,
    section: "",
    subtitle: "",
    title: "",
    scopeTypes: ["Public", "Private"],
    surveyName: "",
    surveys: {},
  }),
  components: {
    Question,
  },

  methods: {
    ...mapActions("surveys", ["SaveSurvey"]),

    addQuestion() {
      let id = uuidv4()
      this.surveys[id]={
        surveyName: this.surveyName,
        id: id,
        type: "",
        scope: "public",
        identifier: "",
        description: "",
        question: [],
        required: true,
        options: [],
      }
    },

    deleteQuestions(index) {
      delete this.surveys[index]
      // this.surveys.splice(index, 1);
    },


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
