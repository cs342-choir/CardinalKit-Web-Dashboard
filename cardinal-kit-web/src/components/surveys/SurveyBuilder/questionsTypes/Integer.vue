<template>
<div>
    <label>Min: </label>
      <input
        v-model="Options.min"
        :name="`options[${Options.id}]`"
        type="number"
        class="TextInput"
        placeholder="1"
        min="0"
      />
      <label>Max: </label>
      <input
        v-model="Options.max"
        :name="`options[${Options.id}]`"
        type="number"
        class="TextInput"
        placeholder="1"
        min="0"
      />
      <label>maxFractionDigits: </label>
      <input
        v-model="Options.maxFractionDigits"
        :name="`options[${Options.id}]`"
        type="number"
        class="TextInput"
        placeholder="1"
        min="0"
      />
      <label>Unit: </label>
      <input
        v-model="Options.unit"
        :name="`options[${Options.id}]`"
        type="text"
        class="TextInput"
        placeholder="meters"
      />
</div>
</template>

<script>
export default {
  props: {
    Options: Object
  },
  methods:{
    checkQuestion(){
      let error = false
      let msg = ""

      if(this.Options.min == "" || this.Options.max == "" || this.Options.maxFractionDigits == "" || this.Options.unit == ""){
        error = true
        msg = "The fields can't be blank"
      }
      else{
        let min = parseInt(this.Options.min)
        let max = parseInt(this.Options.max)

        if(min>max){
          error = true 
          msg = "Min value must be lower than max value"
        }
      }
      return {"error":error,"msg":msg};
    }
  }
};
</script>

<style>
</style>