import {Contract} from '../classes/contracts';
import * as contractService from '../services/contract-service';
import * as addressServices from '../services/address-service';
import * as customerService from '../services/customer-service';

const errorList = {
    customer:`Customer with this account does not exist!`,
    startDate:`Start date is not valid!`,
    activeContract:`Contract already exists!`
}

const checkActiveContract = async (contract: Contract) => {
    const result =  await contractService.getContractsByCustomerAndAddressID(contract.customer_id,contract.contract_type,contract.address_id,contract.end_date);
    if(result.length > 0)
    {
        return false;
    }
    return true;
}

const checkCustomerExists = async (id:number): Promise<boolean> => {
    if(!!await customerService.getCustomerById(id))
    {
        return false;
    }
    return true;
}

const checkDate = (startDate: Date) => {
    let date = new Date();
    if(startDate < date)
    {
        return false;
    }
    return true;
}

export const checkContractData =async (contract: Contract): Promise<string> => {
    let errorVar: string = '';
    try 
    {
        if(!await checkActiveContract(contract))
        {
            errorVar = errorList.activeContract;
            throw new Error(errorList.activeContract);
        }

        if(!await checkCustomerExists(contract.customer_id))
        {
            errorVar = errorList.customer;
            throw new Error(errorList.customer);
        }

        if(!checkDate(contract.start_date))
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

