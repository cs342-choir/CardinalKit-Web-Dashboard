import request from "@/Rest";
import {transformHealthDataToGlobalFormat} from "@/common/helpers/healthKit"

export const FetchSpecificTypeData = async ({commit}, payload)=>{    
    let startDate =new Date()
    startDate.setDate(startDate.getDate()-7);
    let endDate = new Date()
    if(payload.dates){
        startDate=payload.startDate
        endDate=payload.endDate
    }
    let Ref = request.GET(`studies/${payload.studyId}/users/${payload.userId}/healthKit`)
    console.log(payload.dataType)
    if(payload.dataType.includes("Quantity")){
        Ref = Ref.WHERE(["body.quantity_type","==",payload.dataType])
    }
    else{
        Ref = Ref.WHERE(["body.category_type","==",payload.dataType])
    }
    Ref.WHERE(["header.creation_date_time",">=",startDate])
    Ref.WHERE(["header.creation_date_time","<=",endDate])

    let dataSnap = await Ref.Execute()

    let records = dataSnap.docs.map((record) => {
        return transformHealthDataToGlobalFormat(record.data());
    });

    commit("saveSpecificTypeData",{data:records,datatype:payload.dataType})
}


export const FetchLastCategoryData = async({dispatch }, payload)=>{
    console.log("category",payload.category)
    switch(payload.category){
        case "activity":
            return dispatch('FetchLastActivityData',payload)
        case "body":
            return dispatch('FetchLastBodyData',payload)
    }
}