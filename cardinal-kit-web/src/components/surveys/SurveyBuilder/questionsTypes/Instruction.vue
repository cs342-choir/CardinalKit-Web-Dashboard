<template>
  <div>
    <div v-for="(option, index) in Options" :key="index">
      <br />
      <br />
      <!-- <div>
        <label>Instruction: </label> 
        <textarea           
          v-model="option.instruction"
          class="TextInput"
          placeholder="Instruction"
          rows="5" cols="100"
          disabled
        />
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Options: Array,
  },
  methods:{
    checkQuestion(){
      let error = false
      let msg = ""
      return {"error":error,"msg":msg};
    }
  }
};
</script>

<style>
</style>