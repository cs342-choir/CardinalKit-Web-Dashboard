<template >
  <div>
    <label>Options: </label>
    <div v-for="(option, index) in Options" :key="index">
      <br />
      <div style="display: flex;">
        <input class="RadioInput" type="radio" disabled />
        <input
          v-model="option.text"
          :name="`options[${index}]`"
          type="text"
          class="TextInput"
          :class="classError(option.value)"
        />
        <button
          v-if="index > 1"
          @click="
            () => {
              deleteOptions(index);
            }
          "
          type="button"
        >
          Delete
        </button>
      </div>
      <br />
    </div>
    <br />
    <br />
    <div class="form-group">
      <button @click="addOptions(Options)" type="button" class="btn btn-terceary">
        Add Options
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data:() => ({
    errors:{}
  }),
  props: {
    Options: Array,
    default: () => [],
    //required: true
  },
  methods: {
    classError(value){
      if(this.errors[value]){
        return "TextInput input-no-value-style"
      }
      return "TextInput"
    },
    addOptions() {
      const val = this.Options.length;
      this.Options.push({ text: "", value: ""+val });
    },
    deleteOptions(index) {
      this.Options.splice(index, 1);
    },
    checkQuestion(){
      this.errors={}
      let error = false
      let msg = ""
       this.Options.forEach(element => {
        if(element.text == ""){
          error = true
          msg = "The fields can't be blank"
          this.errors[element.value]=true
        }
      });
      return {"error":error,"msg":msg};
    }
  },
};
</script>

<style>
</style>