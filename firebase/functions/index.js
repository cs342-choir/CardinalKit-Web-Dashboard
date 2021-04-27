const _ = require('lodash');

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const {dictionaryConcepMap} = require('./Dictionarys/dictionaryConceptMap')

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};



var typeRule = {
  copy:"copy",
  add:"add",
  addIfHaskey:"addIfHaskey",
  fromDict:"fromDict",
  concat:"concat",
  conceptTable:"conceptTable"
}
// Table Transformation
class transformRule{
  type = typeRule.copy;
  

  static copyValue(keyInput,keyOutput){
    let newRule = new transformRule()
    newRule.keyInput = keyInput
    newRule.keyOutput = keyOutput
    newRule.type=typeRule.copy
    return newRule;
  }

  static addValue(KeyOutput,value){
    let newRule = new transformRule()
    newRule.KeyOutput=KeyOutput
    newRule.valueOutput = value
    newRule.typeRule=typeRule.add
    return newRule;
  }

  static addValueIfHasKey(keyInput,keyOutput, value){
    let newRule = new transformRule()
    newRule.keyOutput = keyOutput
    newRule.valueOutput= value
    newRule.keyInput=keyInput
    newRule.type=typeRule.addIfHaskey
    return newRule;
  }

  //dict Values example
  // {stepCount:step-count,heartRate:heart-rate}
  static addValueDependOnInput(keyInput,keyOutput,dictValuesToTransform,defaultValue=null){
    let newRule = new transformRule()
    newRule.keyInput=keyInput
    newRule.keyOutput=keyOutput
    newRule.dictValues = dictValuesToTransform
    newRule.defaultValue = defaultValue
    newRule.type= typeRule.fromDict
    return newRule;
  }

  static concatenation(keysInput,keyOutput,formatOutput){
    let newRule = new transformRule()
    newRule.keysInput=keysInput
    newRule.keyOutput = keyOutput
    newRule.concatenate = true
    newRule.formatOutput = formatOutput
    newRule.type=typeRule.concat
    return newRule
  }

  static ohmFhirConceptMappingTable(keyInput, keyOutput){
    let newRule = new transformRule()
    newRule.keyInput=keyInput
    newRule.keyOutput = keyOutput
    newRule.type=typeRule.conceptTable
    return newRule
  }
  
  transformValue(dictInput,dictOutput){
    switch(this.type){
      case typeRule.copy:
        if(_.hasIn(dictInput, this.keyInput)){
          let value = _.get(dictInput,this.keyInput)
          _.set(dictOutput,this.KeyOutput,value)
        }
        break

      case typeRule.add:
        _.set(dictOutput,this.KeyOutput,this.valueOutput)
        break

      case typeRule.addIfHaskey:
        if(_.hasIn(dictInput, this.keyInput)){
          _.set(dictOutput,this.KeyOutput,this.valueOutput)
        }
        break

      case typeRule.fromDict:
        if(_.hasIn(dictInput, this.keyInput)){
          let value = _.get(dictInput,this.keyInput)
          if(this.dictValues[value]){
            _.set(dictOutput, this.keyOutput, this.dictValues[value])
          }
          else if(this.defaultValue){
            _.set(dictOutput, this.keyOutput, this.defaultValue)
          }
        }
        break

      case typeRule.concat:
        let values = []
        let hasAll = true
        this.keysInput.forEach(element => {
          if(_.hasIn(dictInput, element)){
            values.push(_.get(dictInput,element))
          }
          else{
            hasAll=false
          }
        });
        if(hasAll){
          _.set(dictOutput, this.keyOutput, this.formatOutput.formatUnicorn(...values))
        }
        break

      case typeRule.conceptTable:
        console.log("tratando de pasar de tabla");
        if(_.hasIn(dictInput, this.keyInput)){
          console.log("tiene el input");
          let idInput = _.get(dictInput,this.keyInput)
          console.log("encontro id input",idInput);
          console.log("Diccionario",dictionaryConcepMap[idInput]);
          
          if(_.hasIn(dictionaryConcepMap,idInput)){
            _.set(dictOutput,this.keyOutput,dictionaryConcepMap[idInput])
          }
        }
        break

    }
    
    // if(!this.dependOnInput){
    //   _.set(dictOutput,this.KeyOutput,this.valueOutput)
    // }
    // else if(this.concatenate){
    //   let values = []
    //   let hasAll = true
    //   this.keysInput.forEach(element => {
    //     if(_.hasIn(dictInput, element)){
    //       values.push(_.get(dictInput,element))
    //     }
    //     else{
    //       hasAll=false
    //     }
    //   });
    //   if(hasAll){
    //     _.set(dictOutput, this.keyOutput, this.formatOutput.formatUnicorn(...values))
    //   }
    //   // else if(this.concatenate){
    //   //   _.set(dictOutput, this.keyOutput, this.formatOutput.formatUnicorn(value))
    //   // }
    // }
    // else if(_.hasIn(dictInput, this.keyInput)){
    //   let value = _.get(dictInput,this.keyInput)
    //   if(this.transformByDict){
    //     if(this.dictValues[value]){
    //       _.set(dictOutput, this.keyOutput, this.dictValues[value])
    //     }
    //     else if(this.defaultValue){
    //       _.set(dictOutput, this.keyOutput, this.dictValues[value])
    //     }
    //   }
    //   else{
    //     _.set(dictOutput, this.keyOutput, this.valueOutput?this.valueOutput:value)
    //   }
    // }
  }
  
}

