<template >
  <div>
      <label>Default Index: </label>
      <input
        v-model="Survey.defaultIndex"
        :name="`options[${index}]`"
        type="numeric"
        class="TextInput"
        placeholder="1"
      />


    <label>Options: </label>
    <div v-for="(option, index) in Survey.options" :key="index">
      <br />
      <div style="display: flex;">
        <input class="RadioInput" type="radio" disabled />
        <input
          v-model="option.text"
          :name="`options[${index}]`"
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
    Survey: Object,
  },
  methods: {
    addOptions() {
      const val = this.Survey.options.length;
      this.Survey.options.push({ text: "", value: ""+val });
    },

    deleteOptions(index) {
      this.Survey.options.splice(index, 1);
    },
  },
  mounted(){
      this.Survey.options=[
            { text: "", value: "0" },
            { text: "", value: "1" },
          ];
  }
};
</script>

<style>
</style>