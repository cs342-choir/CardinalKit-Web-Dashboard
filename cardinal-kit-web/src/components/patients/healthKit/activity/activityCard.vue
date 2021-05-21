<template>
  <div class="card">
    <div class="card-header">
      <h4 :style="{ color: colorTitle }"><b>{{ name }} </b></h4>
      <div><span>{{ date }}</span></div>
      <!-- Logo -->
    </div>
    <div class="card-body">
      <slot name="card-body">
        <div class="card-body__info">
          <p class="info-value">{{value || 'Value'}}</p>
          <p class="info-measure">{{ measure || 'Type Measure' }}</p>
        </div>
      </slot>
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
    value: {
      type: String,
    },
    measure: {
      type: String,
    },
    logo: {
      type: String,
    },
    colorTitle: {
      type: String,
    }
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
  min-width: 40%;
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: $bg-card;

  .card-header {
    display: flex;
    justify-content: space-between;
    padding: .7rem;
  }
  .card-body {
    &__info {
      display: flex;
      gap: 1px;
      padding: .7rem;
      align-items: baseline;

      .info-value {
        font-size: 17pt;
        font-weight: 700;
        text-transform: uppercase;
      }
      .info-measure {
        color: lightslategray;
        font-weight: bold;
        font-size: 10pt;
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