let items = [ 
  // // pass exact value to another key
  // transformRule.copyValue('header.id','metadata.id'),
  // //  add exact value
  // transformRule.addValue('metadata.notDependend','NotDependend'),
  // //  if input dict has a key add defect Value
  // transformRule.addValueIfHasKey('header.id','metadata.valueDefect','testDefect'),
  // //  if input dict has a expected value in a expected key add value
  // transformRule.addValueDependOnInput('body.schema_id.namespace','metadata.namespace',{'granola':'TieneGranola'}),
  // // output with concatenation
  // transformRule.concatenation('header.id','metadata.concatenation','{0}-concat')

  transformRule.addValue('resourceType','Observation'),
  //TODO add healthId
  transformRule.copyValue('healthId','id'),

  //Meta
  transformRule.addValue('meta.profile[0]','http://www.fhir.org/mfhir/StructureDefinition/omh_fhir_profile_quantitative_observation'),
  transformRule.addValue('meta.source','cardinalkitApp'),
  transformRule.copyValue('header.acqusitionProvenance.sourceName','meta.source'),

  //Extension
  transformRule.addValueIfHasKey('body.specimen_source','extension[0].url','http://hl7.org/fhir/StructureDefinition/observation-specimenCode'),
  transformRule.ohmFhirConceptMappingTable('body.specimen_source','extension[0].valueCodeableConcept.coding[0]'),
  
  //Identifier
  transformRule.copyValue('header.id','identifier[0].value'),
  transformRule.addValue('identifier[0].system','https://omh.org/shimmer/ids'),
  
  transformRule.concatenation(['header.acquisition_provenance.source_data_point_id'],'identifier[1].value','urn:uuid:{0}'),
  transformRule.addValueIfHasKey('header.acquisition_provenance.source_data_point_id','identifier[1].system','urn:ietf:rfc:3986'),

  //Status 
  transformRule.addValue('status','unknown'),

  //Category
  transformRule.addValue('category[0].coding[0].system','http://hl7.org/fhir/observation-category'),
  transformRule.addValueDependOnInput('header.schema_id.name','category[0].coding[0].code',{
    'acceleration':'physical-activity',
    'ambient-temperature':'None',
    'blood-glucose':'laboratory',
    'blood-presure':'vitalsigns',
    'body-fat-percentage':'exam',
    'body-height':'vital-signs',
    'body-mass-index':'vital-signs',
    'body-temperature':'vital-signs',
    'body-weight':'vital-signs',
    'breath-carbon-monoxide':'laboratory',
    'calories-burned':'physical-activity',
    'diastolic-blood-pressure':'vital-signs',
    'expiratory-time':'exam',
    'geoposition':'physical-activity',
    'heart-rate':'vital-signs',
    'inspiratory-time':'exam',
    'magnetic-force':'physical-activity',
    'medication-adherence-percent':'Survey',
    'minute-volume':'exam',
    'minute-moderate-activity':'physical-activity',
    'orientation':'vital-signs',
    'oxygen-saturation':'vital-signs',
    'pace':'physical-activity',
    'physical-activity':'physical-activity',
    'respiratory-rate':'vital-signs',
    'rr-interval':'exam',
    'sleep-duration':'physical-activity',
    'sleep-episode':'physical-activity',
    'speed':'physical-activity',
    'step-count':'physical-activity',
    'systolic-blood-pressure':'vital-signs',
    'ventilation-cycle-time':'exam'
  }),
  transformRule.addValueDependOnInput('header.schema_id.name','category[0].coding[0].display',{
    'acceleration':'Activity',
    'blood-glucose':'Laboratory',
    'blood-presure':'Vital Signs',
    'body-fat-percentage':'Exam',
    'body-height':'Vital Signs',
    'body-mass-index':'Vital Signs',
    'body-temperature':'Vital Signs',
    'body-weight':'Vital Signs',
    'breath-carbon-monoxide':'Laboratory',
    'calories-burned':'Activity',
    'diastolic-blood-pressure':'Vital Signs',
    'expiratory-time':'Exam',
    'geoposition':'Activity',
    'heart-rate':'Vital Signs',
    'inspiratory-time':'Exam',
    'magnetic-force':'Activity',
    'medication-adherence-percent':'Survey',
    'minute-volume':'Exam',
    'minute-moderate-activity':'Activity',
    'orientation':'Vital Signs',
    'oxygen-saturation':'Vital Signs',
    'pace':'Activity',
    'physical-activity':'Activity',
    'respiratory-rate':'vVital Signs',
    'rr-interval':'Exam',
    'sleep-duration':'Activity',
    'sleep-episode':'Activity',
    'speed':'Activity',
    'step-count':'Activity',
    'systolic-blood-pressure':'Vital Signs',
    'ventilation-cycle-time':'Exam'
  }),
  
 //Code 
  transformRule.addValueDependOnInput('header.schema_id.name','code.coding[0].code',{
    'acceleration':'80493-0',
    'ambient-temperature':'60832-3',
    'blood-glucose':'2339-0',
    'blood-presure':'85354-9',
    'body-fat-percentage':'41982-0',
    'body-height':'8302-2',
    'body-mass-index':'39156-5',
    'body-temperature':'8310-5',
    'body-weight':'29463-7',
    'breath-carbon-monoxide':'251900003',
    'calories-burned':'41981-2',
    'diastolic-blood-pressure':'8462-4',
    'expiratory-time':'60739-0',
    'geoposition':'geoposition',
    'heart-rate':'8867-4',
    'inspiratory-time':'60740-8',
    'magnetic-force':'magnetic-force',
    'medication-adherence-percent':'418633004',
    'minute-volume':'20139-2',
    'minute-moderate-activity':'408581006',
    'orientation':'orientation',
    'oxygen-saturation':'59408-5',
    'pace':'pace',
    'physical-activity':'68130003',
    'respiratory-rate':'9279-1',
    'rr-interval':'8637-1',
    'sleep-duration':'248263006',
    'sleep-episode':'258158006',
    'speed':'C0678536',
    'step-count':'55423-8',
    'systolic-blood-pressure':'8480-6',
    'ventilation-cycle-time':'250818005'
  }),
  transformRule.addValueDependOnInput('header.schema_id.name','code.coding[0].system',{
    'acceleration':'http://loinc.org',
    'ambient-temperature':'http://loinc.org',
    'blood-glucose':'http://loinc.org',
    'blood-presure':'http://loinc.org',
    'body-fat-percentage':'http://loinc.org',
    'body-height':'http://loinc.org',
    'body-mass-index':'http://loinc.org',
    'body-temperature':'http://loinc.org',
    'body-weight':'http://loinc.org',
    'breath-carbon-monoxide':'http://snomed.info/id',
    'calories-burned':'http://loinc.org',
    'diastolic-blood-pressure':'http://loinc.org',
    'expiratory-time':'http://loinc.org',
    'geoposition':'http://www.fhir.org/guides/omhtofhir/datapoint-type',
    'heart-rate':'http://loinc.org',
    'inspiratory-time':'http://loinc.org',
    'magnetic-force':'http://www.fhir.org/guides/omhtofhir/datapoint-type',
    'medication-adherence-percent':'http://snomed.info/id',
    'minute-volume':'http://loinc.org',
    'minute-moderate-activity':'http://snomed.info/id',
    'orientation':'http://www.fhir.org/guides/omhtofhir/datapoint-type',
    'oxygen-saturation':'http://loinc.org',
    'pace':'http://www.fhir.org/guides/omhtofhir/datapoint-type',
    'physical-activity':'http://snomed.info/id',
    'respiratory-rate':'http://loinc.org',
    'rr-interval':'http://loinc.org',
    'sleep-duration':'http://snomed.info/id',
    'sleep-episode':'http://snomed.info/id',
    'speed':'http://ncimeta.nci.nih.gov',
    'step-count':'http://loinc.org',
    'systolic-blood-pressure':'http://loinc.org',
    'ventilation-cycle-time':'http://snomed.info/id'
  }),
  transformRule.addValueDependOnInput('header.schema_id.name','code.coding[0].display',{
    'acceleration':'Activity level [Acceleration]',
    'ambient-temperature':'Room temperature',
    'blood-glucose':'Glucose Mass/volume in Blood',
    'blood-presure':'Blood pressure panel with all children optional',
    'body-fat-percentage':'Percentage of body fat Measured',
    'body-height':'Body height',
    'body-mass-index':'Body mass index (BMI) Ratio',
    'body-temperature':'Body temperature',
    'body-weight':'Body weight',
    'breath-carbon-monoxide':'Expired carbon monoxide concentration (observable entity)',
    'calories-burned':'Calories burned',
    'diastolic-blood-pressure':'Diastolic blood pressure',
    'expiratory-time':'Expiration Time Respiratory system',
    'geoposition':'Geoposition',
    'heart-rate':'Heart rate',
    'inspiratory-time':'Inspiration Time Respiratory system',
    'magnetic-force':'Magnetic Force Panel',
    'medication-adherence-percent':'Medication compliance (observable entity)',
    'minute-volume':'Volume expired 1 minute',
    'minute-moderate-activity':'Physical activity target moderate exercise (finding)',
    'orientation':'Gyroscope measurement Panel',
    'oxygen-saturation':'Oxygen saturation in Arterial blood by Pulse oximetry',
    'pace':'Pace',
    'physical-activity':'Physical activity (observable entity)',
    'respiratory-rate':'Respiratory Rate',
    'rr-interval':'R-R interval by EKG',
    'sleep-duration':'Duration of sleep (observable entity)',
    'sleep-episode':'Sleep, function (observable entity)',
    'speed':'Speed',
    'step-count':'Number of steps in unspecified time Pedometer',
    'systolic-blood-pressure':'Systolic blood pressure',
    'ventilation-cycle-time':'Ventilation cycle time (observable entity)'
  }),
  transformRule.concatenation(['body.descriptive_statistic','header.schema_id.name'],'code.coding[1].code','{0}-{1}'),
  transformRule.concatenation(['header.schema_id.name','body.descriptive_statistic'],'code.coding[1].display'),
  transformRule.addValueIfHasKey('body.descriptive_statistic','code.coding[1].system','http://www.fhir.org/guides/mfhir/omh_fhir_observation_codes'),

//Subject //add userId
  transformRule.copyValue('header.user_id','subject.identifier.value'),
  transformRule.addValue('subject.identifier.system','https://omh.org/shimmer/patient_ids'),
 
  //Effective datetime period 
  transformRule.copyValue('body.effective_time_frame.date_time','effectiveDateTime'),
  transformRule.copyValue('body.effective_time_frame.time_interval.start_date_time','effectivePeriod.start'),
  transformRule.copyValue('body.effective_time_frame.time_interval.end_date_time','effectivePeriod.end'),

  //issued
  transformRule.copyValue('header.creation_date_time','issued'),

  //Value Quantity 
  transformRule.addValueDependOnInput('header.schema_id.name','valueQuantity.unit',{    
    'blood-glucose':'‘[mg/dL’, ‘mmol/L’]',
    'body-fat-percentage':'%',
    'body-height':'[‘cm’, ‘in’]',
    'body-mass-index':'kg/m^2',
    'body-temperature':'[‘K’,’F’,’C’]',
    'body-weight':'[‘kg’, ‘g’, ‘lb’]',
    'calories-burned':'kcal',
    'diastolic-blood-pressure':'mmHg',
    'heart-rate':'beats/min',
    'minute-moderate-activity':'min',
    'oxygen-saturation':'%',
    'respiratory-rate':'breaths/min',
    'rr-interval':'R-R interval by EKG',
    'sleep-duration':'[‘sec’, ‘min’, ‘h’]',
    'step-count':'steps',
    'systolic-blood-pressure':'mmHg'
  }),
  transformRule.addValue('valueQuantity.system','http://unitsofmeasure.org'),

    //Heart Rate
    transformRule.copyValue('body.heart_rate.value','valueQuantity.value'),
    transformRule.addValueIfHasKey('body.heart_rate','valueQuantity.code','/min'),

    //Blood Gluccose
    transformRule.ohmFhirConceptMappingTable('body.blood_glucose.unit','valueQuantity'),
    transformRule.copyValue('body.blood_glucose.value','valueQuantity.value'),
    transformRule.copyValue('body.blood_glucose.unit','valueQuantity.unit'),
  

  transformRule.copyValue('header.acquisition_provenance.source_name','device.display'),  
  transformRule.copyValue('header.acquisition_provenance.modality','device.extension[0].valueCode'),
  transformRule.addValue('device.extension[0].url','http://www.fhir.org/mfhir/StructureDefinition/extenion-modality'),
 
  
  transformRule.addValueIfHasKey('body.blood_glucose.unit','valueQuantity.system','http://unitsofmeasure.org'),
  //TODO
  transformRule.addValueDependOnInput('body.blood_glucose.unit','valueQuantity.code',{

  }),

  
  

  
  
  //TODO
  //body.temporal_relationship_to_physical_activity - Observation.component[0] ??
  //body.temporal_relationship_to_physical_activity - Observation.component[0].code

  //Step Count

  transformRule.copyValue('body.step_count','valueQuantity.value'),
  transformRule.addValueIfHasKey('body.step_count','valueQuantity.code','{steps}'),

  //Heart Rate
  
  //OMH_FHIR_Concept_Maps['body.body_temperature.unit']Concept Mapping

  //Temperature
  transformRule.copyValue('body.body_temperature.value','valueQuantity.value'),
  transformRule.copyValue('body.body_temperature.unit','valueQuantity.unit'),

  //Create value in server for resource_id
  transformRule.addValue('id','--'),
  


  
]

exports.omhToFhir =
    functions.firestore
        .document("/studies/{studyId}/users/{userId}/healthKit/{healthId}")
        .onWrite((change, context) => {
          const dataOmh = change.after.data().payload;
          let dataFhir = [];
          dataOmh.forEach(register => {
            let dicFhir = {}
            items.forEach(element => {
              element.transformValue(register,dicFhir)
            });
            dataFhir.push(dicFhir)
          });
          db.doc(
              `studies/${context.params.studyId}`+
              `/users/${context.params.userId}`+
              `/healthFhir/${context.params.healthId}`
          ).set({ ...dataFhir });
        });