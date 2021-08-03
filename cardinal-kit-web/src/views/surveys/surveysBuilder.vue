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
            <label>id</label>
            <input
              v-model="survey.id"
              :name="`
               surveys[${index}][id]`"
              type="text"
              class="form-control"
              placeholder="id"
            />
          </div>

          <div class="form-group col-md-6">
            <label>id_form</label>
            <input
              v-model="survey.id_form"
              :name="`
               surveys[${index}][id_form]`"
              type="text"
              class="form-control"
              placeholder="id_form"
            />
          </div>

          <div class="form-group col-md-6">
            <label>name</label>
            <input
              v-model="survey.name"
              :name="`
               surveys[${index}][name]`"
              type="text"
              class="form-control"
              placeholder="name"
            />
          </div>

          <div class="form-group col-md-6">
            <label>type</label>
            <input
              v-model="survey.type"
              :name="`
               surveys[${index}][type]`"
              type="text"
              class="form-control"
              placeholder="type"
            />
          </div>

          <div class="form-group col-md-6">
            <label>scope</label>
            <input
              v-model="survey.scope"
              :name="`
               surveys[${index}][scope]`"
              type="text"
              class="form-control"
              placeholder="scope"
            />
          </div>

          <div class="form-group col-md-6">
            <label>required</label>
            <input type="checkbox" v-model="survey.required" 
              :name="`
               surveys[${index}][required]`"
              class="form-control"
              placeholder="required">   
          </div>

          <div class="form-group col-md-6">
            <label>description</label>
            <input
              v-model="survey.description"
              :name="`
               surveys[${index}][description]`"
              type="text"
              class="form-control"
              placeholder="description"
            />
          </div>

          <div class="form-group col-md-6">
            <label>options</label>
            <input
              v-model="survey.options"
              :name="`
               surveys[${index}][options]`"
              type="text"
              class="form-control"
              placeholder="options"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <button @click="addSurvey" type="button" class="btn btn-secondary">
          Add question
        </button>
      </div>

      <hr />

      <div class="form-group">
        <button @click="printJson" type="button" class="btn btn-primary">
          Print
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    
     surveys: [
      {
        id: "tkd4",
        id_form: "tkd-form-001",
        name: "Qustion type radio",
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

  methods: {
    addSurvey() {
      this.
       surveys.push({
        id: "",
        id_form: "",
        name: "",
        type: "",
        scope: "",
        required: "",
        description: "",
        options: [],
      });
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
</script>

<style lang="scss">
.btn-secondary {
  color: black;
}
.surveys > div {
  margin: 20px 0;
  padding-bottom: 10px;
}
.surveys > div:not(:last-child) {
  border-bottom: 1px solid rgb(206, 212, 218);
}
</style>
