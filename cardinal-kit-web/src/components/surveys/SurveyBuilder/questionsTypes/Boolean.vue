<template>
  <div v-for="(option, index) in Options" :key="index">
    <br />
    <br />
    <label>Answer Choices</label>
    <br />
    <input
      v-model="option.yes"
      :name="`
      options[${index}][options]`"
      type="text"
      class="TextInput"
      placeholder="Yes"
    />
    <br />
    <br />

    <input
      v-model="option.no"
      :name="`
      options[${index}][options]`"
      type="text"
      class="TextInput"
      placeholder="No"
    />
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