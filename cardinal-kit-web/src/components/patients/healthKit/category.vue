<template>
<div :onClick="handleSubmit" class="card">
  <div class="flex align-center">
   <img width="15" class="icon" :src="data.icon"/> 
   <span class="subtitle">{{data.name}}</span>
  </div>
  <span>></span>
    
</div>

</template>
<script>
    export default {
        name: 'category',
        props: {
          data:{
              type:Object,
              required:true
          },  
          userId:{
              type:String,
              required:true
          },
          studyId:{
              type:String,
              required:true
          },
          icon: {
            type: String
          }
        },
        data(){
            return{
                
            }
        },
        methods: {
            handleSubmit(){
                this.$router.push(`/${this.data.path}/${this.studyId}/${this.userId}`)
            }
        },
        computed:{
            
        },
    };
</script>


<style lang="scss" scoped>
.card {
  padding: 1rem;
  background: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .icon {
    margin-right: 1rem;
  }

  .subtitle {
    font-weight: 700;
    text-transform: capitalize;
  }
}
</style>