import * as contractService from '../services/contract-service';
import * as invoiceService from '../services/invoice-service';
import * as meterService from '../services/meter-service';

import {Contract} from "../classes/contracts";
import {Invoice} from "../classes/invoice";

export const generateAdvanceInvoices = async (currentDate: Date) => {

    //TODO: combine invoices when customer has multiple? (map)
    currentDate.setHours(0, 0, 0, 0);

    try {
        const activeContracts: Contract[] = await contractService.getAllActiveContracts();

        activeContracts.forEach(function (contract) {
            console.log("******************" + contract.contract_id + "******************");

            const amountOfPastInvoices = monthDiff(contract.start_date, currentDate);
            console.log("past invoices: " + amountOfPastInvoices);

            const nextInvoiceDate: Date = addMonths(contract.start_date, amountOfPastInvoices);
            nextInvoiceDate.setHours(0,0,0,0);
            console.log("next invoice date is on :" + nextInvoiceDate);

            const timeForAdvanceInvoice = nextInvoiceDate.valueOf() === currentDate.valueOf() && amountOfPastInvoices < 11
            console.log("Is it time to make an advance invoice: " + (nextInvoiceDate.valueOf() === currentDate.valueOf()));
            if (timeForAdvanceInvoice) {
                console.log("Less than 11 advance invoices were sent out so let's sent one out for this month.");
                console.log("amountOfPastInvoices < 11 = " + (amountOfPastInvoices < 11));
                generateAdvanceInvoice(contract);
            }
        });

        return true;
    } catch (error) {
        return false;
    }
}

const generateAdvanceInvoice = async (contract: Contract) => {

    //TODO : get estimated_consumption from estimations table linked to contract
    // get tariff.value from tariffs table linked to contract
    // tax = ? price + (21% * price)?
    let invoice: Invoice = {
        invoice_id: -1,
        customer_id: contract.customer_id,
        supplier_id: contract.supplier_id,
        creation_date: new Date(),
        due_date: addMonths(new Date(), 1),
        status_id: 0,
        price: 0, //estimated_consumption * tariff.value * tax?
        tax: 0, // zero on estimation?
        start_date: new Date(),
        end_date: addMonths(new Date(), 1),
    };

    return await invoiceService.insertInvoice(invoice);
}

export const generateAnnualInvoices = async (currentDate: Date) => {

    //TODO: combine invoices when customer has multiple? (map)
    currentDate.setHours(0,0,0,0);

    try {
        const activeContracts: Contract[] = await contractService.getAllActiveContracts();

        activeContracts.forEach(function (contract) {
            console.log("******************" + contract.contract_id + "******************");

            const nearAnnualInvoiceDate: Date = addMonths(contract.start_date, 10);
            console.log("Nearing Annual invoice date: " + nearAnnualInvoiceDate);

            const timeForAnnualInvoice = currentDate >= nearAnnualInvoiceDate;


            if (timeForAnnualInvoice)
            {
                console.log("It's past " + nearAnnualInvoiceDate + ". It's time to try and make and annual invoice.")

                if (!invoiceAlreadyExists(contract))
                {
                    console.log("Invoice does not exist yet");
                    if (contractHasCurrentMeterReading(contract))
                    {
                        // create the annual invoice
                    }
                    else {
                        // create planning entry to get new reading
                    }
                }

            }
        });

        return true;
    }
    catch (error) {
        return false;
    }
}

const invoiceAlreadyExists = async (contract: Contract) => {
    return await invoiceService.getInvoiceByIdAndContractPeriod(contract);
}

const contractHasCurrentMeterReading = async (contract: Contract) => {
    return await meterService.getReadingByContractIdAndPeriod(contract);
}

const generateAnnualInvoice = async (contract: Contract) => {
    const invoiceGenerationData: GenerateInvoiceData = await contractService.getContractInvoiceData(contract.contract_id);

    // TODO actual consumption * tariff value - sum(past estimations)
    const endTotal = (1 * invoiceGenerationData.value) - (12 * contract.advance_payment)

    const annualInvoice: AnnualInvoice = {
        invoice_id: -1,
        contract_id: contract.contract_id,
        creation_date: new Date(),
        due_date: addMonths(new Date(), 1),
        status_id: 0,
        price: endTotal,
        start_date: new Date(),
        end_date: addMonths(new Date(), 1),
        annual_invoice_id: -1,
        actual_consumption: 0, //TODO
        advances_paid: 12 * contract.advance_payment
    };

    return await invoiceService.insertAnnualInvoice(annualInvoice);
}

//
// const getDaysInMonth = (year: number, month: number) => {
//     return new Date(year, month, 0).getDate();
// }

const addMonths = (date: Date, amount: number) => {
    const endDate = new Date(date.getTime());
    const originalTimeZoneOffset = endDate.getTimezoneOffset();

    endDate.setMonth(endDate.getMonth() + amount);

    while (monthDiff(date, endDate) > amount) {
        endDate.setDate(endDate.getDate() - 1);
    }

    const endTimeZoneOffset = endDate.getTimezoneOffset();
    const diff = endTimeZoneOffset - originalTimeZoneOffset;
    const finalDate = diff ? endDate.setMinutes(endDate.getMinutes() - diff) : endDate;

    return new Date(endDate);
}

const monthDiff = (from: Date, to: Date) => {
    const years = to.getFullYear() - from.getFullYear();
    const months = to.getMonth() - from.getMonth();

    return 12 * years + months;
}
