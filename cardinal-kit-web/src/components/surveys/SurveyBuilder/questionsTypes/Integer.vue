<template>
<div>
    <label>Min: </label>
      <input
        v-model="Options.min"
        :name="`options[${index}]`"
        type="number"
        class="TextInput"
        placeholder="1"
      />
      <label>Max: </label>
      <input
        v-model="Options.max"
        :name="`options[${index}]`"
        type="number"
        class="TextInput"
        placeholder="1"
      />
      <label>maxFractionDigits: </label>
      <input
        v-model="Options.maxFractionDigits"
        :name="`options[${index}]`"
        type="number"
        class="TextInput"
        placeholder="1"
      />
      <label>Unit: </label>
      <input
        v-model="Options.unit"
        :name="`options[${index}]`"
        type="text"
        class="TextInput"
        placeholder="meters"
      />
</div>
</template>

<script>
export default {
  props: {
    Options: Object
  },
};
</script>

<style>
</style>