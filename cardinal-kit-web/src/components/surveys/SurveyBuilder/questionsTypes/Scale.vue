<template>
<div>
  <div v-for="(option, index) in Options" :key="index">
    <br />
    <br />
    <div class="wrap-input">
      <label>Min: </label>
      <input
        v-model="option.min"
        :name="`options[${index}]`"
        type="number"
        placeholder="1"
      />
      <label> Description: </label>
      <input
        v-model="option.minValueLabel"
        class="TextInput"
        type="text"
        placeholder="Poor"
      />    
    </div>
    <br/>
    <div class="wrap-input">
      <label>Max: </label>
      <input
        v-model="option.max"
        :name="`options[${index}]`"
        type="number"
        placeholder="5"
      />
      <label> Description: </label>
      <input
        v-model="option.maxValueLabel"
        class="TextInput"
        placeholder="Excellent"
        type="text"
      />   
    </div>
     <br/>
    <div>
      <label>Vertical: </label>
      <input
        v-model="option.vertical"
        type="checkbox"
        class="TextInput"
      />
    </div>
    <br/>
    <div>
      <label>Step: </label>
      <input
        v-model="option.step"
        :name="`options[${index}]`"
        type="number"
        class="TextInput"
        placeholder="1"
      />
    </div>
    <br/>
    <div>
      <label>Default: </label>
      <input
        v-model="option.default"
        :name="`default[${index}]`"
        type="number"
        class="TextInput"
        placeholder="1"
      />
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    Options: Array,
  },
  created(){
    console.log(this.Options, "options")
  }
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