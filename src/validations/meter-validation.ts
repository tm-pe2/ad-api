import {Meter} from '../classes/meters';
import * as meterServices from '../services/meter-service';

const errorList = {
    existingPhysicalID: 'This meter is already registered!',
}

const checkPhysicalID = async (id: Meter['physical_id']) => {
    if(!!await meterServices.getMeterByPhysicalId(id))
    {
        return false;
    }
    return true;
}

export const checkMeter =async (meter: Meter) => {
    let errorVar: string = '';
    try 
    {
        if(!await checkPhysicalID(meter.physical_id))
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