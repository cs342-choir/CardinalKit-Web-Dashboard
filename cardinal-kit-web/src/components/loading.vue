<template>
  <div class="center">
    <pulse-loader
      :color="color"
      :size="size"
    ></pulse-loader>
  </div>
</template>
<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "loading",
  components: {
    PulseLoader
  },
  props: {
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: "#b71540"
    }
    /* data() {
      return {
      };
    }, */
  },
  mounted() {
    if (this.size) {
      this._size = this.size;
    }
  },
};
</script>
<style scoped>
.center {
  margin: auto;
  width: 50%;
}
</style>
