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
.btn {
  background-color: DodgerBlue; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 12px 16px; /* Some padding */
  font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
  background-color: RoyalBlue;
}
</style>