<template>
<div>
 
    <br />
    <br />
    <div class="wrap-input">
      <label>Min: </label>
      <input
        v-model="Survey.min"
        type="number"
        placeholder="1"
      />
      <label> Description: </label>
      <input
        v-model="Survey.minValueDescription"
        class="TextInput"
        type="text"
        placeholder="Poor"
      />    
    </div>
    <br/>
    <div class="wrap-input">
      <label>Max: </label>
      <input
        v-model="Survey.max"
        type="number"
        placeholder="5"
      />
      <label> Description: </label>
      <input
        v-model="Survey.maxValueDescription"
        class="TextInput"
        placeholder="Excellent"
        type="text"
      />   
    </div>
     <br/>
    <div>
      <label>Vertical: </label>
      <input
        v-model="Survey.vertical"
        type="checkbox"
        class="TextInput"
      />
    </div>
    <br/>
    <div>
      <label>Step: </label>
      <input
        v-model="Survey.step"
        type="number"
        class="TextInput"
        placeholder="1"
      />
    </div>
    <br/>
    <div>
      <label>Default: </label>
      <input
        v-model="Survey.default"
        type="number"
        class="TextInput"
        placeholder="1"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Survey: Object,
  },
  created(){
    console.log(this.Options, "options")
  } */
};
</script>

<style lang="scss" >
  .wrap-input{
    display: flex;
  }
  div > label {
    margin: 0px 5px 0px 5px;
  }
</style>
