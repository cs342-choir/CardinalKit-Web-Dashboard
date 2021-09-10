<template>
  <div class="w-65">
    <div v-if="!loading" @click="showToGraph(id)" class="card pointer">
      <div class="card-header align-center m-1">
        <div class="card-header__title">
          <h4 :style="{ color: colorTitle }"><b>{{ name }} </b></h4>
        </div>
        <div  class="card-header__link  text-center m-1">
          <img v-if="logo" :src="logo" width="50" alt="logo activity card">
          <!-- <span class="arrow-link">›</span> -->
        </div>
      </div>
      <div class="card-body m-1">
        <slot name="card-body">
          <div class="card-body__info">
            <p class="info-value">{{value || 'Value'}}</p>
            <p class="info-measure">{{ measure || 'Type Measure' }}</p>
          </div>
        </slot>
          <span class="m-2">{{ date }}</span>
      </div>
    </div>
    <loading-icon v-show="loading" size="12px"/>
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
    }
  }
};
</script>
<style lang="scss" scoped>
.wi {
  width: 65%;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  min-width: 40%;
  padding-bottom: 5px;
  border-radius: 5px;
 /*  width: 65%; */
  height: auto;
  background-color: $bg-card;
  justify-content: space-between;

  .card-header {
    //display: flex;
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
