<template>
  <form>
    <div class="surveys">
      <div class="form-row" v-for="(question, index) in surveys" :key="index">
                  <div class="form-group col-md-6">
          <label>Select the type of question: </label>
          <AltSelect
            :options="questionTypes"
            v-model="question.type"
            :name="`
               surveys[${index}][type]`"
            type="text"
            class="form-control"
            placeholder="Type of question"          
          />
        </div>
          <Question :QuestionType ="question.type" :Id ="question.id" @OnChange ="handleChangeQuestion($event)"/>

      </div>
    </div>

    <button v-if="surveys.length"
      @click="
        () => {
          deleteQuestions(surveys, index);
        }
      "
      type="button"
    >
      Delete Question
    </button>
    <br />
    <br />

    <div class="form-group">
      <button @click="addQuestion" type="button" class="btn btn-secondary">
        Add question
      </button>
    </div>
    <br />

    <br />
  </form>
</template>

<script>
import Question from "@/components/surveys/SurveyBuilder/Questions";
import AltSelect from "@/components/multiSelect/Select";
import { uuidv4 } from "@/helpers";

export default {
  props: {
    surveys: Array,
  },

  components: {
    AltSelect,
    Question,
  },

  data: () => ({
    questionTypes: [
      "Area",
      "Text",
      "Checkbox",
      "Radio",
      "Multiple",
      "Form",
      "Scale",
      "Boolean",
      "Instruction",
      "Signature",
    ],
  }),
  methods: {
 
    addQuestion() {
      this.surveys.push({
        id: uuidv4(),
       // identifier: "",
       // description: "",
       // question: "",
        type: "",
        scope: "public",
       // required: true,
       // options: [{}],
      });
    },

    handleChangeQuestion({question,id}){
         console.log("Este es el console",question, id);
         const surveyIndex = this.surveys.findIndex((data) => data.id === id);
         //const val = this.surveys[surveyIndex].options.length;
         this.surveys[surveyIndex] = {...this.surveys[surveyIndex],...question}
    },

    deleteQuestions(data, index) {
      data.splice(index, 1);
    },

    //formulario

    addOptions(id) {
      const surveyIndex = this.surveys.findIndex((data) => data.id === id);
      const val = this.surveys[surveyIndex].options.length;
      this.surveys[surveyIndex].options.push({ text: "", value: val });
    },

    deleteOptions(data, index) {
      data.splice(index, 1);
    },


  },
};
</script>

<style>
</style>