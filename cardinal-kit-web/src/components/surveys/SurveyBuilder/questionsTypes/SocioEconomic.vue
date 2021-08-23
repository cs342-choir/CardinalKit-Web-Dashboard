<template>
  <div>
    <label>Top Text: </label>
        <input
          v-model="Options.topText"
          :name="`options[${Options.id}]`"
          type="text"
          class="TextInput"
          placeholder="A"
        />
        <label>Bottom Text: </label>
        <input
          v-model="Options.bottomText"
          :name="`options[${Options.id}]`"
          type="text"
          class="TextInput"
          placeholder="E"
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