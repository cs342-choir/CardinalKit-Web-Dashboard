import request from "@/Rest";
import { transformHealthDataToGlobalFormat } from "@/common/helpers/healthKit";

export const FetchSpecificTypeData = async ({ commit }, payload) => {
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  let endDate = new Date();
  if (payload.dates) {
    startDate = payload.dates.startDate;
    endDate = payload.dates.endDate;
  }
  let Ref = request.GET(
    `studies/${payload.studyId}/users/${payload.userId}/healthKit`
  );
  if (payload.dataType.includes("Quantity")) {
    Ref = Ref.WHERE(["body.quantity_type", "==", payload.dataType]);
  } else {
    Ref = Ref.WHERE(["body.category_type", "==", payload.dataType]);
  }
  let RefCopy = Ref.CLONE();
  RefCopy = RefCopy.WHERE(["header.creation_date_time", ">=", startDate]);
  RefCopy = RefCopy.WHERE(["header.creation_date_time", "<=", endDate]);
  let dataSnap = await RefCopy.Execute();
  let records = [];
  records = dataSnap.docs.map((record) => {
    return transformHealthDataToGlobalFormat(record.data());
  });
  console.log("Heeere",payload.dates,records.length)
  if (records.length == 0 && payload.dates==undefined) {
    console.log("Heeere")
    //Find Last and 1 month earlier
    let NewRef = Ref.CLONE()
      .ORDER_BY("header.creation_date_time", true)
      .LIMIT(1);
    let dateSnap = await NewRef.Execute();
    if (dateSnap.docs.length > 0) {
      let endDate = dateSnap.docs[0].data().header.creation_date_time.toDate();
      let startDate = new Date(endDate);
      startDate.setDate(-30);
      Ref = Ref.WHERE(["header.creation_date_time", ">=", startDate]);
      Ref = Ref.WHERE(["header.creation_date_time", "<=", endDate]);

      let snapShot = await Ref.Execute();
      records = snapShot.docs.map((record) => {
        return transformHealthDataToGlobalFormat(record.data());
      });
    }
  }
  commit("saveSpecificTypeData", { data: records, datatype: payload.dataType });
};

export const FetchLastCategoryData = async ({ dispatch }, payload) => {
  console.log("category", payload.category);
  switch (payload.category) {
    case "activity":
      return dispatch("FetchLastActivityData", payload);
    case "body":
      return dispatch("FetchLastBodyData", payload);
    case "cycle":
      return dispatch("FetchLastCycleData", payload);
    case "hearing":
      return dispatch("FetchLastHearingData", payload);
    case "heart":
      return dispatch("FetchLastHeartData", payload);
    case "mindfulness":
      return dispatch("FetchLastMindfulnessData", payload);
    case "mobility":
      return dispatch("FetchLastMobilityData", payload);
    case "nutrition":
      return dispatch("FetchLastNutritionData", payload);
    case "respiratory":
      return dispatch("FetchLastRespiratoryData", payload);
    case "sleep":
      return dispatch("FetchLastSleepData", payload);
    case "symtoms":
      return dispatch("FetchLastSymtomsData", payload);
    case "vitals":
      return dispatch("FetchLastVitalsData", payload);
    case "other":
      return dispatch("FetchLastOtherData", payload);
  }
};
