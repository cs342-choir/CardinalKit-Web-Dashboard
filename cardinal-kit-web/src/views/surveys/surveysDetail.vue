<template>
  <div class="page">
    <div class="alert-err" v-if="errMsg">
      {{msg}}
    </div>
    <div class="alert-err" v-if="noData">
      this survey has no answers yet
    </div>
    <div v-else>
      <br />
      <h2> Select a Question</h2>
      <br />
      <alt-select :options="questions" v-model="questionSelected" :defaultValue="questionSelected" />
      <br />
      
      <div
        class="surveyQuestionTxt"
        v-for="(value, key) in getSurveyAnswers(studyId)[surveyId]"
        :key="key"
        v-show="questionSelected == value.identifier"
      >
        <survey :data="value" />
      </div>
      <button @click="convert">Download</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
import survey from "@/components/surveys/survey";

//Components
import altTable from "@/components/tables/altTable";
import altSelect from "@/components/multiSelect/Select";

export default {
  data() {
    return {
      columns: [
        { header: "N°" },
        { header: "UserId" },
        { header: "Answer" },
        { header: "Date" },
      ],
      questionSelected: "",
      questionData: {},
      errMsg: false,
      noData: false
    };
  },
  computed: {
    ...mapGetters("surveys", ["getSurveyAnswers"]),
   
    questions() {
      let qs = [];
      let questions = this.getSurveyAnswers(this.studyId)[this.surveyId]
      questions.forEach(question => {
        qs.push({
          id: question.identifier,
          name: question.question,
          value: question.identifier,
        });
      });
      return qs;
    },
  },

  components: {
    altTable,
    altSelect,
    survey,
  },
  props: {
    studyId: {
      type: String,
      required: true,
    },
    surveyId: {
      type: String,
      required: true,
    },
  },
  methods: {    
    convert() {
      this.errMsg = false
      let surveyData = JSON.parse(
        JSON.stringify(this.getSurveyAnswers(this.studyId)[this.surveyId])
      );
      let surveyTransformed = this.oneLineForEachAnswer(
        this.optionsInOneLine(surveyData)
      );
      let stringData = JSON.stringify(surveyTransformed);
      const jsonData = JSON.parse(stringData);
      if(jsonData.length){
        let csvData = this.objectToCsv(jsonData);
        this.download(csvData);
      }else{
        this.errMsg = true
        this.msg = "No data to download"
      }
    },
    optionsInOneLine(data) {
      let result = [];
      data.forEach((element) => {
        let nElement = element;
        if (nElement.Options) {
          let optionsInString = JSON.stringify(nElement.Options).replaceAll(
            '"',
            "'"
          );
          if (optionsInString) {
            optionsInString = optionsInString;
          }
          nElement.Options = optionsInString;
        }
        result.push(nElement);
      });
      return result;
    },
    oneLineForEachAnswer(data) {
      let result = [];
      data.forEach((element) => {
        let answers = element.answers;
        let nElement = element;
        delete nElement["answers"];
        answers.forEach((answer) => {
          let nAnswer = answer;
          Object.keys(nElement).map((key) => {
            nAnswer[key] = nElement[key];
          });
          result.push(nAnswer);
        });
      });
      return result;
    },
    objectToCsv(data) {
      const csvRows = [];
      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(","));
      for (const row of data) {
        const values = headers.map((header) => {
          const escaped = ("" + row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
      }
      return csvRows.join("\n");
    },
    download(data) {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const docu = document.createElement("a");
      docu.setAttribute("hidden", "");
      docu.setAttribute("href", url);
      docu.setAttribute("download", "csvname.csv");
      docu.click();
    },
  },
  created() {
    if (this.questions.length){
      this.questionSelected = this.questions ? this.questions[0].id : null;
    }
    else{
      this.noData = true
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("surveys/FetchSurveyData", {
        studyId: to.params.studyId,
        surveyId: to.params.surveyId,
      }),
      store.dispatch("surveys/FetchSurveyDataAnswers", {
        studyId: to.params.studyId,
        surveyId: to.params.surveyId,
      }),
    ]).then(() => {
      next();
    });
  },
};
</script>
<style lang="scss">
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
