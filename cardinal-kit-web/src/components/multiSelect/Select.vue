<template>
   <div> 
   <Multiselect  
    trackBy="id"
    label="name"
   v-model="internalValue" 
   :options="options" 
   :placeholder="_placeholder" 
   :canClear="false"
   :canDeselect="false"
   /> 

  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
export default {
  components: { Multiselect },
  data() {
    return {
      internalValue:this.options?this.options[0].id:null,      
    };
  },
  watch:{
    internalValue: function(value){
      this.$emit('update:modelValue', value)
    }
  },
  computed:{
      _placeholder(){
          return this.placeholder??"Select One"
      }
  },
  props: {
    options:{
      type:Array,
      require:true
    },
    placeholder:{
        type:String,
        require:false
    }
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
