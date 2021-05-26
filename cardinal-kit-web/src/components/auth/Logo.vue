<template>
  <picture :class="className">
    <img :src="path || ''" alt="logo" :width="width" />
  </picture>
</template>
<script>
export default {
  name: 'Logo',
  props: {
    width: String,
    className: String,
    path: String,
  },
}
</script>
