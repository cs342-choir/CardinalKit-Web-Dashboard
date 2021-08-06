<template>
  <div id="app" class="container">
    <form>
      <h1>Surveys Builder</h1>
      <br>
      <h3>Enter The Survey Name</h3>
      <input  v-model="surveyName" type="text" placeholder="Survey Name">
      <div class="surveys">
        <div
          class="form-row"
          v-for="(survey, index) in 
           surveys"
          :key="index"
        >


          <div class="form-group col-md-6">
            <label>Select the type of question: </label>
            <!-- @TODO hacer que solo se limpie si cambia de tipo -->
            <altSelect 
              :options="questionTypes"
              v-model="survey.type"
              :name="`
               surveys[${index}][type]`"
              type="text"
              class="form-control"
              placeholder="Type of question"
              :onChange="()=>{clearOptions(survey.id)}"
            />
          </div>

          <div v-if="survey.type != ''" class="form-group col-md-6">
          <br>
            <input 
              v-model="survey.id"
              :name="`
               surveys[${index}][id]`"
              type="hidden"
              class="form-control"
              placeholder="identifier"
            readonly/>
          </div>

          <div v-if="survey.type != ''" class="form-group col-md-6">
            <label>Identifier: </label>
            <input 
              v-model="survey.identifier"
              :name="`
               surveys[${index}][id]`"
              type="text"
              class="form-control"
              placeholder="id"
            readonly/>
          </div>


          <div v-if="survey.type != ''" class="form-group col-md-6">     
            <input
              v-model="survey.scope"
              :name="`
               surveys[${index}][scope]`"
              type="hidden"
              class="form-control"
              placeholder="Select the scope"
            />
          </div>

          <div v-if="survey.type != ''"  class="form-group col-md-6">
          <br>
            <label>Required: </label>
            <input type="checkbox" v-model="survey.required" 
              :name="`
               surveys[${index}][required]`"
              class="form-control"
              placeholder="required">   
          </div>

           <div v-if="survey.type == 'Form'" class="form-group col-md-6">
          <br>
            <label>Description: </label>
            <input
              v-model="survey.description"
              :name="`
               surveys[${index}][description]`"
              type="text"
              class="form-control"
              placeholder="description"
            />
          </div>

        
          <div v-if="survey.type != ''" class="form-group col-md-6">
          <br>
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

            <div v-if="survey.type === 'Scale'" class="form-group col-md-6">
           <template v-for="(option, index) in survey.options" :key="index">
            <br> 
            <br>                  
            <label>Min: </label>
              <input
              v-model="option.min"
              :name="`
               options[${index}]`"
              type="text"
              class="form-control"
              placeholder="Max"              
            /> 
             <label>Max: </label>
              <input
              v-model="option.max"
              :name="`
               options[${index}]`"
              type="text"
              class="form-control"
              placeholder="Min"              
            /> 
             <label>Step: </label>
              <input
              v-model="option.step"
              :name="`
               options[${index}]`"
              type="text"
              class="form-control"
              placeholder="Step"              
            />         
            
            </template>             
            </div>






          <!-- <div v-if="survey.type === 'Text'  " class="form-group col-md-6">
          <br>
          
            <label>Options: </label>
            <input
              v-model="survey.options"
              :name="`
               surveys[${index}][options]`"
              type="text"
              class="form-control"
              placeholder="options"              
            />
          </div> -->


            <div v-if="survey.type === 'Multiple' || survey.type === 'Checkbox' || survey.type === 'Radio'  " class="form-group col-md-6">
            <br>
            <label>Options: </label>
            <template v-for="(option, index) in survey.options" :key="index">
            <br>             
              <input
              v-model="option.text"
              :name="`
               options[${index}]`"
              type="text"
              class="form-control"
              placeholder="options"              
            />  
            <button v-if="index > 1" @click="()=>{deleteOptions(survey.options,index,survey.id)}" type="button" >Delete</button>   
          <br>

            </template>
            
            <br>
            <br>
            <div  class="form-group">
            <button @click="addOptions(survey.id)" type="button" class="btn btn-terceary">
            Add Options
            </button>
            </div>
          </div>

          <!-- <div v-if="survey.type === 'Area' " class="form-group col-md-6">
            <label>Options: </label>
            <textarea
              rows="5" cols="100"
              v-model="survey.options"
              :name="`
               surveys[${index}][options]`"
              type="text"
              class="form-control"
              placeholder="options"              
            />        
          </div> -->
            <br>
            <button  @click="()=>{deleteQuestions(surveys,index)}" type="button" >Delete Question</button>   
            <br>
            <br>

            <hr />

        </div>
      </div>

      <div  class="form-group">
        <button @click="addQuestion" type="button" class="btn btn-secondary">
          Add question
        </button>
      </div>
          <br>

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
import { mapActions } from 'vuex';

export default {
  name: "App",
  props: {
    studyId:{
      type:String,
      required:true
    }
  },
  
  data: () => ({

     questionTypes:['Area', 'Text', 'Checkbox' , 'Radio', 'Multiple','Form','Scale' , 'Boolean'],
     scopeTypes:['Public', 'Private'],
     surveyName:'',
     surveys: [
      {
        id: uuidv4(),
        identifier:'',
        description:'',
        question: "This is the question",
        type: "Multiple",
        scope: "public",
        required: true,
        options: [{text:'',value:0}],
      },
    ],
  }),
  components: {
    altSelect,
  },

  methods: {
    ...mapActions('surveys',['SaveSurvey']),
    addQuestion() {
      this.
       surveys.push({
        id: uuidv4(),
        identifier:'',
        description:'',
        question: "",
        type: "",
        scope: "public",
        required: true,
        options:[{}],
      });
    },

    addOptions(id){
      const surveyIndex = this.surveys.findIndex((data) => data.id === id);
      const val = this.surveys[surveyIndex].options.length;
      this.surveys[surveyIndex].options.push({text:'',value:val})
    },
    
    clearOptions(id){
        console.log("cambiando");
        const surveyIndex = this.surveys.findIndex((data) => data.id === id);
        this.surveys[surveyIndex].options = [{}];
    },
    
    deleteOptions( data, index) {
      console.log(data);     
      data.splice(index,1);
      console.log(data);
    },

    deleteQuestions( data, index) {
      console.log(data);    
      data.splice(index,1);
      console.log(data);    

      // console.log(data)
    },

    printJson() {
       console.log(this.surveyName)
      const data = {
        
         surveys: this.
         surveys,
      };
      console.log(JSON.stringify(data, null, 2));

      // this.SaveSurvey({
      //   studyId: this.studyId,
      //   name: this.surveyName,
      //   questions:this.surveys
      // })


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
