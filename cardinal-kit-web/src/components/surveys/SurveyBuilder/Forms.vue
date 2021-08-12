<template>
  <form>
    <div class="Form">
      <div class="form-row" v-for="(survey, index) in Questions" :key="index">
        <div class="form-group col-md-6">
          <label>Select the type of question: </label>
          <br />
          <br />
          <AltSelect
            :options="formSubQuestionTypes"
            v-model="survey.type"
            :name="`
               surveys[${index}][type]`"
            type="text"
            class="form-control"
            placeholder="Type of question"
            :onChange="
              () => {
                createFormSubQuestionOptions(survey.type, index);
              }
            "
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
               surveys[${index}][id]`"
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
               surveys[${index}][required]`"
            hidden
          />
        </div>

        <div
          v-if="
            survey.type != '' && survey.type != null && survey.type != 'Form'
          "
          class="form-group col-md-6"
        >
          <br />
          <label>Question: </label>
          <input
            v-model="survey.questions"
            :name="`
               surveys[${index}][question]`"
            type="text"
            class="TextInput"
            placeholder="Question"
          />
        </div>

        <div v-if="survey.type === 'Scale'" class="form-group col-md-6">
          <template v-for="(option, index) in survey.options" :key="index">
            <br />
            <br />
            <label>Min: </label>
            <input
              v-model="option.min"
              :name="`
               options[${index}]`"
              type="number"
              class="TextInput"
              placeholder="Max"
            />
            <label>Max: </label>
            <input
              v-model="option.max"
              :name="`
               options[${index}]`"
              type="number"
              class="TextInput"
              placeholder="Min"
            />
            <label>Step: </label>
            <input
              v-model="option.step"
              :name="`
               options[${index}]`"
              type="number"
              class="TextInput"
              placeholder="Step"
            />
          </template>
        </div>

        <div v-if="survey.type === 'Boolean'" class="form-group col-md-6">
          <template v-for="(option, index) in survey.options" :key="index">
            <br />
            <br />
            <label>Answer Choices</label>
            <br />
            <input
              v-model="option.yes"
              :name="`
               options[${index}][options]`"
              type="text"
              class="TextInput"
              placeholder="Yes"
            />
            <br />
            <br />

            <input
              v-model="option.no"
              :name="`
               options[${index}][options]`"
              type="text"
              class="TextInput"
              placeholder="No"
            />
          </template>
        </div>

        <div
          v-if="
            survey.type === 'Multiple' ||
            survey.type === 'Checkbox' ||
            survey.type === 'Radio'
          "
          class="form-group col-md-6"
        >
          <br />
          <label>Options: </label>
          <template v-for="(option, index) in survey.options" :key="index">
            <br />

            <input
              class="CheckBoxInput"
              v-if="survey.type == 'Checkbox' || survey.type == 'Multiple'"
              type="checkbox"
              disabled
            />
            <input
              class="RadioInput"
              v-if="survey.type == 'Radio'"
              type="radio"
              disabled
            />

            <input
              v-model="option.text"
              :name="`
               options[${index}]`"
              type="text"
              class="TextInput"
              :placeholder="placeholderSetter(index)"
            />

            <button
              v-if="index > 1"
              @click="
                () => {
                  deleteFormSubQuestionOptions(
                    survey.options,
                    index,
                    survey.id
                  );
                }
              "
              type="button"
            >
              Delete
            </button>
            <br />
          </template>

          <br />
          <br />
          <div class="form-group">
            <button
              @click="addFormSubQuestionOptions(index)"
              type="button"
              class="btn btn-terceary"
            >
              Add Options
            </button>
          </div>
        </div>
        <br />
        <br />

        <button
          @click="
            () => {
              deleteFormSubQuestion(index);
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
      <div class="form-group">
        <button @click="addFormSubQuestion" type="button" class="btn btn-secondary">
          Add Form Question
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import AltSelect from "@/components/multiSelect/Select";
import { uuidv4 } from "@/helpers";

export default {
  props: {
    Questions: Array,
  },

  components: {
    AltSelect,
  },

  data: () => ({
    formSubQuestionTypes: [
      "Area",
      "Text",
      "Checkbox",
      "Radio",
      "Multiple",
      "Scale",
      "Boolean",
      "Instruction",
      "Signature",
    ],
  }),

  methods: {
    addFormSubQuestion() {
      this.Questions.push({
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

    deleteFormSubQuestion(index) {
      console.log("Esta seria la que voy a eliminar", this.Questions[index]);
      this.Questions.splice(index, 1);
    },

    addFormSubQuestionOptions(index) {
      // const surveyIndex = this.Questions.findIndex((data) => data.id === id);
     const val = this.Questions[index].options.length;
      this.Questions[index].options.push({ text: "", value: val });
    },

    deleteFormSubQuestionOptions(data, index) {
      data.splice(index, 1);
    },

    createFormSubQuestionOptions(type, index) {
      // const surveyIndex = this.Questions.findIndex((data) => data.id === id);
      switch (type) {
        case "Checkbox":
        case "Radio":
        case "Multiple":
          this.Questions[index].options = [
            { text: "", value: 0 },
            { text: "", value: 1 },
          ];
          break;
        case "Boolean":
          this.Questions[index].options = [{ yes: "", no: "" }];
          break;
        case "Scale":
          this.Questions[index].options = [{ min: "", max: "", step: "" }];
          break;
        default:
          this.Questions[index].options = [{}];
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