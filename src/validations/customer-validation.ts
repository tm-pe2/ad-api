import {Customer} from '../classes/customer';
import * as customerServices from '../services/customer-service';

const errorList = {
    customer:`A customer with this account already exists!`,
}

const checkUser = async (id:number): Promise<boolean> => {
    if(!!await customerServices.getCustomerByUserId(id))
    {
        return false;
    }
    return true;
}

export const checkCustomerData = async (id: Customer['user_id']): Promise<string> => {
    let errorVar: string = '';
    try 
    {
        if(!await checkUser(id))
        {
            errorVar = errorList.customer;
            throw new Error(errorList.customer);
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }
    
    return errorVar;
}