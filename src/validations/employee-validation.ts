import {User} from '../classes/user';
import * as userServices from '../services/user-service';

const errorList = {
    nationalNumber:`A user with this national number already exists!`,
    roleID: `Given role is not valid!`
}

const checkNationalNumber = async (nationalNumber: string): Promise<boolean> => {
    if(!!await userServices.getUserByNationalNumber(nationalNumber))
    {
        return false;
    }
    return true;
}

export const checkEmployeeData = async (user: User): Promise<string> => {
    let errorVar: string = '';
    try 
    {
        if(!await checkNationalNumber(user.national_registry_number))
        {
            errorVar = errorList.nationalNumber;
            throw new Error(errorList.nationalNumber);
        }

        if( user.role_id != 2)
        {
            errorVar = errorList.roleID;
            throw new Error(errorList.roleID);
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }
    
    return errorVar;
}