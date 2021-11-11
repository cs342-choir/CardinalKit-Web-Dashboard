/** Apple Categories and icons */
export const CategoriesList = [
  { id:"activity", name: "Activity", icon: require("@/assets/icons/Flame.png") },
  { id:"body", name: "Body Measurements", icon: require("@/assets/icons/Body.png") },
  { id:"hearing", name: "Hearing", icon: require("@/assets/icons/Hearing.png") },
  { id:"heart", name: "Heart", icon: require("@/assets/icons/Heart.png") },
  { id:"mindfulness", name: "Mindfulness", icon: require("@/assets/icons/Mindfulness.png") },
  { id:"mobility", name: "Mobility", icon: require("@/assets/icons/Mobility.png") },
  { id:"nutrition", name: "Nutrition", icon: require("@/assets/icons/Nutrition.png") },
  { id:"respiratory", name: "Respiratory", icon: require("@/assets/icons/Respiratory.png") },
  { id:"sleep", name: "Sleep", icon: require("@/assets/icons/Sleep.png") },
  { id:"symtoms", name: "Symptoms", icon: require("@/assets/icons/Symtoms.png") },
  { id:"vitals", name: "Vitals", icon: require("@/assets/icons/Vitals.png") },
  { id:"other", name: "Other Data", icon: require("@/assets/icons/Other.png") },
  { id:"survey", name: "Surveys", icon: require("@/assets/icons/Other.png"), customAction:"surveyUser" },
];

/** Apple Categories that need average instead of summation */
export const dataTypeToCalculateAverage = [
  "HKQuantityTypeIdentifierRestingHeartRate",
  "HKQuantityTypeIdentifierHeartRate",
  "HKQuantityTypeIdentifierHeartRateVariabilitySDNN",
  "HKQuantityTypeIdentifierBodyFatPercentage",
  "HKQuantityTypeIdentifierEnvironmentalAudioExposure",
  "HKQuantityTypeIdentifierOxygenSaturation",
  "HKQuantityTypeIdentifierBloodAlcoholContent",
  "HKQuantityTypeIdentifierRespiratoryRate",
  "HKQuantityTypeIdentifierWalkingDoubleSupportPercentage"
]

export const dataTypeToRounded = [
  "HKQuantityTypeIdentifierRestingHeartRate",
  "HKQuantityTypeIdentifierHeartRate",
  "HKQuantityTypeIdentifierHeartRateVariabilitySDNN",
  "HKQuantityTypeIdentifierRespiratoryRate"
]