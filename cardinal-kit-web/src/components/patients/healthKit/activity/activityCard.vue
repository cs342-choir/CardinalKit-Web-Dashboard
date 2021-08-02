<template>
  <div  @click="showToGraph(id)" class="card pointer">
    <div class="card-header align-center">
      <div class="card-header__title">
        <img v-if="logo" :src="logo" alt="logo activity card">
        <h4 :style="{ color: colorTitle }"><b>{{ name }} </b></h4>
      </div>
      <div  class="card-header__link flex align-center">
        <span>{{ date }}</span>
        <span class="arrow-link">›</span>
      </div>
    </div>
    <div class="card-body">
      <slot name="card-body">
        <div class="card-body__info">
          <p class="info-value">{{value || 'Value'}}</p>
          <p class="info-measure">{{ measure || 'Type Measure' }}</p>
          <loading-icon v-show="loading" size="3px"/>
        </div>
      </slot>
      
    </div>
  </div>
</template>
<script>

import loadingIcon from "@/components/loading";
export default {
  name: "ActivityCard",
  components:{
    loadingIcon
  },
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
    },
    id: {
      type: String,
    }
  },
  data() {
    return {
      userId: '',
      studyId: '',
      loading: false
    };
  },
  mounted () {
    const { studyId, userId } = this.$route?.params;
    this.userId = userId;
    this.studyId = studyId;
  },
  methods: {
    showToGraph: function (id) {
      this.loading=true
      this.$router.push(`/healthGraph/${this.studyId}/${this.userId}/${id}`);
    },
  }
};
</script>
<style lang="scss" scoped>
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

    &__title {
      display: flex;
      align-items: center;

      img {
        margin-right: 5px;
        object-fit: scale-down;
        height: 17px;
        width: 12px;
      }
    }

    &__link {
      .arrow-link {
        text-decoration: none;
        font-weight: bold;
        color: lightgrey;
        margin-left: 5px;
        font-size: 15pt;
      }
    }
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
