import { getConsumptionById } from "../services/consumption";
import { getIndexValueById } from "../services/index-value";
import { connectClient } from "../utils/database-connector";

export function calcConstumtionMeter(): number{

    const limit = 10000000;

    var values = getValues();

    var prevValue = 9999999;
    var currentValue = 1;

    var actualConstumption = 0;

    if(currentValue < prevValue){
        var beforeTurnOver = limit - prevValue; 
        actualConstumption = currentValue + beforeTurnOver;


        return actualConstumption;
    }
    
    actualConstumption = prevValue - currentValue; 

    console.log(actualConstumption);

    return actualConstumption

}

async function getValues(){
    var  id = 1;
    console.log("hier");
    const client = await connectClient();
    getIndexValueById(client, id).then((res) => 
    {
        return res;
    });

}

    

