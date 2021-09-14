<template>
  <div  class="mx-3">
    <h6>{{ data.question }}</h6>
    <br />
    <!-- @TODO remove all conditionals and create a method that accepts all kinds of surveys.options and stylizes it in cardinal format-->
    <div v-if="typeof data.Options != 'string'">
      <div class="surveyOptionsTxt" v-if="data.questionType === 1">
        <span ><b>Min:</b> {{ data.Options["Min"] + "" }}{{ data.Options["MinDescription"] }}</span>
        <br />
        <span><b>Max:</b> {{data.Options["Max"]  + "" }}{{ data.Options["MaxDescription"] }}</span>
        <br />
        <span><b>Step:</b>   {{ data.Options["Step"] }}</span>
        <br />
      </div>
      <div class="surveyOptionsTxt" v-else-if="data.questionType === 2">
        <br />
        <span><b>0: </b>{{ data.Options[0]["text"] + "" }}</span>
        <br />
        <span><b>1: </b>{{ data.Options[1]["text"] + "" }}</span>
        <br />
        <span><b>2: </b>{{ data.Options[2]["text"] + "" }}</span>
        <br />
      </div>
      <div class="surveyOptionsTxt" v-else-if="data.questionType === 7">
        <br />
        <span><b>False: </b> {{ data.Options["NoText"] + "" }}</span>
        <br />
        <span><b>True: </b> {{ data.Options["YesText"] + "" }}</span>
        <br />
      </div>
      <div
        class="surveyOptionsTxt"
        v-else
        v-for="(option, optionKey) in data.Options"
        :key="optionKey"
      >
        {{ optionKey }}: {{ option }}
      </div>
    </div>
    <!-- @TODO remove all conditionals and  create a method that accepts all kinds of surveys.options and stylizes it in cardinal format-->

    <br />

    <br />
    
    <alt-table 
      :columns="columns"
      :pagination="answers"
      :paginationOptions="paginationOptions"
      @onPagination="handlePagination"
    >
      <template #t-row>
        <tr v-for="(answer, index) in getPageItems" :key="answer">
          <td>{{ index + 1 }}</td>
          <td class="userIdTxt">
            {{ answer.userId }}
          </td>
          <td class="answerTxt">
            {{ answer.answer }}
          </td>
          <td class="dateTxt">
            {{ answer.date }}
          </td>
        </tr>
      </template>
    </alt-table>
    <br />
  </div>
</template>
<script>
import altTable from "@/components/tables/altTable";
export default {
  name: "survey",
  data() {
    return {
      columns: [
        { header: "N°" },
        { header: "UserId" },
        { header: "Answer" },
        { header: "Date" },
      ],
      currentPage: 1,
      limit: 10,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    altTable,
  },
  computed:{
    answers(){
      if (this.data.answers && this.data.answers.length > 10){
        return true 
      }else{
        return false
      }
    },
    paginationOptions() {
      if (Object.keys(this.data).length){
        if (Object.keys(this.data).includes("answers")){
          return {
            limit: [10, 20],
            total: this.data.answers.length,
            currentPage: this.currentPage,
          };
        }
      }
      return {
        limit: [10, 20],
        total: 0,
        currentPage: this.currentPage,
      };
    },
     getPageItems() {
      if (this.data.answers){
        let items = this.data.answers;
        let lowerLimit = (this.currentPage - 1) * this.limit;
        let upperLimit = this.currentPage * this.limit;
        return items.slice(lowerLimit, upperLimit);
      }
      return {}
    },
  },
  methods:{
    handlePagination(pagination) {
      this.currentPage=pagination.currentPage
      this.limit=pagination.limit
      let total = this.data.answers.length
      if(this.currentPage > Math.ceil(total/this.limit)){
        this.currentPage = Math.ceil(total/this.limit)
      }
    },
  }
};
</script>
<style lang="scss">
.downloadBtn {
  text-decoration: none;
  font-weight: 300;
  font-size: 20px;
  color: #000000;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
  border-color: #000000;
  margin: auto;
  top: -20px;
  box-shadow: 5px 5px 5px;
}
.footerBtn {
  padding: 0px 25px 25px 25px;
  width: 100%;
  display: flex;
}
.surveyQuestionTxt {
  font-size: 25px;
  font-weight: 300;
}
.surveyOptionsTxt {
  font-size: 15px;
}
.userIdTxt {
  font-family: sans-serif;
}
.answerTxt {
  font-family: sans-serif;
}
.dateTxt {
  font-family: sans-serif;
}
</style>
