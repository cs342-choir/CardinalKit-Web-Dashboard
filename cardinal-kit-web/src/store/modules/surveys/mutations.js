import {initialState} from './index'

export function RESET(state){
    const newState= initialState();
    Object.keys(newState).forEach(key => {
        state[key] = newState[key]
    });
}

export function saveSurveysList(state,{idStudy,surveys}){
    state.surveysList[idStudy]=surveys
}

export function saveSurveyDetail(state,{results,studyId,surveyId}){
    let dictResult = {}
    results.forEach(records => {
        //each record 
        records.forEach((record)=>{
            if(record.results){
                //Each Question
                record.results.forEach((question)=>{
                    if(question.results && (question.results.length>0) || (!Array.isArray(question.results))){
                        
                        console.log("this is the question",question)
                        let identifier = ""
                        let objet = []
                        let answers = []
                        if(question.questionType){




                            objet = transformQuestionFormat(question)
                            identifier=question.identifier
                            question["userId"]=records["userId"]
                            answers.push(transformAnswerFormat(question))
                        }
                        else{
                            //If no has question type is no a question
                            // if is form?

                            if(!Array.isArray(question.results)){
                                objet = transformQuestionFormat(question)
                            }
                            else{
                                question.results.forEach(Nquestion => {
                                    Nquestion["startDate"] = question.startDate
                                    Nquestion["userId"] = records["userId"]
                                    objet = transformQuestionFormat(Nquestion)
                                    identifier=Nquestion.identifier
                                    answers.push(transformAnswerFormat(Nquestion))
                                })
                            }
                        }
                        if(!dictResult[identifier]){
                            dictResult[identifier]={}
                            dictResult[identifier]["question"]=objet
                            dictResult[identifier]["answers"]=[]
                        }

                        answers.forEach(element => {
                            dictResult[identifier]["answers"].push(element)
                        });
                    }
                })
            }
        })
    });
    let surveyDetail = state.surveyDetail
    surveyDetail[studyId]=[]
    surveyDetail[studyId][surveyId]=dictResult
    state.surveyDetail=surveyDetail
    console.log("Este es el dictResult",dictResult)
}

function transformQuestionFormat(question){    
    let response = {}
    switch(question.questionType){
        case 1:
        case 2:
        case 7:
            response["question"]=question.question
            response["options"]=question.Options
            return response
        default:
            response["question"]=question.identifier
            return response

    }
}

function transformAnswerFormat(question){

    let answer=""
    if(question.fileURL){
        answer=question.fileURL
    }

    if(question.urlStorage){
        answer=question.urlStorage
    }
    
    switch(question.questionType){
        case 1:
            answer=question.results.answer
            break;
        case 2:
            answer=question.answer
            break;
        case 7:
            answer=question.results.answer
            break;
    }
     let date = ""
     try{
         date = question.startDate.toDate()
     }
     catch{
         date = ""
     }

    return {"userId":question.userId,"answer":answer, date:date }
}