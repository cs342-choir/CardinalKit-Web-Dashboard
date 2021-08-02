<template>
  <div class="page">
    <h1 class="mb-5">Health Categories</h1>
    <div class="categories-grid">
      <category
        v-for="category in categories"
        :data="category"
        :key="category.id"
        :userId="userId"
        :studyId="studyId"
        :icon="category.icon"
        v-show="getValidCategories.includes(category.id)"
      />
    </div>
  </div>
</template>
<script>
import category from "./categoryCard";
import { CategoriesList } from '@/common/static_data'
import { mapGetters } from 'vuex';
export default {
  name: "categories",
  components: {
    category,
    CategoriesList
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    studyId: {
      type: String,
      required: true,
    }
  },
  data(){
    return{
      categories:[]
    }
  },
  methods: {},
  computed: {
    ...mapGetters("patient",["getValidCategories"])
  },
  mounted(){
    this.categories = CategoriesList
  },
  
};
</script>

<style lang="scss" scoped>
.categories-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>