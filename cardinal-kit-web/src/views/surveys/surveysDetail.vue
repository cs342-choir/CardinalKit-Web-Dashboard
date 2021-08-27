<template>
  <div>
  <div>
    <br />
    Select a question
    <br />
    <br />
    {{ questionSelected }}
    <alt-select :options="questions" v-model="questionSelected" />
    <br />
    <div
      class="surveyQuestionTxt"
      v-for="(value, key) in getSurveyDetail(studyId)[surveyId]"
      :key="key"
      v-show="questionSelected == value.identifier"
    >
      <survey :data="value" />
    </div>
  </div>
  <div :onClick="convert" class="card-category footerBtn">
    <span class="downloadBtn">Download</span>
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
      questionSelected: null,
    };
  },
  computed: {
    ...mapGetters("surveys", ["getSurveyDetail"]),
    questions() {
      let qs = [];
      this.getSurveyDetail(this.studyId)[this.surveyId].map((element) => {
        qs.push({
          id: element.identifier,
          name: element.question,
          value: element.identifier,
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
    //   UTCtoLocalDate(date)  {           //@TODO decide whether to use local time or utc
    //   const UTC = new Date(date || '');
    //   const offSetDate = new Date(UTC.getTime() - UTC.getTimezoneOffset() * 120000);
    //   const localDate = new Date(offSetDate).toISOString().substring(0, 19);
    //   return localDate || '';
    // },
    convert() {
      let surveyData = JSON.parse(
        JSON.stringify(this.getSurveyDetail(this.studyId)[this.surveyId])
      );
      console.log(surveyData);
      let surveyTransformed = this.oneLineForEachAnswer(
        this.optionsInOneLine(surveyData)
      );
      let stringData = JSON.stringify(surveyTransformed);
      const jsonData = JSON.parse(stringData);
      let csvData = this.objectToCsv(jsonData);
      this.download(csvData);
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
  mounted() {
    console.log("mounted");
    this.questionSelected = this.questions ? this.questions[0].id : null;
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("surveys/FetchSurveyAllData", {
        studyId: to.params.studyId,
        surveyId: to.params.surveyId,
      }),
    ]).then(() => {
      console.log("read");
      next();
    });
  },
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
