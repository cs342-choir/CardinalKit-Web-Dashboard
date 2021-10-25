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
      class="TextInput"
      placeholder="Yes"
    />
    <br />
    <br />

    <input
      v-model="Options.noText"
      :name="`
      options[${Options.id}][options]`"
      type="text"
      class="TextInput"
      placeholder="No"
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
      console.log(this.Options.yesText)
      let error = false
      let msg = ""
      if(this.Options.yesText == "" || this.Options.noText == "" || this.Options.yesText == undefined || this.Options.noText == undefined){
        error = true
        msg = "The fields can't be blank"
      }
      return {"error":error,"msg":msg};
    }
  }
};
</script>

<style>
</style>