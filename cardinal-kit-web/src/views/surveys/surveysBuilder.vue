<template>
  <div id="app" class="container">
    <form>
      <h1>Surveys Builder</h1>
      <div class="surveys">
        <div
          class="form-row"
          v-for="(survey, index) in 
           surveys"
          :key="index"
        >

          
          <div class="form-group col-md-6">
            <label>Select the type of question: </label>
            <altSelect
              :options="questionTypes"
              v-model="survey.type"
              :name="`
               surveys[${index}][type]`"
              type="text"
              class="form-control"
              placeholder="Type of question"
            />
          </div>
          <br>

          <div v-if="survey.type != ''" class="form-group col-md-6">
            <label>ID:    </label>
            <input 
              v-model="survey.id"
              :name="`
               surveys[${index}][id]`"
              type="text"
              class="form-control"
              placeholder="id"
            readonly/>
          </div>

          <br>          
          <div v-if="survey.type != ''" class="form-group col-md-6">
            <label>Scope: </label>
            <altSelect
              :options="scopeTypes"
              v-model="survey.scope"
              :name="`
               surveys[${index}][scope]`"
              type="text"
              class="form-control"
              placeholder="Select the scope"
            />
          </div>

          <br>
          <div v-if="survey.type != ''"  class="form-group col-md-6">
            <label>Required: </label>
            <input type="checkbox" v-model="survey.required" 
              :name="`
               surveys[${index}][required]`"
              class="form-control"
              placeholder="required">   
          </div>
          
          <br>
        
          <div v-if="survey.type != ''" class="form-group col-md-6">
            <label>Question: </label>
            <input
              v-model="survey.question"
              :name="`
               surveys[${index}][question]`"
              type="text"
              class="form-control"
              placeholder="Question"
            />
          </div>

          <br>
          <div v-if="survey.type != ''" class="form-group col-md-6">
            <label>Question description: </label>
            <input
              v-model="survey.description"
              :name="`
               surveys[${index}][description]`"
              type="text"
              class="form-control"
              placeholder="Question description"
            />
          </div>

          <br>
          <div v-if="survey.type === 'Text' || survey.type === 'Area' " class="form-group col-md-6">
            <label>Options: </label>
            <input
              v-model="survey.options"
              :name="`
               surveys[${index}][options]`"
              type="text"
              class="form-control"
              placeholder="options"              
            />
            <div  class="form-group">
            <button @click="addAnswer()" type="button" class="btn btn-terceary">
            Add Answer
            </button>
            </div>
          </div>

        </div>
      </div>

      <div  class="form-group">
        <button @click="addQuestion" type="button" class="btn btn-secondary">
          Add question
        </button>
      </div>
          <br>

      <hr />
          <br>

      <div class="form-group">
        <button @click="printJson" type="button" class="btn btn-primary">
          Print
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import altSelect from "@/components/multiSelect/Select";

export default {
  name: "App",

  data: () => ({

     questionTypes:['Area', 'Text', 'Checkbox' , 'Radio', 'Multiple'],
     scopeTypes:['Public', 'Private'],

     surveys: [
      {
        id: uuidv4(),
        question: "This is the question",
        type: "radio",
        scope: "public",
        required: true,
        description: "Radios is a unique select type",
        options: [
          {
            text: "option 1",
            value: "option1",
          },
          {
            text: "option 2",
            value: "option2",
          },
        ],
      },
    ],
  }),
  components: {
    altSelect,
  },

  methods: {
    
    addQuestion() {
      this.
       surveys.push({
        id: uuidv4(),
        question: "",
        type: "",
        scope: "",
        required: "",
        description: "",
        options: [],
      });
    },

    addAnswer(){
       console.log("add answer");
    },
    

    printJson() {
      const data = {
        
         surveys: this.
         surveys,
      };
      console.log(JSON.stringify(data, null, 2));
    },
  },
};


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}



</script>

<style lang="scss">

.surveys > div {
  margin: 10px 0;
  padding-bottom: 10px;
}
.surveys > div:not(:last-child) {
  border-bottom: 1px solid black;

}
.btn {
    text-decoration: underline;
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
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn-secondary {
    text-decoration: none;
    color: black;    
    border-color: #000000;
    background: #B71540;
}
.btn-terceary {
    text-decoration: underline;
    color: black;    
    border-color: #000000;
    background: transparent;
}


</style>
