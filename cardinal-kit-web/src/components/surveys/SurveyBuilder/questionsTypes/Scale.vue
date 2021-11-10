<template>
  <div>
    <br />
    <br />
    
    <br/>
    <div class="wrap-input">
      <label>Min: </label>
      <input
        v-model="Options.min"
        :name="`options[${Options.id}]`"
        type="number"
        placeholder="1"
        min="0"
        :class="classError('min')"
      />
      <label> Description: </label>
      <input
        v-model="Options.minValueDescription"
        class="TextInput"
        type="text"
        placeholder="Min value description"
        :class="classError('minDescription')"
      />    
    </div>
    <br/>
    <div class="wrap-input">
      <label>Max: </label>
      <input
        v-model="Options.max"
        :name="`options[${Options.id}]`"
        type="number"
        min="0"
        placeholder="5"
        :class="classError('max')"
      />
      <label> Description: </label>
      <input
        v-model="Options.maxValueDescription"
        class="TextInput"
        placeholder="Máx value description"
        type="text"
        :class="classError('maxDescription')"
      />   
    </div>
     <br/>
    <div>
      <label>Vertical: </label>
      <input
        v-model="Options.vertical"
        type="checkbox"
        class="TextInput"
      />
    </div>
    <br/>
    <div>
      <label>Step: </label>
      <input
        v-model="Options.step"
        :name="`options[${Options.id}]`"
        type="number"
        class="TextInput"
        placeholder="1"
        min="1"
        :class="classError('step')"
      />
    </div>
    <br/>
    <div>
      <label>Default: </label>
      <input
        v-model="Options.default"
        :name="`default[${Options.id}]`"
        type="number"
        class="TextInput"
        placeholder="1"
        min="0"
        :class="classError('default')"
      />
    </div>
  </div>
</template>

<script>
export default {

  data:() => ({
    errors:{}
  }),
  props: {
    Options: Object
  },
  methods:{
    classError(value){
      if(this.errors[value]){
        return "TextInput input-no-value-style"
      }
      return "TextInput"
    },
    checkQuestion(){
      this.errors={}
      let error = false
      let msg = ""
      //Check all fields are not empty
      if(!
        (this.Options!=null &&
        this.Options.id != "" &&
        this.Options.minValueDescription != "" &&
        this.Options.max != "" && 
        this.Options.min != "" &&
        this.Options.maxValueDescription != "" &&
        this.Options.step != "" &&
        this.Options.default != "")
        )
        {     
          error = true
          msg = "The fields can't be blank"
          this.errors['min'] = this.Options.min == ""
          this.errors['max'] = this.Options.max == ""
          this.errors['minDescription'] = this.Options.minValueDescription == ""
          this.errors['maxDescription'] = this.Options.maxValueDescription == ""
          this.errors['step'] = this.Options.step == ""
          this.errors['default'] = this.Options.default == ""

        }
      else {
        let min = parseInt(this.Options.min)
        let max = parseInt(this.Options.max)
        let defaults = parseInt(this.Options.default)
        let step = parseInt(this.Options.step)

        //check step and default lower than max and greater than min
        
        if(defaults<min){
          error = true
          msg = "default value must be greater than min value"
          this.errors['default'] = true
        }    

        if(defaults>max){
          error = true
          msg = "default value must be lower than max value"
          this.errors['default'] = true
        }

        if(step>max){
          error = true
          msg = "Step value must be lower than max value"
          this.errors['step'] = true
        }

        //check max value greater than min value

        if(min>max){
          error = true
          msg = "Min value must be lower than max value"
          this.errors['min'] = true
        }      
      }
      
      return {"error":error,"msg":msg};
    }
  }

};
</script>

<style lang="scss" >
  .wrap-input{
    display: flex;
  }
  div > label {
    margin: 0px 5px 0px 5px;
  }
</style>