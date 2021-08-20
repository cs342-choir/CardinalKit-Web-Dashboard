<template >
  <div>
  <label>Options: </label>
  <div v-for="(option, index) in Options" :key="index">
    <br />
    <div>
    <input class="RadioInput" type="radio" disabled />
    <input
      v-model="option.text"
      :name="`
               options[${index}]`"
      type="text"
      class="TextInput"
    />
    <button
      v-if="index > 1"
      @click="
        () => {
          deleteOptions(index);
        }
      "
      type="button"
    >
      Delete
    </button>
    </div>
    <br />
  </div>
  <br />
  <br />
  <div class="form-group">
    <button @click="addOptions(Options)" type="button" class="btn btn-terceary">
      Add Options
    </button>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    Options: Array,
  },
  methods: {
    addOptions() {
      const val = this.Options.length;
      this.Options.push({ text: "", value: ""+val });
    },

    deleteOptions(index) {
      this.Options.splice(index, 1);
    },
  },
};
</script>

<style>
</style>