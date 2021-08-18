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
      internalValue:(this.options && this.options.length>0)?this.options[0].id:null,      
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
  methods: {
    setNewValue(value){
      this.internalValue = value
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
    }
  }
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
