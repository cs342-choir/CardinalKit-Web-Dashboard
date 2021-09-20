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
    <Pagination v-if="pagination" :pagination="paginationOptions" @onChangePagination="handleChangePagination"/>
  </div>
</template>

<script>
import Pagination from './Pagination'
export default {
  components: { Pagination },
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
      default: false
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
  methods: {
    handleChangePagination (params) {
      this.$emit('onPagination', params);
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
      font-size: .99rem;
      line-height: 1rem;
      color: white;
      background-color: #B71540;
    }

    td {
      font-size: .875rem;
      line-height: 1.25rem;
      padding: 1.25rem;
      border-bottom-width: 1px;
    }
  }
}
</style>