<template>
  <div>
    <label>Top Text: </label>
        <input
          v-model="Options.topText"
          :name="`options[${Options.id}]`"
          type="text"
          class="TextInput"
          placeholder="A"
        />
        <label>Bottom Text: </label>
        <input
          v-model="Options.bottomText"
          :name="`options[${Options.id}]`"
          type="text"
          class="TextInput"
          placeholder="E"
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

       
      if(this.Options.topText == "" || this.Options.bottomText == ""){
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