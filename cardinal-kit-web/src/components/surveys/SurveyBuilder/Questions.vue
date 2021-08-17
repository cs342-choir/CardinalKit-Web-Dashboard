<template>
  <form>
    <div class="surveys">
      
        <div class="form-group col-md-6">
          <label>Select the type of question: </label>
          <br />
          <br />
          {{survey.type}}
          <AltSelect
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
              }"
          />
          <br />
        </div>

        <div
          v-if="survey.type != '' && survey.type != null"
          class="form-group col-md-6"
        >
          <label>Identifier: </label>
          <input
            v-model="survey.identifier"
            :name="`
               surveys[${survey.id}][id]`"
            type="text"
            class="TextInput"
            placeholder="id"
          />
        </div>

        <div v-if="survey.type != '' && survey.type != null">
          <input
            type="checkbox"
            v-model="survey.required"
            :name="`
               surveys[${survey.id}][required]`"
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
          <Scale :Options="survey.options" />
        </div>

        <div v-if="survey.type === 'boolean'" class="form-group col-md-6">
          <Boolean :Options="survey.options" />
        </div>

        <div v-if="survey.type === 'radio'" class="form-group col-md-6">
          <br />
          <Radio :Options="survey.options" />
        </div>

        <div v-if="survey.type === 'checkbox'" class="form-group col-md-6">
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

        <div v-if="survey.type === 'integer'" class="form-group col-md-6">
          <br />
          <Integer />
        </div>

        <div v-if="survey.type === 'location'" class="form-group col-md-6">
          <br />
          <Location />
        </div>

        <div v-if="survey.type === 'socioeconomic'" class="form-group col-md-6">
          <br />
          <SocioEconomic />
        </div>

        <div v-if="survey.type === 'textscale'" class="form-group col-md-6">
          <br />
          <TextScale />
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

export default {
  props: {
    survey: Object,
  },

  components: {
    AltSelect,
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
  },

  data: () => ({
    questionTypes: [
      "text",
      "textarea",
      "single choice",
      "multiple choice",
      "form",
      "scale",
      "boolean",
      "instruction",
      "signature",
      "date",
      "integer",
      "decimal",
      "email",
      "location",
      "textscale",
      "timeinterval",
      "timeofday",
      "height",
      "weight",
      "socioeconomic",
    ],
    questionValues: [],
  }),

  methods: {
    createQuestionOptions(type, id) {
    //   const surveyIndex = this.Survey.findIndex((data) => data.id === id);
    //   switch (type) {
    //     case "single choice":
    //       this.Survey[surveyIndex].type = "radio";
    //       this.Survey[surveyIndex].options = [
    //         { text: "", value: 0 },
    //         { text: "", value: 1 },
    //       ];
    //       break;
    //     case "multiple choice":
    //       this.Survey[surveyIndex].type = "checkbox";
    //       this.Survey[surveyIndex].options = [
    //         { text: "", value: 0 },
    //         { text: "", value: 1 },
    //       ];
    //       break;
    //     case "boolean":
    //       this.Survey[surveyIndex].options = [{ yes: "", no: "" }];
    //       break;
    //     case "scale":
    //       this.Survey[surveyIndex].options = [{ min: "", max: "", step: "" }];
    //       break;
    //     default:
    //       this.Survey[surveyIndex].options = [{}];
    //   }
    },

    deleteQuestion(index) {
      this.$emit("DeleteQuestion", index);
    },

    placeholderSetter(index) {
      return "Option " + (index + 1);
    },

    printSomething(data) {
      console.log(data);
    },
  },
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
</style>