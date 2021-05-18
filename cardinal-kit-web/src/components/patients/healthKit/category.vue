<template>
<div>     
   <!-- <img :src="data.icon"/> -->
    <button :onClick="handleSubmit">{{data.name}}</button>
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


<style>
/* Style buttons */

</style>