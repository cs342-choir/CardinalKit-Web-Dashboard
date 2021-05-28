<template>
<div class="page">
  <h1 class="mb-5">Studies</h1>
  <div class="grid-studies">
    <!-- Init Card -->
    <div v-for="study in studies" :key="study.id" class="mb-5 medical-card">
      <div class="medical-card-img">
        <img class="logo" src="https://user-images.githubusercontent.com/82823662/120020717-b6ae7280-bfaf-11eb-8fdc-cd8b4ce10dde.png" alt="logo" >
      </div>
      <div class="medical-card-info">
        <p class="medical-card-info__title">{{ study.text }}</p>
        <small @click="handleSelecStudy(study.id)" class="medical-card-info__link pointer">Go to study</small>
      </div>
      <div class="hidden-background"></div>
    </div>
    <!-- Finish card -->
  </div>
</div>
</template>
<script>
  export default {
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
    },
    methods: {
    },
    computed:{
      
    },
  };
</script>

<style lang="scss" scoped>
.grid-studies {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.medical-card {
  display: inline-block;
  // overflow: hidden;
  position: relative;
  border-radius: 10px;

  &-img {
    text-align: center;
    position: relative;
    background-color: #dadcff;
    padding: 2rem 1.5rem;
    border-radius: 10px;
    z-index: 1;
    transition: background-color .5s;

    .logo {
      width: 100px;
    }
  }

  &-info {
    position: relative;
    text-align: center;
    padding: 1rem 1.5rem;
    z-index: 1;

    &__title {
      font-weight: 700;
      transition: color .7s;
      text-transform: uppercase;
    }

    &__link {
      font-size: 9pt;
      color: #ababab;
      transition: color .7s;
    }
  }

  .hidden-background {
    width: 100%;
    border-radius: 10px;
    position: absolute;
    background-color:#5c62c5;
    top: 0;
    left: 0;
    height: 10%;
    visibility: hidden;
    transition: all .6s;
  }

  &:hover {
    .medical-card-img {
      background-color:#5c62c5;
    }

    .medical-card-info {
      &__title {
        color: white;
      }

      &__link {
        color: white;
      }
    }

    .hidden-background {
      visibility: visible;
      border-radius: 10px;
      box-shadow: -1px 3px 5px 2px #dadcff;
      height: 100%;
      z-index: 0;
    }
  }
}
</style>