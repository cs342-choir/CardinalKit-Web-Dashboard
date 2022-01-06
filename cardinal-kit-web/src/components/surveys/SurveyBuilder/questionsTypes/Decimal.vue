<template>
<input
      type="number"
      class="TextInput"
      placeholder="0.01"
      step=".01"
      disabled
    />
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