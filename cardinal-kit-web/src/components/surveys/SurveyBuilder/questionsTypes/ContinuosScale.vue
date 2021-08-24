<template>
  <div>
    <div class="wrap-input">
      <label>Min: </label>
      <input
        v-model="Options.min"
        :name="`options[${Options.id}]`"
        type="number"
        placeholder="1"
      />
      <label> Description: </label>
      <input
        v-model="Options.minValueDescription"
        class="TextInput"
        type="text"
        placeholder="Min value description"
      />    
    </div>
    <br/>
    <div class="wrap-input">
      <label>Max: </label>
      <input
        v-model="Options.max"
        :name="`options[${Options.id}]`"
        type="number"
        placeholder="5"
      />
      <label> Description: </label>
      <input
        v-model="Options.maxValueDescription"
        class="TextInput"
        placeholder="Máx value description"
        type="text"
      />   
    </div>
     <br/>
    <div>
      <label>Vertical: </label>
      <input
        v-model="Options.vertical"
        type="checkbox"
        class="TextInput"
      />
    </div>
    <br/>
    <div>
      <label>Default: </label>
      <input
        v-model="Options.default"
        :name="`default[${Options.id}]`"
        type="number"
        class="TextInput"
        placeholder="1"
      />
    </div>
    <div>
      <label>Max Fraction Digits: </label>
      <input
        v-model="Options.maxFractionDigits"
        :name="`default[${Options.id}]`"
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
    Options: Object
  }
};
</script>

<style>
</style>