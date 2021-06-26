<template>
   <div> 
   <Multiselect v-model="internalValue" :options="options" mode="tags" /> 
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
export default {
  components: { Multiselect },
  data() {
    return {
      internalValue:null,      
    };
  },
  watch:{
    internalValue: function(value){
      this.$emit('update:modelValue', value)
    }
  },
  
  props: {
    options:{
      type:Array,
      require:true
    },
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
