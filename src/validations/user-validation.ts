import {User} from '../classes/user';
import * as addressServices from '../services/address-service';
import * as userServices from '../services/user-service';

const errorList = {
    email:`A user with this email already exists!`,
    address:`A user with this address already exists!`,
    nationalNumber:`A user with this national number already exists!`,
}

const checkEmail = async (email: string): Promise<boolean> => {
    if(!!await userServices.getUserByEmail(email))
    {
        return false;
    }
    return true;
}

const checkAddress = async (city: string, street: string, hose_number: string, postal_code: string, country: string): Promise<boolean> => {
    if(!!await addressServices.getAddressByDetails(city,street,hose_number,postal_code,country))
    {
        return false;
    }
    return true;
}

const checkNationalNumber = async (nationalNumber: string): Promise<boolean> => {
    if(!!await userServices.getUserByNationalNumber(nationalNumber))
    {
        return false;
    }
    return true;
}


export const checkUserData = async (user: User): Promise<string> => {
    let errorVar: string = '';
    try 
    {
        if(!await checkEmail(user.email))
        {
            errorVar = errorList.email;
            throw new Error(errorList.email);
        }

        if(!await checkNationalNumber(user.national_registry_number))
        {
            errorVar = errorList.nationalNumber;
            throw new Error(errorList.nationalNumber);
        }

        if(!await checkAddress(user.city, user.street, user.house_number, user.postal_code, user.country))
        {
            errorVar = errorList.address;
            throw new Error(errorList.address);
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }
    
    return errorVar;
}