import {Contract} from '../classes/contracts';

const errorList = {
    customer:`Customer with this account does not exist!`,
    startDate:`Start date is not valid!`,
    activeContract:`Contract already exists!`
}

export const checkContractData =async (contract: Contract) => {
    let errorVar: string = '';
    let date = new Date();
    try 
    {
        if(contract.start_date < date)
        {
            errorVar = errorList.startDate;
            throw new Error(errorList.startDate);
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }
    
    return errorVar;
}

