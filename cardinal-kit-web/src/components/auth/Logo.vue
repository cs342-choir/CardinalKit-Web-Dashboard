<template>
  <picture :class="className">
    <img :src="path || logo" alt="logo" :width="width" />
  </picture>
</template>
<script>
import logo from '@/assets/logo.png'
export default{
  data(){
    return{
      logo:logo
    }
  },
  props: {
    width: String,
    className: String,
    path: String,
  },
}
</script>
