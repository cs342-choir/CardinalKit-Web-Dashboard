<template>
  <div>
    {{ data.question }}
    <br />
    <!-- @TODO remove all conditionals and create a method that accepts all kinds of surveys.options and stylizes it in cardinal format-->
    <div class="surveyOptionsTxt" v-if="data.questionType === 1">
      <br />
      <strong>Min: </strong>{{ data.Options["Min"] + "" }}
      {{ data.Options["MinDescription"] }} <strong>Max: </strong>
      {{ data.Options["Max"] }} {{ data.Options["MaxDescription"] }}
      <strong>Step: </strong> {{ data.Options["Step"] }}
      <br />
    </div>
    <div class="surveyOptionsTxt" v-else-if="data.questionType === 2">
      <br />
      <strong>0: </strong>{{ data.Options[0]["text"] + "" }} <strong>1: </strong
      >{{ data.Options[1]["text"] + "" }} <strong>2: </strong
      >{{ data.Options[2]["text"] + "" }}
      <br />
    </div>
    <div class="surveyOptionsTxt" v-else-if="data.questionType === 7">
      <br />
      <strong>False: </strong>{{ data.Options["NoText"] + "" }}
      <strong>True: </strong>{{ data.Options["YesText"] + "" }}
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
    <!-- @TODO remove all conditionals and  create a method that accepts all kinds of surveys.options and stylizes it in cardinal format-->

    <br />

    <br />
    <alt-table 
      :columns="columns"
      :pagination="data.answers.length>10"
      :paginationOptions="paginationOptions"
      @onPagination="handlePagination"
    >
      <template #t-row>
        <tr v-for="(answer, index) in data.answers" :key="answer">
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
    paginationOptions() {
      return {
        limit: [10, 20],
        total: this.data.answers.length,
        currentPage: this.currentPage,
      };
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
