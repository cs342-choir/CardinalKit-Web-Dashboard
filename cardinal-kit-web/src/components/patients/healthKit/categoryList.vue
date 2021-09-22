<template>
  <div class="page">
    <div class="row box">
        <category
         v-for="category in categories" :key="category.id"
          class="col width"
          :data="category"
          :userId="userId"
          :studyId="studyId"
          :icon="category.icon"
          v-show="getValidCategories.includes(category.id)"
        />
    </div>
    <div class="wrapper-graphs content" v-if="showActivityIndex">
      <h1>Activity Index</h1>
      <div >
        <span >7-day moving avg (steps/day)</span>
        <line-chart
          ref="chart"
          id="line-chart"
          :key="1"
          :series="getActivityIndexDataToGraphic"
        />
      </div>
    </div>
  </div>
</template>
<script>
import category from "./categoryCard";
import { CategoriesList } from '@/common/static_data'
import { mapGetters } from 'vuex';
import LineChart from "@/components/apexCharts/LineChart";

export default {
  name: "categories",
  components: {
    category,
    CategoriesList,
    LineChart
  },
  data(){
    return{
      categories:[],
      userId: this.$route.query.userId,
      studyId: this.$route.query.studyId
    }
  },
  methods: {},
  computed: {
    ...mapGetters("patient",["getValidCategories", "getActivityIndexDataToGraphic"]),
    showActivityIndex(){
      let show = false
      if(this.getActivityIndexDataToGraphic.length>0){
        if(this.getActivityIndexDataToGraphic[0].data.length>0){
          show=true
        }
      }
      return show
    }
  },
  created(){
    this.categories = CategoriesList
  }
};
</script>

<style lang="scss" scoped>
  .width {
    min-width: 500px;
    max-width: 500px;
  }
  .box {
    flex-wrap: wrap;
  }
  .categories-grid {
    display: grid;
    gap: 20px 40px;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    justify-content: center;
    align-items: center;
  }
  .wrapper-graphs {
    display: grid;
    gap: 15px;
    max-width: 1200px;
    margin: auto;
  }
  @media (max-width: 360px) {
    .content{
      padding: 1rem;
    }
  }
  @media (min-width: 361px) {
    .content{
      padding: 1rem 4rem;
    }
  }
  @media (max-width: 672px) {
    .categories-grid {
      display: grid;
      gap: 20px 40px;
    }
  }
</style>