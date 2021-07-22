<template>
  <div>
    <div v-for="(value, key) in getSurveyDetail(studyId)[surveyId]" :key="key">
      {{ value.question.question }}
      <br />
      <br />
      <div
        v-for="(option, optionKey) in value.question.options"
        :key="optionKey"
      >
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
      console.log(
        "before transform",
        this.getSurveyDetail(this.studyId)[this.surveyId]
      );
      let json = JSON.stringify(
        this.getSurveyDetail(this.studyId)[this.surveyId]
      );
      const parsedJson = JSON.parse(json);
      console.log("this is the parsedJson", parsedJson);
      console.log("this is the json", json);


      const objectToCsv = function (data) {
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
      };


      const download = function (data) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const docu = document.createElement('a');
        docu.setAttribute('hidden', '');
        docu.setAttribute('href', url);
        docu.setAttribute('download', 'csvname.csv');
        docu.click();
      };

       download(json);

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
