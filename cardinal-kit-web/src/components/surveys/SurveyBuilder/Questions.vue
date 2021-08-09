<template>
  <form>
    <div class="surveys">
      <!-- <div class="form-row" v-for="(survey, index) in surveys" :key="index"> -->

      <div v-if="QuestionType != ''" class="form-group col-md-6">
        <br />
        <input
          @change="onChangeQuestion()"
          v-model="Question.id"
          :name="`
               surveys[${Id}][id]`"
          type="hidden"
          class="form-control"
          placeholder="identifier"
          readonly
        />
      </div>

      <div
        v-if="QuestionType != '' && QuestionType != null"
        class="form-group col-md-6"
      >
        <label>Identifier: </label>
        <input
          @change="onChangeQuestion()"

          v-model="Question.identifier"
          :name="`
               surveys[${Id}][id]`"
          type="text"
          class="form-control"
          placeholder="id"
        />
      </div>

      <div
        v-if="QuestionType != '' && QuestionType != null"
        class="form-group col-md-6"
      >
        <br />
        <label>Required: </label>
        <input
          @change="onChangeQuestion()"
        
          type="checkbox"
          v-model="Question.required"
          :name="`
               surveys[${Id}][required]`"
          class="form-control"
          placeholder="required"
        />
      </div>

      <div v-if="QuestionType == 'Form'" class="form-group col-md-6">
        <br />
        <label>Description: </label>
        <input
          @change="onChangeQuestion()"

          v-model="Question.description"
          :name="`
               surveys[${Id}][description]`"
          type="text"
          class="form-control"
          placeholder="description"
        />
      </div>

      <div
        v-if="QuestionType != '' && QuestionType != null"
        class="form-group col-md-6"
      >
        <br />
        <label>Question: </label>
        <input
          @change="onChangeQuestion()"

          v-model="Question.question"
          :name="`
               surveys[${Id}][question]`"
          type="text"
          class="form-control"
          placeholder="Question"
        />
      </div>

      <div v-if="QuestionType === 'Scale'" class="form-group col-md-6">
        <template v-for="(option, index) in Question.options" :key="index">
          <br />
          <br />
          <label>Min: </label>
          <input
          @change="onChangeQuestion()"

            v-model="option.min"
            :name="`
               options[${index}]`"
            type="number"
            class="form-control"
            placeholder="Max"
          />
          <label>Max: </label>
          <input
          @change="onChangeQuestion()"

            v-model="option.max"
            :name="`
               options[${index}]`"
            type="number"
            class="form-control"
            placeholder="Min"
          />
          <label>Step: </label>
          <input
          @change="onChangeQuestion()"

            v-model="option.step"
            :name="`
               options[${index}]`"
            type="number"
            class="form-control"
            placeholder="Step"
          />
        </template>
      </div>

      <div v-if="QuestionType === 'Boolean'" class="form-group col-md-6">
        <template v-for="(option, index) in Question.options" :key="index">
          <br />
          <br />
          <label>Answer Choices</label>
          <br />
          <input
          @change="onChangeQuestion()"

            v-model="option.yes"
            :name="`
               options[${index}][options]`"
            type="text"
            class="form-control"
            placeholder="Yes"
          />
          <br />
          <br />

          <input
          @change="onChangeQuestion()"

            v-model="option.no"
            :name="`
               options[${index}][options]`"
            type="text"
            class="form-control"
            placeholder="No"
          />
        </template>
      </div>

      <div
        v-if="
          QuestionType === 'Multiple' ||
          QuestionType === 'Checkbox' ||
          QuestionType === 'Radio'
        "
        class="form-group col-md-6"
      >
        <br />
        <label>Options: </label>
        <template v-for="(option, index) in Question.options" :key="index">
          <br />
          <input
          @change="onChangeQuestion()"

            v-model="option.text"
            :name="`
               options[${index}]`"
            type="text"
            class="form-control"
            placeholder="options"
          />
          <button
            v-if="index > 1"
            @click="
              () => {
                deleteOptions(Question.options, index, Question.id);
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
            @click="addOptions(Question.id)"
            type="button"
            class="btn btn-terceary"
          >
            Add Options
          </button>
        </div>
      </div>
      <hr />
      <!-- </div> -->
    </div>
  </form>
</template>

<script>
import AltSelect from "@/components/multiSelect/Select";

export default {
  props: {

    QuestionType: String,
    Id: String,
  },


  components: {
    AltSelect,
  },

  data: () => ({
    Question: {
      identifier: "",
      description: "",
      question: "",
      required: true,
      options: [],
    },
  }),


  watch: {
    QuestionType(){
       this.createQuestionOptions(this.Id, this.QuestionType);
       console.log("Este es el survey",this.Survey)
       console.log("Este es el question",this.Question)

       this.Survey = {...this.Survey,...this.Question}
       console.log("Este es el survey despues",this.Survey)

    }
  },

  methods: {
    addOptions(id) {
      //   const surveyIndex = this.surveys.findIndex((data) => data.id === id);

      this.Question.options.push({ text: "", value: "" });
    },

    deleteOptions(data, index) {
      data.splice(index, 1);
    },

    createQuestionOptions(id, type) {
      console.log(type);
      //   const surveyIndex = this.surveys.findIndex((data) => data.id === id);
      switch (type) {
        case "Checkbox":
        case "Radio":
        case "Multiple":
          this.Question.options = [
            { text: "", value: 0 },
            { text: "", value: 1 },
          ];
          break;
        case "Boolean":
          this.Question.options = [{ yes: "", no: "" }];
          break;
        case "Scale":
          this.Question.options = [{ min: "", max: "", step: "" }];
          break;
        default:
          this.Question.options = [{}];
      }

    },

    onChangeQuestion(){
        this.$emit('OnChange',{question: this.Question, id:this.Id} )
    }

  },
};
</script>

<style>
</style>