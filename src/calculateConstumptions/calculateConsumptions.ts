import { PoolClient } from "pg";
import { getIndexValueById } from "../services/index-value";
import { connectClient } from "../utils/database-connector";

export async function calcConstumtionMeter(id : number){
    
    const limit = 10000000;
    var actualConstumption = 0;
    
   const client = await connectClient();
   var values = await getIndexValueById(client,id);
   console.log(values);
   
   if(values && values.length>1){

        var prevValue = values[0].index_value;
        var currentValue = values[1].index_value; 
        var user_id = values[0].user_id;
        var meter_id = values[0].meter_id;
        
        if(currentValue < prevValue){
            var beforeTurnOver = limit - prevValue; 
            actualConstumption = currentValue + beforeTurnOver;
        
            
        }
        else{
            actualConstumption = currentValue - prevValue; 
            
            
            // actualConstumption
        }
    }

}

    

