import { Supplier } from '../classes/supplier';
import * as supplierServices from '../services/supplier-service';
import * as addressServices from '../services/address-service';

const errorList = {
    address:`A supplier with this address already exists!`,
    vatNumber:`A supplier with this VAT number already exists!`,
}

const checkAddress = async (city: string, street: string, hose_number: string, postal_code: string, country: string): Promise<boolean> => {
    if(!!await addressServices.getAddressByDetails(city,street,hose_number,postal_code,country))
    {
        return false;
    }
    return true;
}

const checkVatNumber = async (vat: string) => {
    if(!!supplierServices.getSupplierByVAT(vat))
    {
        return false;
    }
    return true;
}

export const checkSupplier = async (supplier: Supplier) => {
    let errorVar: string = '';
    try 
    {
        if(!await checkAddress(supplier.city,supplier.street,supplier.house_number,supplier.postal_code,supplier.country))
        {
            errorVar = errorList.address;
            throw new Error(errorList.address);
        }

        if(!await checkVatNumber(supplier.vat_number))
        {
            errorVar = errorList.vatNumber;
            throw new Error(errorList.vatNumber);
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }
    
    return errorVar;
}