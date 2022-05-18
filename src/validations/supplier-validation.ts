import { Supplier } from '../classes/supplier';
import * as supplierServices from '../services/supplier-service';
import * as addressServices from '../services/address-service';

const errorList = {
    address:`A supplier with this address already exists!`,
    vatNumber:`A supplier with this VAT number already exists!`,
}

export const checkSupplier = async (supplier: Supplier) => {
    let errorVar: string = '';
    try 
    {
        if(!await addressServices.getAddressByDetails(supplier.city,supplier.street,supplier.house_number,supplier.postal_code,supplier.country))
        {
            errorVar = errorList.address;
        }

        if(!supplierServices.getSupplierByVAT(supplier.vat_number))
        {
            errorVar = errorList.vatNumber;
        }
    } 
    catch (error) 
    {   
        console.log(error);
    }

    return errorVar;
}