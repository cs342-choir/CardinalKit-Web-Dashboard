<template>
  <div>
    <!-- <label >Feet:</label>
    <input type="number" class="TextInput" placeholder="5" step=".1" disabled />
    <label >Inches:</label>
    <input type="number" class="TextInput" placeholder="5" step="1" disabled /> -->
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