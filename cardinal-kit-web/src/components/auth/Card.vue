<template>
  <div class="w-full max-w-lg card">
    <div class="card-header">
      <slot name="card-header"></slot>
    </div>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
    <div class="card-footer">
      <slot name="card-footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 300px;
  min-height: 300px;
  padding: 2rem;
  box-shadow: -2px 4px 13px 1px #4a4a4a;
  background: white;

  .card-body {
    width: 100%;
  }
}
</style>
