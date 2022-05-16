import {Meter} from '../classes/meters';
import * as meterServices from '../services/meter-service';

const errorList = {
    existingPhysicalID: 'This meter is already registered!',
}


export const checkMeter =async (meter: Meter) => {
    let errorVar: string = '';
    try 
    {
        if(!await meterServices.getMeterByPhysicalId(meter.physical_id))
        {
            errorVar = errorList.existingPhysicalID;
            throw new Error(errorList.existingPhysicalID);
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }
    
    return errorVar;
}