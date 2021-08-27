<template>
  <div class="pagination">
    <div class="flex mr-2 align-center pagination-child">
      <label class="mr-1 pagination-label">Items per page</label>
      <select class="select-table" name="limit" v-model="limit">    
        <option v-for="(value, index) in pagination.limit" :key="index" :value="value">{{value}}</option>
      </select>
    </div>
    <div class="flex mr-2 pagination-child">
      <p>{{range}} of {{pagination.total}}</p>
    </div>
    <div class="flex align-center pagination-child">
      <select class="select-table" name="page" v-model="currentPage">
        <option v-for="(page, index) in pages" :key="index" :value="page">{{page}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
export default {
  props:{
    pagination: {
      type: Object,
      default: {
        limit: [10, 20],
        total: 30,
        currentPage: 1
      }
    }
  },
  setup(props, ctx) {
    const limit = ref(10);
    const currentPage = ref(props.pagination.current || 1);
    const pages = computed(() => Array.from({length: getCountPage() }, (_, i) => i+1));
    const range = computed(() => calculateRange(currentPage.value, limit.value, props.pagination.total));

    const getCountPage = () => (Math.ceil(props.pagination.total / limit.value));
    
    function calculateRange(page, limit, total) {
      const initRange = ((page*limit) - limit + 1);
      const finalRange = isLastPage(page) ? total : limit*page;
      return `${initRange}-${finalRange}`
    }

    const isLastPage = (page) => (pages.value.length === page);

    watch([limit, currentPage],() => {
      const values = {
        currentPage: currentPage.value,
        limit: limit.value
      }
      ctx.emit('onChangePagination', { ...values })
    });

    return {
      limit,
      currentPage,
      pages,
      range
    }
  }
}
</script>

<style lang="scss" scoped>
.select-table {
    padding: 3px 1rem;
    border: none;
    border-bottom: solid;
    border-radius: 5px;
    border-color: $light-grey;
    outline: none;
  }
  
.pagination {
  padding: .5rem 1rem;
  // display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid;
  font-size: 10pt;
  border-color: $light-grey;

  @media (max-width: 520px) {
    &-child {
      justify-content: center;
      width: 100%;
      padding: .3rem 0;
      border-color: $light-grey;
    }

    &-label {
      display: none;
    }

    .select-table {
      width: 100%; 
    }
  }
}
</style>