<template>
<div>
  <div v-for="(option, index) in Options" :key="index">
    <br />
    <br />
    <div>
      <label>Min: </label>
      <input
        v-model="option.min"
        :name="`options[${index}]`"
        type="number"
        class="TextInput"
        placeholder="1"
      />
      <label> Description: </label>
      <input
        v-model="option.minValueLabel"
        class="TextInput"
        placeholder="Poor"
      />    
    </div>
    <br/>
    <div>
      <label>Max: </label>
      <input
        v-model="option.max"
        :name="`options[${index}]`"
        type="number"
        class="TextInput"
        placeholder="5"
      />
      <label> Description: </label>
      <input
        v-model="option.maxValueLabel"
        class="TextInput"
        placeholder="Excellent"
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
      <label>Default: </label>
      <input
        v-model="option.default"
        :name="`default[${index}]`"
        type="number"
        class="TextInput"
        placeholder="1"
      />
    </div>
    <br/>
    <div>
      <label>max Fraction Digits: </label>
      <input
        v-model="option.default"
        :name="`maxFractionDigits[${index}]`"
        type="number"
        class="TextInput"
      />
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    Options: Array
  },
  created(){
    console.log(this.Options, "continuos scale options")
  }
};
</script>

<style>
</style>