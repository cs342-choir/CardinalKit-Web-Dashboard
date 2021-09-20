<template>
  <div>
    <!-- <div> 
      <label>Location: </label> 
      <textarea           
        class="TextInput"
        rows="5" cols="50"
        disabled
      />
    </div> -->
  </div>
</template>

<script>
export default {
  methods:{
    checkQuestion(){
      let error = false
      let msg = ""
      return {"error":error,"msg":msg};
    }
  }
}
</script>

<style>

</style>