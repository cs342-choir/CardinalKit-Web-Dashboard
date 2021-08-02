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
  data() {
    return {
      color: "#b71540",
    };
  },
  props: {
    size: {
      type: String,
      required: true,
    },
  },
  methods: {},
  computed: {},
  components: {
    PulseLoader,
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
