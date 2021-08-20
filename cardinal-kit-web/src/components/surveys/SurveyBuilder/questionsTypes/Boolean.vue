<template>
<div>
    <br />
    <br />
    <label>Answer Choices</label>
    <br />
    <input
      v-model="Options.yes"
      :name="`
      options[${Options.id}][options]`"
      type="text"
      class="TextInput"
      placeholder="Yes"
    />
    <br />
    <br />

    <input
      v-model="Options.no"
      :name="`
      options[${Options.id}][options]`"
      type="text"
      class="TextInput"
      placeholder="No"
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