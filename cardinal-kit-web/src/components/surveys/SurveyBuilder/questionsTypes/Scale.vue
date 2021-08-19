<template>
<div>
  <div v-for="(option, index) in Options" :key="index">
    <br />
    <br />
    <div>
    <label>Min: </label>
    <input
      v-model="option.min"
      :name="`
               options[${index}]`"
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
      :name="`
               options[${index}]`"
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
    <label>Step: </label>
    <input
      v-model="option.step"
      :name="`
               options[${index}]`"
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
    Options: Array,
  },
};
</script>

<style>
</style>