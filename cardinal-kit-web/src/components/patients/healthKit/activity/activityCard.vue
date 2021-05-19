<template>
  <div class="card">
    <div class="card-header">
      <h4><b>{{ name }} </b></h4>
      <div><span>{{ date }}</span></div>
      <!-- Logo -->
    </div>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ActivityCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style lang="scss">
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 40%;
  border-radius: 5px;

  .card-header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
  .card-body {
    .card-info {
      padding: 1rem;
      display: flex;
      justify-content: space-between;

      &__group {
        text-align: center;
        padding: 1rem;
        width: 100%;
        
        .subtitle {
          font-weight: bold;
          margin-bottom: .8rem;
          text-transform: capitalize;
        }

        &:nth-child(n) {
          border-right: solid lightgray 1px;
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
  border-radius: 5px 5px 0 0;
}

.container {
  padding: 2px 16px;
}
</style>
