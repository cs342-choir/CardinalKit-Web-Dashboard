<template>
  <div>
    <div v-for="(value, key) in getSurveyDetail(studyId)[surveyId]" :key="key">
      {{ value.question }}
      <br />
      <br />
      <div v-for="(option, optionKey) in value.Options" :key="optionKey">
        {{ optionKey }}: {{ option }}
      </div>
      <br />
      <br />

      <alt-table :columns="columns">
        <template #t-row>
          <tr v-for="(answer, index) in value.answers" :key="answer">
            <td>{{ index + 1 }}</td>
            <td>
              {{ answer.userId }}
            </td>
            <td>
              {{ answer.answer }}
            </td>
            <td>
              {{ answer.date }}
            </td>
          </tr>
        </template>
      </alt-table>
      <br />
      <br />
    </div>
  </div>
  <div :onClick="convert" class="card-category">
    <span class="subtitle">Download</span>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

//Components
import altTable from "@/components/tables/altTable";

export default {
  data() {
    return {
      columns: [
        { header: "N°" },
        { header: "UserId" },
        { header: "Answer" },
        { header: "Date" },
      ],
    };
  },
  computed: {
    ...mapGetters("surveys", ["getSurveyDetail"]),
  },

  components: {
    altTable,
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
          let optionsInString = JSON.stringify(nElement.Options).replaceAll('"',"'");
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
