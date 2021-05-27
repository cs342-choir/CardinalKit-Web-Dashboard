import request from "@/Rest";

export const FetchCategoryTypeData = async (  
  categoryType,
  payload
) => {
  let filterParams = [
    ["body.category_type","==",categoryType],    
  ]
  return await FetchGeneralData({...payload,filterParams})
};

export const FetchQuantityData = async(
  quantity_type,
  payload
) => {
  let filterParams = [
    ["body.quantity_type","==",quantity_type]
  ]
  return await FetchGeneralData({...payload,filterParams})
};

export const FetchActivities = async(payload)=>{
  let snapShot =  await request
    .GET(`studies/${payload.studyId}/users/${payload.userId}/healthKit`)
    .WHERE(["body.activity_name","!=",null])
    .ORDER_BY("body.activity_name")
    .ORDER_BY('header.creation_date_time',true)
    .LIMIT(payload.limit)
    .Execute()
    let records = snapShot.docs.map((record) => {
      return record.data();
    });
    return records
}

const FetchGeneralData = async (payload) => { 
  let Ref = request.GET(`studies/${payload.studyId}/users/${payload.userId}/healthKit`)
  payload.filterParams.forEach(element => {    
    Ref=Ref.WHERE(element)
  });
  if(payload.limit != 0){

    Ref = Ref.ORDER_BY('header.creation_date_time',true).LIMIT(payload.limit)
  }
  let userSnap = await Ref
    .Execute()
  let records = userSnap.docs.map((record) => {
    return record.data();
  });
  return records
};

export const initialState = () => ({
  healthData: {},
  // activityData: {},
  // activityDataWebFormat: []
});

export default {
  namespaced: true,
  state: initialState(),
  mutations:
  {
    ...require("./HealthData/mutations"),
    ...require("./HealthData/Activity/mutations"),
    ...require("./HealthData/Hearing/mutations"),
  },
  actions: {
    ...require("./HealthData/actions"),
    ...require("./HealthData/Activity/actions"),
    ...require("./HealthData/Hearing/actions"),
  },
  getters:{
    ...require("./HealthData/getters"),
    ...require("./HealthData/Activity/getters"),
    ...require("./HealthData/Hearing/getters"),
    
  }
};