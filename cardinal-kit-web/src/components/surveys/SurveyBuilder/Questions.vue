<template>
  <form>
    <div class="surveys">
      <div class="form-group col-md-6">
        <label>Select the type of question: </label>
        <br />
        <br />
        <AltSelect
          :defaultValue="survey.type"
          :ref="survey.id"
          :options="questionTypes"
          v-model="survey.type"
          :name="`surveys[${survey.id}][type]`"
          type="text"
          class="form-control"
          placeholder="Type of question"
          :onChange="
            () => {
              createQuestionOptions(survey.type, survey.id);
            }
          "
        />
        <br />
      </div>
      <div
        v-if="survey.type != '' && survey.type != null"
        class="form-group col-md-6"
      >
        <label>Title: </label>
        <input
          v-model="survey.title"
          :name="`surveys[${survey.id}][title]`"
          type="text"
          placeholder="Title"
        />
      </div>
      <div
        v-if="survey.type != '' && survey.type != null"
        class="form-group col-md-6"
      >
        <label>Identifier: </label>
        <input
          v-model="survey.identifier"
          :name="`surveys[${survey.id}][identifier]`"
          type="text"
          placeholder="Identifier"
          :readonly="survey.readonly"
        />
      </div>
      <div
        v-if="survey.type != '' && survey.type != null"
        class="form-group col-md-6"
      >
        <label>Description: </label>
        <input
          v-model="survey.description"
          :name="`surveys[${survey.id}][description]`"
          type="text"
          placeholder="Description here..."
        />
      </div>

      <div v-if="survey.type != '' && survey.type != null">
        <input
          type="checkbox"
          v-model="survey.required"
          :name="`surveys[${survey.id}][required]`"
          hidden
        />
      </div>

      <div
        v-if="
          survey.type != '' &&
          survey.type != null &&
          survey.type != 'form' &&
          survey.type != 'instruction'
        "
        class="form-group col-md-6"
      >
        <br />
        <label>Question: </label>
        <input
          v-model="survey.question"
          :name="`
              surveys[${survey.id}][question]`"
          type="text"
          class="TextInput"
          placeholder="Question"
        />
      </div>

      <div v-if="survey.type == 'form'">
        <Form :Survey="survey" />
      </div>

      <div v-if="survey.type === 'scale'" class="form-group col-md-6">
        <Scale :Options="survey" /> 
      </div>

      <div v-if="survey.type === 'continuosScale'" class="form-group col-md-6">
        <ContinuosScale :Options="survey" />
      </div>

      <div v-if="survey.type === 'picker'" class="form-group col-md-6">
        <Picker :Options="survey.options" />
      </div>

      <div v-if="survey.type === 'boolean'" class="form-group col-md-6">
        <Boolean :Options="survey" />
      </div>

      <div v-if="survey.type === 'singleChoice'" class="form-group col-md-6">
        <br />
        <Radio :Options="survey.options" />
      </div>

      <div v-if="survey.type === 'multipleChoice'" class="form-group col-md-6">
        <br />
        <Checkbox :Options="survey.options" />
      </div>

      <div v-if="survey.type === 'instruction'" class="form-group col-md-6">
        <br />
        <Instruction :Options="survey.options" />
      </div>

      <div v-if="survey.type === 'text'" class="form-group col-md-6">
        <br />
        <Text />
      </div>

      <div v-if="survey.type === 'textarea'" class="form-group col-md-6">
        <br />
        <TextArea />
      </div>

      <div v-if="survey.type === 'signature'" class="form-group col-md-6">
        <br />
        <Signature />
      </div>

      <div v-if="survey.type === 'date'" class="form-group col-md-6">
        <br />
        <Date />
      </div>

      <div v-if="survey.type === 'decimal'" class="form-group col-md-6">
        <br />
        <Decimal />
      </div>

      <div v-if="survey.type === 'email'" class="form-group col-md-6">
        <br />
        <Email />
      </div>

      <div v-if="survey.type === 'height'" class="form-group col-md-6">
        <br />
        <Height />
      </div>

      <div v-if="survey.type === 'numeric'" class="form-group col-md-6">
        <br />
        <Integer :Options="survey" />
      </div>

      <div v-if="survey.type === 'location'" class="form-group col-md-6">
        <br />
        <Location />
      </div>

      <div v-if="survey.type === 'socioeconomic'" class="form-group col-md-6">
        <br />
        <SocioEconomic :Options="survey" />
      </div>

      <div v-if="survey.type === 'textscale'" class="form-group col-md-6">
        <br />
        <TextScale  :Survey="survey"/>
      </div>

      <div v-if="survey.type === 'timeinterval'" class="form-group col-md-6">
        <br />
        <TimeInterval />
      </div>

      <div v-if="survey.type === 'timeofday'" class="form-group col-md-6">
        <br />
        <TimeOfDay />
      </div>

      <div v-if="survey.type === 'weight'" class="form-group col-md-6">
        <br />
        <Weight />
      </div>
      <div v-if="survey.type === 'summary'" class="form-group col-md-6" >
        <br />
        <Summary />
      </div>

      <br />
      <br />

      <button
        @click="
          () => {
            deleteQuestion(survey.id);
          }
        "
        type="button"
      >
        Delete Question
      </button>
      <br />
      <br />
      <hr />
    </div>
  </form>
</template>

<script>
import AltSelect from "@/components/multiSelect/Select";
import Summary from "@/components/surveys/SurveyBuilder/questionsTypes/Summary";
import Form from "@/components/surveys/SurveyBuilder/questionsTypes/Form";
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
import ContinuosScale from "@/components/surveys/SurveyBuilder/questionsTypes/ContinuosScale.vue"
import Picker from "@/components/surveys/SurveyBuilder/questionsTypes/Picker.vue"
import CheckBoxVue from './questionsTypes/CheckBox.vue';

export default {
  props: {
    survey: Object,
   
  },
  components: {
    AltSelect,
    Picker,
    Form,
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
    ContinuosScale,
    Summary
  },

  data: () => ({
    questionTypes: [
      "text",
      "textarea",
      "singleChoice",
      "multipleChoice",
      "form",
      "scale",
      "boolean",
      "instruction",
      "signature",
      "date",
      "numeric",
      "email",
      "location",
      "textScale",
      "timeInterval",
      "timeOfDay",
      "height",
      "weight",
      "socioeconomic",
      "continuosScale",
      "picker",
      "summary"
    ],
    questionValues: [],
  }),
  methods: {
    createQuestionOptions(type, id) {
      switch (type) {
        case "singleChoice":
          this.survey.type = "singleChoice";
          if (!this.survey.options.length){
            this.survey.options = [
              { text: "", value: "0" },
              { text: "", value: "1" },
            ];
          }
          break;
        case "multipleChoice":
          this.survey.type = "multipleChoice";
          if (!this.survey.options.length){
            this.survey.options = [
              { text: "", value: "0" },
              { text: "", value: "1" },
            ]; 
          }
          break;
        case "boolean":
          !this.survey['yes'] ? this.survey['yes'] = "" : this.survey
          !this.survey['no'] ? this.survey['no'] = "" : this.survey
          break;
        case "scale":
          !this.survey["min"] ? this.survey["min"] = "" : this.survey
          !this.survey["minValueDescription"] ? this.survey["minValueDescription"] = "" : this.survey
          !this.survey["max"] ? this.survey["max"] = "" : this.survey
          !this.survey["maxValueDescription"] ? this.survey["maxValueDescription"] = "" : this.survey
          !this.survey["step"] ? this.survey["step"] = "" : this.survey
          !this.survey["default"] ? this.survey["default"] = "" : this.survey
          !this.survey["vertical"] ? this.survey["vertical"] = false  : this.survey
          break;
        case "numeric":
          !this.survey["max"] ? this.survey["max"] = "" : this.survey
          !this.survey["min"] ? this.survey["max"] = ""  : this.survey
          !this.survey["maxFractionDigits"] ? this.survey["max"] = "" : this.survey
          !this.survey["unit"] ? this.survey["max"] = "" : this.survey
          break;
        case "continuosScale":
          !this.survey["min"] ? this.survey["min"] = "" : this.survey
          !this.survey["minValueDescription"] ? this.survey["minValueDescription"] = "" : this.survey
          !this.survey["max"] ? this.survey["max"] = "" : this.survey
          !this.survey["maxValueDescription"] ? this.survey["maxValueDescription"] = "" : this.survey
          !this.survey["default"] ? this.survey["default"] = "" : this.survey
          !this.survey["maxFractionDigits"] ? this.survey["maxFractionDigits"]="" : this.survey
          !this.survey["vertical"] ? this.survey["vertical"] = false : this.survey
          break;
        case "picker":
          if (!this.survey.options.length){
            this.survey.options = [
              { text: "", value: "0" },
              { text: "", value: "1" },
            ];
          }
            break;
        default:
          if (!this.survey.options || !this.survey.options.length){
            this.survey["options"] = [{}];
          }
      }
    },
    deleteQuestion(index) {
     this.$emit("DeleteQuestion", index);
    }
  }
 };
</script>

<style lang="scss">
.CheckBoxInput {
  margin: 0px 10px 0px 10px;
  width: 15px;
  height: 15px;
}
.TextInput {
  margin: 0px 0px 0px 0px;
}

/* Form element setup */
form {

  margin: 2rem 0;
  z-index: 1;
}

fieldset {
  margin: 0 0 1rem 0;
  padding: 0;
  border: none;
}

legend {
  font-weight: 400;
}

legend,
label {
  display: inline-block;
  margin-bottom: .5rem;
}


input[type='text'],
input[type='email'],
textarea,
select {
  display: block;
  padding: .5rem;
  width: 100%;
  background-color: transparent;
  border-radius: .25rem;
  border: 1.5px solid #6c757d7d;//#e5e5e5;
  outline: none;
      
  /* List some properties that might change */
  transition-property: none;
  transition-duration: none;
  
  &:focus {
    border-color: rgb(239,126,173);
  }
}
input[type='text'],
input[type='email'],
select {
  height: 34px;
  border: 0px;
  border-radius: 0px;
  border-bottom: 1px solid #7F7F7F;
}

textarea {
  max-width: 300px;
  height: 100px;
}



input[type='number'],
input[type='time'],
select {
  display: block;
  padding: .5rem;
  width: 30%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #b9b9ba;
  outline: none;
  transition-property: none;

  &:focus {
    border-bottom: 1px solid rgb(255,150,200);
  }
}

select {
  font-size: .875rem;
}

input[type='checkbox'],
input[type='radio'] {
  position: relative;
  top: 5px;
  width: 22px;
  height: 22px;
  margin: 0 .5rem;
  background-color: white;
  border: 1px solid #e5e5e5;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  
  /* List some properties that might change */
  transition-property: none;
  transition-duration: none;
}

input[type='checkbox'] {
  border-radius: 5px;

  &:checked {
    background-color: rgb(239,126,173); 
    border: none;

    &:after {
      display: block;
      content: '';
      height: 4px;
      width: 10px;
      border-bottom: 3px solid #fff;
      border-left: 3px solid #fff;
      transform: translate(5px,6px) rotate(-45deg) scale(1);
    }
  }
}

input[type='radio'] {
  border-radius: 50%;
  
  &:checked {
    border-width: 5px;
    border-color: white;
    background-color: rgb(239,126,173);
  }
}

button {
  display: block;
  padding: .5rem 2rem;
  font-size: 125%;
  color: white;
  border: none;
  margin: auto;
  border-radius: .25rem;
  background-color: rgb(239,126,173);
  outline: none;
  box-shadow: 0 .4rem .1rem -.3rem rgba(0,0,0,.1);

  /* We'll talk about this next */
  transform: perspective(300px) scale(.95) translateZ(0);
  transform-style: preserve-3d;

  /* List the properties that you're looking to transition.
     Try not to use 'all' */
  transition-property: none;

  /* This applies to all of the above properties */
  transition-duration: none;
    
  &:hover {
    cursor: pointer;
    background-color: rgb(255,150,200);
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
    transform: scale(1.1) rotateX(0);
  }

  &:active {
    background-color: rgb(239,126,173);
    transform: scale(1.05) rotateX(-10deg);
  }
}
</style>