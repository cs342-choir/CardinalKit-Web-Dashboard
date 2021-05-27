<template>
  <div class="wrapper-table" :class="[className, type]">
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index" class="column-table">
            {{column.header}}
          </th>
        </tr>
      </thead>
      <tbody>
       <slot name="t-row" />
      </tbody>
    </table>
    <div v-if="pagination" class="pagination">
      <div class="flex mr-2 align-center pagination-child">
        <label class="mr-1 pagination-label">Items per page</label>
        <select class="select-table" name="limit" v-model="limit">    
          <option v-for="(value, index) in paginationOptions.limit" :key="index" :value="value">{{value}}</option>
        </select>
      </div>
      <div class="flex mr-2 pagination-child">
        <p>{{range}} of {{paginationOptions.total}}</p>
      </div>
      <div class="flex align-center pagination-child">
        <select class="select-table" name="page" v-model="currentPage">
          <option v-for="(page, index) in pages" :key="index" :value="page">{{page}}</option>
        </select>
      </div>
    </div>
    <pre>{{limit}} | {{currentPage}}</pre>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

export default {
  props: {
    columns:{
      type: Array,
      required: true
    },
    className: {
      type: Array
    },
    type: {
      type: String,
      default: 'default'
    },
    pagination: {
      type: Boolean,
      default: true
    },
    paginationOptions: {
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
    const currentPage = ref(props.paginationOptions.current || 1);
    const pages = computed(() => Array.from({length: getCountPage() }, (_, i) => i+1));
    const range = computed(() => calculateRange(currentPage.value, limit.value, props.paginationOptions.total));
    
    const getCountPage = () => (Math.ceil(props.paginationOptions.total / limit.value));

    function calculateRange(page, limit, total) {
      console.log('total', total);
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
      ctx.emit('pagination', { ...values })
    });


    return {
      limit,
      pages,
      currentPage,
      range
    }
  }
}
</script>
<style lang="scss">
@mixin setBackgroundtoColumn($bg, $color) {
  .column-table {
    background-color: $bg;
    color: $color;
  }
  .pagination, .select-table {
      border-color: $bg;
  }
}


.wrapper-table{
  border-radius: .5rem;
  display: block;
  min-width: 100%;
  overflow: auto;
  box-shadow: $tw-shadow;

  &.info {
    @include setBackgroundtoColumn($info, $text-info);
  }

  &.success {
    @include setBackgroundtoColumn($success, $text-success);
  }

  &.warning {
     @include setBackgroundtoColumn($warning, $text-warning);
  }

  &.danger {
    @include setBackgroundtoColumn($danger, $text-danger);
  }

  table {
    min-width: 100%;
    line-height: 1.5;
    border-collapse: collapse;

    .column-table {
      border-bottom-width: 2px;
      padding: .75rem 1.25rem;
      text-align: left;
      font-weight: 600;
      font-size: .75rem;
      line-height: 1rem;
      background-color: $light-grey;
    }

    td {
      font-size: .875rem;
      line-height: 1.25rem;
      padding: 1.25rem;
      border-bottom-width: 1px;
    }
  }

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
    display: flex;
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
}
</style>