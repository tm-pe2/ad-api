import { PoolClient } from "pg";
import { addConsumption, getIndexValueById } from "../services/index-value";
import { connectClient } from "../utils/database-connector";
import {generateAnnualInvoice} from "../utils/generate-invoice-util";
import {INVOICE_TYPE} from "../models/invoice";
import { getContractByUserId } from "../services/contract";
import { Contract } from "../models/contract";

export async function calcConstumptionMeter(id : number){
    
    const limit = 10000000;
    var actualConstumption = 0;
    
   const client = await connectClient();

   try{
    var values = await getIndexValueById(client,id);

    if(values && values.length>1){

            var prevValue = values[0].index_value;
            var currentValue = values[1].index_value; 
            var meter_id = values[0].meter_id;
            
            var exportData: Array<number | Date> = [];
            exportData[0] = meter_id;
            exportData[2] = new Date();

            if(currentValue < prevValue){
                var beforeTurnOver = limit - prevValue; 
                actualConstumption = currentValue + beforeTurnOver;
                
                exportData[1] = actualConstumption;
                
            }
            else{
                actualConstumption = currentValue - prevValue; 
                exportData[1] = actualConstumption;
                
            }

           const output = await addConsumption(client,exportData);

            var contract = await getContractByUserId(client,values[0].user_id);
    
            client.release();
            
            if(contract){

            generateAnnualInvoice(contract[0]);
            }
           
            if(!output){
                throw new Error("Could't add the consumption");                
            }
        }
    else{
        throw new Error("Could not load the index values");
    }
        
    }
    catch(error){
        console.log(error);        
    }

}
