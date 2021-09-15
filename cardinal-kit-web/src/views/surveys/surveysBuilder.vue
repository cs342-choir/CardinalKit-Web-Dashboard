<template>
  <div id="app">
    <div class="wrapper">
      <h1 class="text-center text-muted font-weight-bold">Surveys Builder</h1>
      <br />
      <div class="input-form">
        <div :class="cl" v-if="errMsg">
          {{msg}}
        </div>
        <label>Title: </label>
        <input v-model="title" type="text" placeholder="Enter the title" />
        <br />
        <label>Subtitle: </label>
        <input v-model="subtitle" type="text" placeholder="Enter the subtitle" />
        <br />
        <label class="my-4">Show on main screen: </label>
        <input v-model="main" type="checkbox" />
        <br />
        <label>Order: </label>
        <input v-model="orderSurvey" type="number"  min="1" pattern="^[0-9]+"/>
        <br />
        <label>Section: </label>
        <input v-model="section" type="text" placeholder="Enter the section" />
        <br />
        <label>Icon: </label>
        <input type="file" placeholder="Icon" accept="image/*" />
        <br>
        <div v-for="survey in surveys" :key="survey.id">
          <Question :survey="survey" :readonly="false" @DeleteQuestion="deleteQuestions" />
        </div>
        <br />
        <div class="form-group my-4">
          <button @click="addQuestion" type="button" class="btn btn-secondary">
            Add question
          </button>
        </div>

        <div class="form-group">
          <button @click="saveSurveybuild" type="button" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "@/components/surveys/SurveyBuilder/Questions";
import { mapActions, mapGetters } from "vuex";
import { uuidv4 } from "@/helpers";
import store from "@/store";

export default {
  name: "App",
  props: {
    studyId: {
      type: String,
      required: true,
    }
  },
  data: () => ({
      image: null,
      main: true,
      section: "",
      subtitle: "",
      title: "",
      scopeTypes: ["Public", "Private"],
      surveyName: "",
      orderQuestion:0,
      orderSurvey:"1",
      surveys: {},
      errMsg: false,
      msg:"",
      cl: ""
  }),
  components: {
      Question,
  },
  methods: {
    ...mapActions("surveys", ["SaveSurvey"]),
    addQuestion() {
      this.errMsg = false
      this.msg = ""
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
    },
    deleteQuestions(index) {
      delete this.surveys[index]
    },
    validSurvey(surveys, questionData){
      this.errMsg = false
      this.msg=""
      let allIdentifiers = this.getAllQuestion.map(obj => obj.identifier)
      let identifiers = Object.values(surveys).map(obj => obj.identifier)
      let unique = true
      for (const key of identifiers) {
        if (allIdentifiers.includes(key)){
          unique = false
        }
      }
      if (unique){
        this.SaveSurvey({
          id: uuidv4(),
          studyId: this.studyId,
          questions: surveys,
          data: questionData,
        }).then(()=>{
          this.errMsg = true
          this.msg="Surveys Builder has been created successfully"
          this.cl= "alert-success"
        })
      }else{
        this.errMsg = true
        this.cl = "alert-err"
        this.msg="Identifier should be unique"
      }
    },
    saveSurveybuild() {
      this.errMsg = false
      this.msg=""
      if(this.section && this.subtitle && this.title){
        let questionData={
          'image':"SurveyIcon",
          'order':this.orderSurvey,
          'section':this.section,
          'subtitle':this.subtitle,
          'title':this.title,
          'main': this.main
        }
        if(Object.keys(this.surveys).length){
          this.validSurvey(this.surveys, questionData)
        }else{
          this.errMsg = true
          this.cl = "alert-err"
          this.msg = "The questions cannot be empty"
        }
      }else{
        this.errMsg = true
        this.cl = "alert-err"
        this.msg = "The fields can't be blank"
      }
    },
  },
  computed:{
    ...mapGetters("surveys", ["getAllQuestion"]),
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("surveys/FetchSurveyQuestions", {
        studyId: to.params.studyId
      })
    ])
    .then(() => {
      next();
    });
  }
};
</script>

<style lang="scss">
.wrapper {
  margin-top: 5%;
  margin-bottom: 5%;
}
.input-form{
  margin: auto;
  width: 60%;
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
