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
          <!-- <td>
            <button @click="schedule(survey.name)">
              Change Dates
            </button>
          </td> -->
        </tr>
      </template>
    </alt-table>
    <div class="inline my-4" id="calendar">
      <a class="modal-show button" href="#modal" @click="resetForm">Add survey to calendar</a>
      <div class="modal" id="modal">
        <div class="modal-content">
          <a class="modal-hide" href="#">✕</a>
          <h2 class="m-4 text-center">Calendar survey</h2>
            <div class="input-form" >
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
              <div class="form-group text-center inline">
                <a @click="saveNewSchedule" class="m-1 button" >
                  Save
                </a>
                <a href="#" class="m-1 button">Cancel</a>
              </div>
            </div>
        </div>
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
import modal from "@/components/modals/modal.vue";

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
      ],
      showDate: new Date(),
      studyId: this.$route.params.studyId,
      displayLastDate: new Date(),
      displayFirstDate: new Date(),
      errMsg: false,
      msg: "",
      startDate: null,
      endDate: null,
      intervalDays:1 ,
      SurveySelected: null,
      description: "",
      cl: ""
    };
  },
  components: {
    CalendarView,
    CalendarViewHeader,
    altTable,
    altSelect,
    modal
  },
  methods: {
    ...mapActions("surveys",["CreateStudySchedule","CreateUserSchedule"]),
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
    resetForm(){
      this.cl = ""
      this.msg = ""
      this.errMsg=false
      this.startDate= null
      this.endDate= null
      this.intervalDays=1 
      this.SurveySelected= null
      this.description = ""
    },
    saveNewSchedule(){
      this.cl = ""
      this.msg = ""
      this.errMsg=false
      if(!this.startDate){
        this.errMsg = true
        this.msg = "Start date is missing"
        this.cl = "alert-err"
      }else if(!this.SurveySelected){
        this.errMsg = true
        this.msg = "Survey is missing"
        this.cl = "alert-err"
      }else if(!this.description){
        this.errMsg = true
        this.cl = "alert-err"
        this.msg = "Description is missing"
      }

      if(!this.errMsg){
        let data = {
          studyId:this.studyId,
          payload:{
            duration: {allDay: true},
            startTime: new Date(this.startDate),
            endTime: this.endDate ? new Date(this.endDate):null,
            interval:{ day:this.intervalDays},
            targetValues: [{groupIdentifier:this.SurveySelected}],
            text: this.description
          }
        }

        if(this.$route.query.userId){
          data["userId"]=this.$route.query.userId
          this.CreateUserSchedule(data)
          this.errMsg = true
          this.cl = 'alert-success'
          this.msg = "Calendar survey added successfully"
        }
        else{
          this.CreateStudySchedule(data)
          this.errMsg = true
          this.cl = 'alert-success'
          this.msg = "Calendar survey added successfully"
        }
        
        this.startDate= null
        this.endDate= null
        this.intervalDays=1 
        this.SurveySelected= null
        this.description = ""
      }
    }
  },
  computed: {
    ...mapGetters("surveys", ["getScheduleTasksByStudy","getSurveysData","getScheduleTasksByUser"]),
    calendarMonthItems() {
      let tasks = this.$route.query.userId ?
                  this.getScheduleTasksByUser(this.studyId,this.$route.query.userId)
                  : this.getScheduleTasksByStudy(this.studyId);
      let items = [];
      for (const [key, value] of Object.entries(tasks)) {
        if (value) {
          value.scheduleElements.forEach((schedule) => {
            let title = value.title;
            if (schedule.text) {
              title = schedule.text
            }
            if (schedule.startTime) {
              let startTime = schedule.startTime.toDate();
              let startTimeDay = new Date(startTime.getTime());
              startTimeDay.setHours(0);
              let endTime = new Date(this.displayLastDate.getTime());
              if (schedule.endTime) {
                if (schedule.endTime.toDate()<this.displayLastDate){
                  endTime = schedule.endTime.toDate();
                }
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
                  _date.setDate(_date.getDate() + parseInt(intervalDays));
                }
              }
            }
          });
        }
      }
      return items;
    },
    tableItems() {
      let tasks = this.$route.query.userId ?
                  this.getScheduleTasksByUser(this.studyId,this.$route.query.userId)
                  : this.getScheduleTasksByStudy(this.studyId);
      let items = [];
      for (const [_, value] of Object.entries(tasks)) {
        if (value) {
          value.scheduleElements.forEach((schedule) => {
            let title = value.title;
            let identifier = value.id;
            if (schedule.text) {
                title = schedule.text;
            }
            if(schedule.targetValues){
              if(schedule.targetValues.length>0){
                identifier = schedule.targetValues[0].groupIdentifier
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
      let surveys = this.getSurveysData(this.studyId);
      for (const [key, value] of Object.entries(surveys)) {
        types.push({ id: key, name: value.data.title, value: key });
      }
      return types;
    },
  },
  beforeRouteEnter(to, from, next) {
    if(to.query.userId){
      Promise.all([
        store.dispatch("surveys/FetchUserScheduler", {
          studyId: to.params.studyId,
          userId: to.query.userId
        }),
        store.dispatch("surveys/FetchAllSurveysData", {
          studyId: to.params.studyId
        })
      ]).then(() => {
        next();
      });
    }
    else{
      Promise.all([
        store.dispatch("surveys/FetchStudyScheduler", {
          studyId: to.params.studyId,
        }),
        store.dispatch("surveys/FetchAllSurveysData", {
          studyId: to.params.studyId,
        })
      ]).then(() => {
        next();
      });
    }   
  }
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
.modal-content {
  text-align: left;
}
</style>
