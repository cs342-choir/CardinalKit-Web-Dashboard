// import { initialState } from "./index";

// export function RESET(state) {
//   const newState = initialState();
//   Object.keys(newState).forEach((key) => {
//     state[key] = newState[key];
//   });
// }

export function saveHealthData(state, payload) {
  console.log("llama save healt")
  let healthData = {};
  payload.forEach((record) => {
    Object.keys(record).forEach((key) => {
      let keyCode = "";
      let name = "";
      if (record[key].code) {
        keyCode = record[key].code.coding[0].code;
        name = record[key].code.coding[0].display;
      } else if (record[key].category) {
        keyCode = record[key].category[0].type;
        name = record[key].category[0].type;
      } else if (record[key].component) {
        keyCode = record[key].component[0].valueCodeableConcept.text;
        name = keyCode;
      } else {
        console.log("record sin category ", record[key]);
      }

      if (!(keyCode in healthData)) {
        healthData[keyCode] = {
          name: name,
          code: keyCode,
          data: [],
        };
      }
      healthData[keyCode].data.push(record[key]);
    });
  });
  console.log(healthData);
  state.healthData = healthData;
}

export function saveActivityData(state, payload) {
  console.log("llamando otro", payload);
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


export function saveLastActivityData(state, payload) {
  let activityData = {};
  let activityDataWebFormat = [];
  payload.forEach((type) => {
    if (type.length > 0) {
      if (type[0]["body"]["quantity_type"]) {
        activityData[type[0]["body"]["quantity_type"]] = type[0];
        let value = 0
        let unit = 'N/A'

        if(type[0].body.unit_value){
          value = type[0].body.unit_value.value
          unit = type[0].body.unit_value.unit
        }
        if(type[0].body.kcal_burned){
          value = type[0].body.kcal_burned.value
          unit = type[0].body.kcal_burned.unit
        }
        console.log(type[0].header.creation_date_time)

        let date = type[0].header.creation_date_time.toDate()
        activityDataWebFormat.push({
          id: "jfawieanaviaep340var445",
          name: type[0].body.quantity_type.replace("HKQuantityTypeIdentifier",""),
          date:  date.getDate() + " " + monthNames[date.getMonth()],
          value: value,
          measure: unit,
          color: "red",
          logo: require("@/assets/icons/Flame.png"),
        });
      } else {
        activityData[type[0]["body"]["category_type"]] = type[0];
      }
    }
  });
  console.log("state antes de mutacion",state)
  state.activityData = activityData;
  state.activityDataWebFormat = activityDataWebFormat;
  console.log("state despues de mutacion",state)
}
