<template>
  <div  id="app">
    <div class="wrapper" v-if="surveys">
      <div class="alert-err" v-if="errMsg">
        {{msg}}
      </div>
      <div class="input-form">
        <h1>Edit Surveys Builder</h1>
        <br />
        <label>Enter the title: </label>
        <input v-model="surveys.title" type="text" placeholder="Title" />
        <br>
        <label>Enter the subtitle: </label>
        <input v-model="surveys.subtitle" type="text" placeholder="Subtitle" />
        <br>
        <label>Order: </label>
        <input v-model="surveys.order" type="number"  min="1" pattern="^[0-9]+"/>
        <br>
        <label>Section: </label>
        <input v-model="surveys.section" type="text" placeholder="Section" />
        <br>
        <label>Icon: </label>
        <input type="file" placeholder="Icon" accept="image/*" />
        <br>
        <div v-for="survey in newData" :key="survey.id">
          <Question :survey="survey" @DeleteQuestion="deleteQuestions" />
        </div>
        <br />
        <div class="form-group">
          <button @click="addQuestion" type="button" class="btn btn-secondary">
            Add question
          </button>
        </div>
        <div class="form-group">
          <button @click="saveNewSurveys" type="button" class="btn btn-primary">
            Update
          </button>
        </div>
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
      surveyId: this.$route.params.surveyId,
      index: this.$route.params.index,
      image: null,
      section: "",
      subtitle: "",
      title: "",
      scopeTypes: ["Public", "Private"],
      surveyName: "",
      orderQuestion:0,
      order:"",
      surveys: {},
      surveyData:null,
      questionData: {},
      newData:{},
      errMsg: false,
      msg: ""
    }
  },
  components: {
    Question,
  },
  methods: {
    ...mapActions("surveys", ["DeleteSurveyQuestion", "SaveQuestion", "UpdateSurveyData"]),
    addQuestion() {
      this.orderQuestion+=1
      let id = uuidv4()
      this.newData[id]={
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
      this.DeleteSurveyQuestion({...this.newData[index],
       name: this.surveyId,
       studyId: this.studyId
      }).then(() => {
        delete this.questionData[index]
        delete this.newData[index]
        console.log("deleted")
      })
    },
    update() {
      this.errMsg = false
      this.msg=""
      if (
        this.surveys.title && 
        this.surveys.subtitle && 
        this.surveys.order && 
        this.surveys.section
      ){
        if(Object.keys(this.newData).length){
          this.UpdateSurveyData({
            studyId: this.studyId,
            id: this.surveyId,
            data: this.surveys,
            questions: this.questionData,
          }).then(()=>{
            console.log("updated")
            this.errMsg = false
            this.$router.push(`/surveysList/${this.studyId}`);
          })
        }else{
          this.errMsg = true
          this.msg = "The questions cannot be empty"
        }
      }else{
        this.errMsg = true
        this.msg = "The fields can't be blank"
      }
    },
    saveNewSurveys(){
      let newQuestions = {}
      Object.keys(this.newData).forEach((key) => {
        if (!Object.keys(this.questionData).includes(key)){
          newQuestions[key] = this.newData[key]
        }
      })
      if(Object.keys(newQuestions).length){
        this.SaveQuestion({
          id: this.surveyId,
          studyId: this.studyId,
          questions: newQuestions,
        }).then(()=>{
          console.log("created")
        })
      }
      this.update()
    },
    setSurvey(){
      let questions = this.getUserSurveyQuestion[this.surveyId]
      if(questions && questions.length){
        questions.forEach(obj => {
          this.questionData[obj.id]=obj
        })
      }
      this.newData = {...this.questionData}
    },
    setSurveyData(){
      this.surveyData = this.getSurveysListData(this.studyId)[this.index]
      if (this.surveyData) {
        this.surveys={
          'image':this.surveyData.image,
          'order':this.surveyData.order,
          'section':this.surveyData.section,
          'subtitle':this.surveyData.subtitle,
          'title':this.surveyData.title
        }
      }
    }
  },
  computed: {
    ...mapGetters("surveys", ["getSurveysListData", "getUserSurveysBuilder", "getUserSurveyQuestion"]),
  },
  created(){
    this.setSurveyData()
    this.setSurvey()
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("surveys/FetchSurveyData", {
        studyId: to.params.studyId,
        surveyId: to.params.surveyId
      }),
      store.dispatch("surveys/FetchSurveyByStudy", {
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
