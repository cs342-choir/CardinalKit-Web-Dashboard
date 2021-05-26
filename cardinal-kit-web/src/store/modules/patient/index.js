import request from "@/Rest";

import * as activityMutations from './HealthData/Activity/mutations'

export const FetchCategoryTypeData = async (  
  categoryType,
  payload
) => {
  let filterParams = [
    ["body.category_type","==",categoryType],
    ["header.creation_date_time",">=",new Date('2021-05-21')],
    ["header.creation_date_time","<=",new Date('2021-05-21')]
  ]
  return await FetchGeneralData({...payload,filterParams})
};

export const FetchQuantityData = async(
  quantity_type,
  payload
) => {
  let filterParams = [
    ["body.quantity_type","==",quantity_type],
    ["header.creation_date_time",">=",new Date('2021-05-10')],
    ["header.creation_date_time","<=",new Date('2021-05-30')]
  ]
  return await FetchGeneralData({...payload,filterParams})
};

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
    ...require("./HealthData/Activity/mutations"),
    ...require("./HealthData/Hearing/mutations"),
  },
  actions: {
    ...require("./HealthData/Activity/actions"),
    ...require("./HealthData/Hearing/actions"),
  },
  getters:{
    ...require("./HealthData/Activity/getters"),
    ...require("./HealthData/Hearing/getters"),
    
  }
};