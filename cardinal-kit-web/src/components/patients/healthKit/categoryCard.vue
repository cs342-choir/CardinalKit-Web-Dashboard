<template>
  <div>
    <div v-if="!loading" :onClick="handleSubmit" class="card-category">
      <div class="flex align-center">
        <img width="15" class="icon" :src="data.icon" />
        <span class="subtitle">{{ data.name }}</span>
      </div>
      <span class="arrow">›</span>
    </div>
    <loading-icon v-show="loading" size="10px"/>
  </div>
</template>
<script>

import loadingIcon from "@/components/loading";
export default {
  components:{
    loadingIcon 
  },
  name: "category",
  props: {
    data: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    studyId: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  data() {
    return {
      loading:false
    };
  },
  methods: {
    handleSubmit() {
      this.loading=true
      let route = this.data.customAction ?? "categoryDetail";
      this.$router.push(
        `/${route}/${this.studyId}/${this.userId}/${this.data.id}/`
      );
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.card-category {
  padding: 1rem;
  background: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: $shadow-sm;

  .icon {
    margin-right: 1rem;
  }

  .subtitle {
    font-weight: 700;
    text-transform: capitalize;
  }

  .arrow {
    font-weight: 700;
  }
}
</style>
