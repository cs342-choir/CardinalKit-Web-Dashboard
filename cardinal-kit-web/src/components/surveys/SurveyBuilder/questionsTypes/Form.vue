<template>
  <form>
    <div class="Form">
      <!--   <div>
          <br />
          <label>Description: </label>
          <textarea           
            v-model="Survey.description"
            class="TextInput"
            placeholder="Description"
            rows="5" cols="100"
          />
        </div> -->
        <br />
        <br />
      <div class="form-row" v-for="(question, index) in Survey.question" :key="index">
        <div class="form-group col-md-6">
          <label>Select the type of question: </label>
          <br />
          <br />
          <AltSelect
            :defaultValue="question.type"
            :options="formQuestionTypes"
            v-model="question.type"
            :name="`
               questions[${index}][type]`"
            type="text"
            class="form-control"
            placeholder="Type of question"
            :onChange="
              () => {
                createFormQuestionOptions(question.type, index);
              }
            "
          />
          <br />
        </div>
        <div
          v-if="question.type != '' && question.type != null"
          class="form-group col-md-6"
        >
          <label>Identifier: </label>
          <input
            
            v-model="question.identifier"
            :name="`
               questions[${index}][id]`"
            type="text"
            class="TextInput"
            placeholder="id"
          />
        </div>

        <div
          v-if="question.type != '' && question.type != null"
        >
          <input            
            type="checkbox"
            v-model="question.required"
            :name="`
               questions[${index}][required]`"
            hidden
          />
        </div>      

        <div
          v-if="question.type != '' && question.type != null && question.type != 'form' && question.type != 'instruction'"
          class="form-group col-md-6"
        >
          <br />
          <label>Question: </label>
          <input
            
            v-model="question.question"
            :name="`
               questions[${index}][question]`"
            type="text"
            class="TextInput"
            placeholder="Question"
          />
        </div>

        <div v-if="question.type === 'scale'" class="form-group col-md-6">
            <Scale :Options="question" />
        </div>

        <div v-if="question.type === 'boolean'" class="form-group col-md-6">
          <Boolean :Options="question" />
        </div>

        <div v-if=" question.type === 'singleChoice' " class="form-group col-md-6" >
          <br />
          <Radio :Options="question.options" />
        </div>

        <div v-if=" question.type === 'multipleChoice' " class="form-group col-md-6" >
          <br />
          <Checkbox :Options="question.options" />
        </div>

        <div v-if=" question.type === 'instruction' " class="form-group col-md-6" >
          <br />
          <Instruction :Options="question.options" />
        </div>

        <div v-if=" question.type === 'text' " class="form-group col-md-6" >
          <br />
          <Text />
        </div>

        <div v-if=" question.type === 'textarea' " class="form-group col-md-6" >
          <br />
          <TextArea />
        </div>

        <div v-if=" question.type === 'signature' " class="form-group col-md-6" >
          <br />
          <Signature />
        </div>

        <div v-if="question.type === 'date'" class="form-group col-md-6">
          <br />
          <Date />
        </div>

        <div v-if="question.type === 'decimal'" class="form-group col-md-6">
          <br />
          <Decimal />
        </div>

        <div v-if="question.type === 'email'" class="form-group col-md-6">
          <br />
          <Email />
        </div>

        <div v-if="question.type === 'height'" class="form-group col-md-6">
          <br />
          <Height />
        </div>

        <div v-if="question.type === 'integer'" class="form-group col-md-6">
          <br />
          <Integer />
        </div>

        <div v-if="question.type === 'location'" class="form-group col-md-6">
          <br />
          <Location />
        </div>

        <div v-if="question.type === 'socioeconomic'" class="form-group col-md-6">
          <br />
          <SocioEconomic />
        </div>

        <div v-if="question.type === 'textscale'" class="form-group col-md-6">
          <br />
          <TextScale />
        </div>

        <div v-if="question.type === 'timeinterval'" class="form-group col-md-6">
          <br />
          <TimeInterval />
        </div>

        <div v-if="question.type === 'timeofday'" class="form-group col-md-6">
          <br />
          <TimeOfDay />
        </div>

        <div v-if="question.type === 'weight'" class="form-group col-md-6">
          <br />
          <Weight />
        </div>
        
        <br />
        <br />

        <button
          @click="
            () => {
              deleteFormQuestion(index);
            }
          "
          type="button"
        >
          Delete Form Question
        </button>
        <br />
        <br />
        <hr />
      </div>
      <div class="form-group">
        <button @click="addFormQuestion" type="button" class="btn btn-secondary">
          Add Form Question
        </button>
      </div>
    </div>
  </form>
</template>

<script>

import Checkbox from "@/components/surveys/SurveyBuilder/questionsTypes/CheckBox";
import Radio from "@/components/surveys/SurveyBuilder/questionsTypes/Radio";
import Scale from "@/components/surveys/SurveyBuilder/questionsTypes/Scale";
import Instruction from "@/components/surveys/SurveyBuilder/questionsTypes/Instruction";
import Text from "@/components/surveys/SurveyBuilder/questionsTypes/Text";
import TextArea from "@/components/surveys/SurveyBuilder/questionsTypes/TextArea";
import Signature from "@/components/surveys/SurveyBuilder/questionsTypes/Signature";
import Boolean from "@/components/surveys/SurveyBuilder/questionsTypes/Boolean";
import Date from "@/components/surveys/SurveyBuilder/questionsTypes/Date";
import Decimal from "@/components/surveys/SurveyBuilder/questionsTypes/Decimal";
import Email from "@/components/surveys/SurveyBuilder/questionsTypes/Email";
import Height from "@/components/surveys/SurveyBuilder/questionsTypes/Height";
import Integer from "@/components/surveys/SurveyBuilder/questionsTypes/Integer";
import Location from "@/components/surveys/SurveyBuilder/questionsTypes/Location";
import SocioEconomic from "@/components/surveys/SurveyBuilder/questionsTypes/SocioEconomic";
import TextScale from "@/components/surveys/SurveyBuilder/questionsTypes/TextScale";
import TimeInterval from "@/components/surveys/SurveyBuilder/questionsTypes/TimeInterval";
import TimeOfDay from "@/components/surveys/SurveyBuilder/questionsTypes/TimeOfDay";
import Weight from "@/components/surveys/SurveyBuilder/questionsTypes/Weight";
import AltSelect from "@/components/multiSelect/Select";
import { uuidv4 } from "@/helpers";

export default {
  props: {
    Survey: Object,
  },
  components: {
    AltSelect,
    Checkbox,
    Radio,
    Scale,
    Instruction,
    Text,
    TextArea,
    Signature,
    Boolean,
    Date,
    Decimal,
    Email,
    Height,
    Integer,
    Location,
    SocioEconomic,
    TextScale,
    TimeInterval,
    TimeOfDay,
    Weight,
  },

  data: () => ({
    formQuestionTypes: [
      "text",
      "textarea",
      "singleChoice",
      "multipleChoice",
      "scale",
      "boolean",
      "instruction",
      "signature",
      "date",
      "numeric",
      "email",
      "location",
      "textScale",
      "timeinterval",
      "timeofday",
      "height",
      "weight",
      "socioeconomic",
    ],
  }),

  methods: {
    addFormQuestion() {
      if(!this.Survey.question){
        this.Survey.question=[]
      }
      this.Survey.question.push({
        id: uuidv4(),
        type: "",
        scope: "public",
        identifier: "",
        description: "",
        question: [],
        required: true,
        options: [],
      });
    },

    deleteFormQuestion(index) {
      this.Survey.question.splice(index, 1);
    },


    createFormQuestionOptions(type, index) {
   //   const surveyIndex = this.Survey.findIndex((data) => data.id === id);

      switch (type) {
        case 'singleChoice':
          this.Survey.question[index].type = "singleChoice"
          this.Survey.question[index].options = [
            { text: "", value: 0 },
            { text: "", value: 1 },
          ];
          break;
        case 'multipleChoice':
          this.Survey.question[index].type = "multipleChoice"
          this.Survey.question[index].options = [
            { text: "", value: 0 },
            { text: "", value: 1 },
          ];
          break;
        case "boolean":
          this.Survey.question[index].yes = "" 
          this.Survey.question[index].no = "" 
          //this.Survey.question[index].options = [{ yes: "", no: "" }];
          break;
        case "scale":
         this.Survey.question[index].min = ""
         this.Survey.question[index].minValueDescription = ""
         this.Survey.question[index].max = ""
         this.Survey.question[index].maxValueDescription = ""
         this.Survey.question[index].step = ""
         this.Survey.question[index].default = ""
         this.Survey.question[index].vertical = false
         // this.Survey.question[index].options = [{ min: "", max: "", step: "" }];
          break;
        default:
          this.Survey.question[index].options = [{}];
      }
    },

    placeholderSetter(index) {
      return "Option " + (index + 1);
    },

  },
};
</script>

<style>
</style>