import { Invoice } from '../classes/invoice';
import * as invoiceServices from '../services/invoice-service';
import * as customerServices from '../services/customer-service';
import * as supplierServices from '../services/supplier-service';

const errorList = {
    customerExists: `Customer does not exist!`,
    supplierExist: `Supplier does not exist!`,
    paymentStatus: `Invoice status is not valid!`,
    invoicePeriode: `Period of the invoice is not valid!`,
    creationDate: `Creation date is not valid!`,
    startDate: `Start date is not valid!`
}

const unpaidStatus = 1;

const checkCustomerExists = async ( id: number): Promise<boolean> => {
    if(!!await customerServices.getCustomerById(id))
    {
        return false;
    }
    return true;
}

const checkSupplierExists = async (id: number) => {
    if(!!await supplierServices.getSupplierById(id))
    {
        return false;
    }
    return true;
}

const checkInvoicePeriod = async (id: number ,startDate: Date, endDate: Date) => {
    if(!!await invoiceServices.getInvoiceByPeriod(id,startDate,endDate))
    {
        return false;
    }
    return true;
}

export const checkInvoice = async (invoice: Invoice): Promise<string> => {
    let errorVar = '';
    let todayDate = new Date;
    try 
    {
        if(!checkCustomerExists(invoice.customer_id))
        {
            errorVar = errorList.customerExists;
            throw new Error(errorList.customerExists);
        }

        if(!checkSupplierExists(invoice.supplier_id))
        {
            errorVar = errorList.supplierExist;
            throw new Error(errorList.supplierExist);
        }

        if(!checkInvoicePeriod(invoice.customer_id,invoice.start_date,invoice.end_date))
        {
            errorVar = errorList.invoicePeriode;
            throw new Error(errorList.invoicePeriode);
        }

        if( invoice.creation_date.getDate() == todayDate.getDate())
        {
            errorVar = errorList.creationDate;
            throw new Error(errorList.creationDate);
        }

        if( invoice.start_date.getDate() == todayDate.getDate())
        {
            errorVar = errorList.startDate;
            throw new Error(errorList.startDate);
        }

        if (invoice.status_id != unpaidStatus)
        {
            errorVar = errorList.paymentStatus;
            throw new Error(errorList.paymentStatus);
        }
    } 
    catch (error) {
        console.log(error);
    }

    return errorVar;
}