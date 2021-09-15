<template>
  <div class="page">
    <h1>My Calendar</h1>
    <br />
    <calendar-view
      :items="calendarMonthItems"
      :show-date="showDate"
      class="theme-default holiday-us-traditional holiday-us-official"
      :period-changed-callback="periodChanged"
    >
      <template #header="{ headerProps }">
        <calendar-view-header
          :header-props="headerProps"
          @input="setShowDate"
        />
      </template>
    </calendar-view>
    <br />
    <br />
    <alt-table :columns="columns" pagination>
      <template #t-row>
        <tr v-for="survey in tableItems" :key="survey.name">
          <td>
            {{ survey.name }}
          </td>
          <td>
            {{ survey.identifier }}
          </td>
          <td>
            {{ survey.startDate }}
          </td>
          <td>
            {{ survey.endDate }}
          </td>
          <td>
            {{ survey.interval }}
          </td>

          <td>
            <!-- <button class="btn" @click="details(survey.data.title)">Details</button> -->
            <button @click="schedule(survey.name)">
              Change Dates
            </button>
            <!-- <button class="btn" @click="edit(survey.name, index)">Edit</button> -->
          </td>
        </tr>
      </template>
    </alt-table>
    <button class="my-4" @click="newSchedule()">
      Add survey to calendar
    </button>

    <div class="input-form" v-show="showSurveyForm">
      <div :class="cl" v-if="errMsg">
        {{ msg }}
      </div>
      <label>Start Date: </label>
      <input v-model="startDate" type="datetime-local" />
      <br />
      <label>End Date: </label>
      <input v-model="endDate" type="datetime-local"  />
      <br />
      <label>Interval days: </label>
      <input v-model="intervalDays" type="number" min="1" pattern="^[0-9]+" />
      <br />
      <label>Survey: </label>
      <alt-select :options="surveys" v-model="SurveySelected" />
      <br />
      <label>Description: </label>
      <input
        v-model="description"
        type="text"
        placeholder="Enter the description"
      />
      <br />

      <div class="form-group">
        <button @click="saveNewSchedule" type="button" class="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";

import "vue-simple-calendar/dist/style.css";
import "vue-simple-calendar/static/css/default.css";
import "vue-simple-calendar/static/css/holidays-us.css";
import altTable from "@/components/tables/altTable";
import altSelect from "@/components/multiSelect/Select";

