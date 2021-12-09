<template>
<div>
    <br />
    <br />
    <label>Answer Choices</label>
    <br />
    <input
      v-model="Options.yesText"
      :name="`
      options[${Options.id}][options]`"
      type="text"
      placeholder="Yes"
      :class="classError('yes')"
    />
    <br />
    <br />

    <input
      v-model="Options.noText"
      :name="`
      options[${Options.id}][options]`"
      type="text"
      placeholder="No"
      :class="classError('no')"
    />
</div>
</template>

<script>
export default {
  data:() => ({
    errors:{}
  }),
  props: {
    Options: Object
  },
  methods:{
    classError(value){
      if(this.errors[value]){
        return "TextInput input-no-value-style"
      }
      return "TextInput"
    },
    checkQuestion(){
      this.errors={}
      let error = false
      let msg = ""
      if(this.Options.yesText == "" || this.Options.noText == "" ){
        error = true
        msg = "The fields can't be blank"
        this.errors["yes"]=true
      }

      if(this.Options.yesText == undefined || this.Options.noText == undefined){
        error = true
        msg = "The fields can't be blank"
        this.errors["no"]=true
      }



      return {"error":error,"msg":msg};
    }
  }
};
</script>

<style>
</style>