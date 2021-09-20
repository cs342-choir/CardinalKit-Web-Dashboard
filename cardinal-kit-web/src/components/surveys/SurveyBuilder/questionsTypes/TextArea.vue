<template>
  <div>
    <br />
    <br />
    <!-- <label>Text Area: </label>
    <div>
      <textarea
        class="TextInput"
        placeholder="Text Area"
        rows="5"
        cols="100"
        disabled
      />
    </div> -->
  </div>
</template>

<script>
export default {
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