import store from "@/store";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "app",
  data: function() {
    return {
      columns: [
        { header: "Survey Name" },
        { header: "Survey Identifier" },
        { header: "Start Date" },
        { header: "End Date" },
        { header: "Interval" },
        { header: "Actions" },
      ],
      showDate: new Date(),
      studyId: this.$route.params.studyId,
      displayLastDate: new Date(),
      displayFirstDate: new Date(),
      showSurveyForm: false,
      errMsg: false,
      startDate: null,
      endDate: null,
      intervalDays:1 ,
      SurveySelected: null,
      description: ""
    };
  },
  components: {
    CalendarView,
    CalendarViewHeader,
    altTable,
    altSelect,
  },
  methods: {
    ...mapActions("surveys",["CreateStudySchedule"]),
    periodChanged(range, eventSource) {
      this.displayLastDate = range.displayLastDate;
      this.displayFirstDate = range.displayFirstDate;
    },
    setShowDate(d) {
      this.showDate = d;
    },
    isTaskInMonth(startDate, endDate) {
      return (
        startDate < this.displayLastDate && endDate > this.displayFirstDate
      );
    },
    newSchedule() {
      this.showSurveyForm = true;
    },
    saveNewSchedule(){
      this.CreateStudySchedule({
        startDate: this.startDate,
        endDate: this.endDate,
        interval: this.interval,
        surveyIdentifier: this.SurveySelected,
        description: this.description
      })

      this.showSurveyForm= false
      this.errMsg=false
      this.startDate= null
      this.endDate= null
      this.intervalDays=1 
      this.SurveySelected= null
      this.description = ""
    }
  },
  computed: {
    ...mapGetters("surveys", ["getScheduleTasksByStudy","getSurveysListData"]),
    calendarMonthItems() {
      let tasks = this.getScheduleTasksByStudy(this.studyId);
      let items = [];
      for (const [key, value] of Object.entries(tasks)) {
        if (value) {
          value.scheduleElements.forEach((schedule) => {
            let title = value.title;
            if (schedule.targetValues) {
              if (schedule.targetValues.length > 0) {
                title = schedule.targetValues[0].groupIdentifier;
              }
            }
            if (schedule.startTime) {
              let startTime = schedule.startTime.toDate();
              let startTimeDay = new Date(startTime.getTime());
              startTimeDay.setHours(0);
              let endTime = new Date(this.displayLastDate.getTime());
              if (schedule.endTime) {
                endTime = schedule.endTime.toDate();
              }
              if (this.isTaskInMonth(startTime, endTime)) {
                let intervalDays = schedule.interval.day;
                if (startTimeDay < this.displayFirstDate) {
                  let Difference_In_Time =
                    this.displayFirstDate.getTime() - startTimeDay.getTime();
                  let Difference_In_Days =
                    Difference_In_Time / (1000 * 3600 * 24);
                  let offset = Difference_In_Days % intervalDays;
                  startTimeDay.setDate(
                    this.displayFirstDate.getDate() + offset
                  );
                }
                let _date = new Date(startTimeDay.getTime());
                while (_date < endTime) {
                  items.push({
                    id: "e5",
                    startDate: new Date(_date.getTime()),
                    title: title,
                  });
                  _date.setDate(_date.getDate() + intervalDays);
                }
              }
            }
          });
        }
      }
      return items;
    },
    tableItems() {
      let tasks = this.getScheduleTasksByStudy(this.studyId);
      let items = [];
      for (const [_, value] of Object.entries(tasks)) {
        if (value) {
          console.log(value);
          value.scheduleElements.forEach((schedule) => {
            let title = value.title;
            let identifier = value.id;
            if (schedule.targetValues) {
              if (schedule.targetValues.length > 0) {
                title = schedule.targetValues[0].groupIdentifier;
              }
            }

            let startDate = null;
            let endDate = null;
            if (schedule.startTime) {
              startDate = schedule.startTime
                .toDate()
                .toLocaleString("en-US", { timeZone: "UTC" });
            }
            if (schedule.endTime) {
              endDate = schedule.endTime
                .toDate()
                .toLocaleString("en-US", { timeZone: "UTC" });
            }
            let intervalDays = schedule.interval.day;

            items.push({
              name: title,
              identifier: identifier,
              startDate: startDate,
              endDate: endDate,
              interval: intervalDays + " days",
            });
          });
        }
      }
      return items;
    },
    surveys() {
      let types = [];
      let surveys = this.getSurveysListData(this.studyId);
      for (const [key, value] of Object.entries(surveys)) {
        types.push({ id: key, name: value.data.title, value: key });
      }
      return types;
    },
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("surveys/FetchSchedulerByStudy", {
        studyId: to.params.studyId,
      }),
      store.dispatch("surveys/FetchSurveyByStudy", {
        studyId: to.params.studyId,
      }),
    ]).then(() => {
      next();
    });
  },
};
</script>
<style>

.cv-header {
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  flex-direction: column-reverse;
  min-height: 2.5em;
  border-width: 1px 1px 0 1px;
}
.cv-header-nav {
  display: flex;
}
.theme-default .cv-header button {
  color: #ffffff;
}
.theme-default .cv-header .periodLabel {
  text-transform: capitalize;
}

.theme-default .cv-day.past {
  background-color: #fafafa;
  width: 180px;
  height: 200px;
}

.cv-weeks {
  height: 550px;
}
</style>
