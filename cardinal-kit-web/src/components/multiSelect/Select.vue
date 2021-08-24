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
      internalValue: null,      
    };
  },
  watch: {
    internalValue: function(value){
      this.$emit('update:modelValue', value)
      if(this.onChange) this.onChange()
    }
  },
  computed: {
    _placeholder() {
      return this.placeholder??"Select One"
    }
  },
  props: {
    options: {
      type:Array,
      require:true
    },
    placeholder: {
      type:String,
      require:false
    },
    onChange: {
      type:Function,
      require:false
    },
    typeQuestion:{
      type: String,
      require: false
    }
  },
  created(){
    if (this.typeQuestion){
      this.internalValue = this.typeQuestion
    }
  }
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
