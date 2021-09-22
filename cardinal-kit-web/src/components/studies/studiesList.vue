<template>
  <div class="page">
    <h1 class="mb-5">Studies</h1>
    <div class="row box">
      <div class="col-50 m-3"  v-for="study of studies" :key="study">
        <small-card 
          @onClick="handleSelecStudy(study)" 
          :title="study"
          image="https://user-images.githubusercontent.com/82823662/120020717-b6ae7280-bfaf-11eb-8fdc-cd8b4ce10dde.png"
          actionText="Go to study"
        />
      </div>
    </div>
  </div>
</template>
<script>
import SmallCard from '@/components/patients/healthKit/SmallCard';

  export default {
  components: { SmallCard },
    name: 'studiesList',
    data(){
      return{
        
      }
    },
    props: {
      studies:{
        type:Array,
        required:true
      },
      handleSelecStudy:{
        type:Function,
        required:true
      }
    }
  };
</script>

<style lang="scss" scoped>
/*   .grid-studies {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px; 
  }
 */
  .box {
    flex-wrap: wrap;
  }
</style>