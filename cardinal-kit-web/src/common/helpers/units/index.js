import store from "@/store";

export const transformTimeToSeconds=(Value,Unit)=>{
    switch(Unit){
        case "Hours":
            return Value*3600
        case "Mins":
            return Value*60
        default:
            return Value
    }
}

export const transformDistanceToGlobalUnit=(Value,Unit)=>{
    // First Transform all to Cm
    let valueInCm = 0;
    switch(Unit){      
        case "mm":
            valueInCm = Value/10;
            break;
        case "cm":
            valueInCm = Value;
            break;
        case "m":
            valueInCm = Value*100;
            break;
        case "km":
            valueInCm = Value*100000;      
            break;
        case "mi":
            valueInCm = Value*16036
            break;
        case "ft":
            valueInCm = Value*30,48;
            break;
        default:
            //assume that by default it comes in meters 
            valueInCm = Value*100;
        break;
    }
    //then transform cm in spected Value
    let globalDistanceUnit= store.getters['units/getDistanceUnit']
    let ValueInGlobalMetric = 0;
    switch(globalDistanceUnit){
        case "mm":
            ValueInGlobalMetric =valueInCm*10;
            break;
        case "cm":
            ValueInGlobalMetric = valueInCm;
            break;
        case "m":
            ValueInGlobalMetric = valueInCm/100;
            break;
        case "km":
            ValueInGlobalMetric = valueInCm/100000;      
            break;
        case "mi":
            ValueInGlobalMetric = valueInCm/16036
            break;
        case "ft":
            ValueInGlobalMetric = valueInCm/30,48;
            break;
        default:
            //assume that by default is meters
            ValueInGlobalMetric = valueInCm/100;
        break;
    }

    return ValueInGlobalMetric
}

export const transformSecondsToBetterFormat=(Value)=>{
    let unit = "Secs"
    let newValue = Value
    if(newValue>60){
        newValue=newValue/60
        unit="Mins"
        if(newValue>60){
            newValue=newValue/60
            unit="Hours"
            if(newValue>24){
                newValue=newValue/24
                unit="Days"
            }
        }
    }
    if(newValue%1!=0){
        newValue = newValue.toFixed(2)
    }
    return{Value:newValue,Unit:unit}
}