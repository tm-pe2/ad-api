import {Meter} from '../classes/meters';
import * as meterServices from '../services/meter';

const errorList = {
    existingPhysicalID: 'This meter is already registered!',
}


export const checkMeter =async (meter: Meter) => {
    let errorVar: string = '';
    try 
    {
        if(await meterServices.getMeterByPhysicalId(meter.physical_id) != -1)
        {
            errorVar = errorList.existingPhysicalID;
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }
    
    return errorVar;
}
