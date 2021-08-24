<template>
  <div  id="app">
    <div class="wrapper" v-if="surveyData">
      <h1>Edit Surveys Builder</h1>
      <br />
      <div>
        <label>Enter The Survey Name:</label>
        <input v-model="questionId" type="text" placeholder="Survey Name" />
      </div>
      <label>Enter the title: </label>
      <input v-model="surveyData.title" type="text" placeholder="Title" />
      <br>
      <!-- nunca se llena porque no hay key subtitle -->
      <label>Enter the subtitle: </label>
      <input v-model="surveyData.subtitle" type="text" placeholder="Subtitle" />
      <br>
      <label>Order: </label>
      <input v-model="surveyData.order" type="number"  min="1" pattern="^[0-9]+"/>
      <br>
      <!-- nunca se llena porque no hay key section -->
      <label>Section: </label>
      <input v-model="surveyData.section" type="text" placeholder="Section" />
      <br>
      <label>Icon: </label>
      <input type="file" placeholder="Icon" accept="image/*" />
      <br>
      <div v-for="survey in surveys" :key="survey.id">
        <Question :survey="survey" @DeleteQuestion="deleteQuestions" />
      </div>
      <br />
      <div class="form-group">
        <button @click="addQuestion" type="button" class="btn btn-secondary">
          Add question
        </button>
      </div>

      <div class="form-group">
        <button @click="printJson" type="button" class="btn btn-primary">
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "@/components/surveys/SurveyBuilder/Questions";
import { mapActions, mapGetters } from "vuex";
import store from "@/store";
import { uuidv4 } from "@/helpers";

export default {
  name: "App",
  props: {
    studyId: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      questionId: this.$route.params.questionId,
      image: null,
      section: "",
      subtitle: "",
      title: "",
      scopeTypes: ["Public", "Private"],
      surveyName: "",
      orderQuestion:0,
      order:"",
      surveys: {},
      surveyData:null
    }
  },
  components: {
    Question,
  },
  methods: {
    ...mapActions("surveys", ["SaveSurvey"]),
    addQuestion() {
      this.orderQuestion+=1
      let id = uuidv4()
      this.surveys[id]={
        title: "",
        id: id,
        type: "",
        scope: "public",
        identifier: "",
        description: "",
        question: [],
        required: true,
        options: [],
        order:""+this.orderQuestion
      }
      //console.log(this.surveys, "surveyData")
    },

    deleteQuestions(index) {
      delete this.surveys[index]
    },
    printJson() {
      // const data = {
      //   surveys: this.surveys,
      // };
      // console.log(JSON.stringify(data, null, 2));
      let questionData={
        'image':"SurveyIcon",
        'order':this.order,
        'section':this.section,
        'subtitle':this.subtitle,
        'title':this.title
      }

      // const data = {
      //  studyId: this.studyId,
      //   name: this.surveyName,
      //   questions:this.surveys,
      //   data: questionData,
      // };
      // console.log(JSON.stringify(data, null, 2));

    /*   this.SaveSurvey({
        studyId: this.studyId,
        name: this.surveyName,
        questions:this.surveys,
        data: questionData,
      }).then(()=>{
        this.$router.go(0);
      }) */
    },
  },
  computed: {
    ...mapGetters("surveys", ["getUserSurveysBuilder"]),
    ...mapGetters("user", ["getUserId"]),
  },
  created(){
    this.surveyData = this.getUserSurveysBuilder[this.questionId]
    this.surveys[this.surveyData.id] = this.surveyData
    //console.log(this.getUserSurveysBuilder[this.questionId], "QUESTION")
    console.log(this.surveys, "surveys")
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("surveys/FetchSurveyBuilderUser", {
        studyId: to.params.studyId,
        //questionId: to.params.questionId,
    })
    .then(() => {
      next();
    });
  }
};
</script>

<style lang="scss">
.wrapper {
  margin: 5%;
}
.surveys > div {
  margin: 10px 0;
  padding-bottom: 10px;
}
.btn {
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
