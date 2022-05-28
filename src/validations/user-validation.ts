import {User} from '../classes/user';
import * as addressServices from '../services/address';
import * as userServices from '../services/user';

const errorList = {
    email:`A user with this email already exists!`,
    address:`A user with this address already exists!`,
    nationalNumber:`A user with this national number already exists!`,
}

export const checkUserData = async (user: User) => {
    let errorVar: string = '';
    try 
    {
        if(!!await userServices.getUserByEmail(user.email))
        {
            errorVar = errorList.email;
        }

        if(!!await userServices.getUserByNationalNumber(user.national_registry_number))
        {
            errorVar = errorList.nationalNumber;
        }

        if(!!await addressServices.getAddressByDetails(user.city, user.street, user.house_number, user.postal_code, user.country))
        {
            errorVar = errorList.address;
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }
    
    return errorVar;
}
