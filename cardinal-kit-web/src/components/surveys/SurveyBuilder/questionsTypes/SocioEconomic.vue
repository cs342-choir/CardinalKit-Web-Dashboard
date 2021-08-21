<template>
  <label>Top Text: </label>
      <input
        v-model="Options.topText"
        :name="`options[${index}]`"
        type="text"
        class="TextInput"
        placeholder="A"
      />
      <label>Bottom Text: </label>
      <input
        v-model="Options.bottomText"
        :name="`options[${index}]`"
        type="text"
        class="TextInput"
        placeholder="E"
      />
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