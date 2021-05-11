import request from '@/Rest'

export function reset({commit}){
    commit('RESET')
}

export const FetchAllStudies= async({commit})=>{
    let studies = []
    const studiesSnap = await request.GET('studies',{'isCollection':true})
    studiesSnap.forEach((study) => {
        studies.push({
            id: study.id,
            text: study.id,
            ...study.data(),
          });
    });
    commit('saveStudies',studies)
}