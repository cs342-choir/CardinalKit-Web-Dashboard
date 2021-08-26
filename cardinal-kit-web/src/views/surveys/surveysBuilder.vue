<template>
  <div  id="app">
    <div class="wrapper">
      <h1>Surveys Builder</h1>
      <br />
      <label>Enter the title: </label>
      <input v-model="title" type="text" placeholder="Title" />
      <br>
      <label>Enter the subtitle: </label>
      <input v-model="subtitle" type="text" placeholder="Subtitle" />
      <br>
      <label>Order: </label>
      <input v-model="orderSurvey" type="number"  min="1" pattern="^[0-9]+"/>
      <br>
      <label>Section: </label>
      <input v-model="section" type="text" placeholder="Section" />
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
          Save
        </button>
      </div>
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
    orderQuestion:0,
    orderSurvey:"1",
    surveys: {},
  }),
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
    },
    deleteQuestions(index) {
      delete this.surveys[index]
    },
    printJson() {
      let questionData={
        'image':"SurveyIcon",
        'order':this.orderSurvey,
        'section':this.section,
        'subtitle':this.subtitle,
        'title':this.title
      }

      this.SaveSurvey({
        id: uuidv4(),
        studyId: this.studyId,
        questions:this.surveys,
        data: questionData,
      }).then(()=>{
        console.log("created")
        this.$router.go(0);
      })
    },
  },
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
