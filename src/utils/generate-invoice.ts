import * as contractService from '../services/contract-service';
import {GenerateInvoiceData} from '../classes/generate-invoice-data'
import * as invoiceService from '../services/invoice-service';
import {AdvanceInvoice} from '../classes/advance-invoice';
import {AnnualInvoice} from '../classes/annual-invoice';

export async function generateEstimationInvoices(currentDate: Date)  {
    currentDate.setHours(0,0,0,0);

    try {
        const estimationInvoices: GenerateInvoiceData[] = await contractService.getAllActiveContracts();

        estimationInvoices.forEach(function (invoiceData) {
            console.log(invoiceData.start_date);

            const amountOfPastInvoices = monthDiff(invoiceData.start_date, currentDate);

            const nextDate: Date = addMonths(invoiceData.start_date, amountOfPastInvoices)
            nextDate.setHours(0,0,0,0);

            console.log("next invoice data is on :" + nextDate);

            if (nextDate.valueOf() === currentDate.valueOf()) {
                if (amountOfPastInvoices % 12 == 0) { //TODO OR == contract.end_date ?
                    console.log("Generate annual invoice")
                   //createAnnualInvoice(invoiceData);
                }
                console.log("Generate estimation invoice");
                //createEstimationInvoice(invoiceData);
            }
        });

        return true;
    }
    catch (error) {
        return false;
    }
}

async function createAdvanceInvoice(estimationInvoiceData: GenerateInvoiceData) {
    let advanceInvoice: AdvanceInvoice = {
        invoice_id: -1,
        customer_id: estimationInvoiceData.customer_id,
        creation_date: new Date(),
        due_date: addMonths(new Date(), 1),
        status_id: 0,
        price: estimationInvoiceData.advance_payment * estimationInvoiceData.value,// advance_payment = estimated consumption?
        start_date: new Date(),
        end_date: addMonths(new Date(), 1),
        tariff_id: estimationInvoiceData.tariff_id,
        contract_id: estimationInvoiceData.contract_id,
        advance_invoice_id: -1,
        estimated_consumption: estimationInvoiceData.advance_payment
    };

    return await invoiceService.insertAdvanceInvoice(advanceInvoice);
}

async function createAnnualInvoice(estimationInvoiceData: GenerateInvoiceData) {
    let annualInvoice: AnnualInvoice = {
        invoice_id: -1,
        customer_id: estimationInvoiceData.customer_id,
        creation_date: new Date(),
        due_date: addMonths(new Date(), 1),
        status_id: 0,
        price: 0, // TODO actual consumption * tariff value - sum(past estimations)
        start_date: new Date(),
        end_date: addMonths(new Date(), 1),
        tariff_id: estimationInvoiceData.tariff_id,
        contract_id: estimationInvoiceData.contract_id,
        annual_invoice_id: -1,
        actual_consumption: 0, //TODO
        advances_paid: 0 //TODO sum(past estimations)
    };

return await invoiceService.insertAnnualInvoice(annualInvoice);
}

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
}

function addMonths(date: Date, amount: number) {
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

function subtractYears(numOfYears: number, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);

    return date;
}

function monthDiff(from: Date, to: Date) {
    const years = to.getFullYear() - from.getFullYear();
    const months = to.getMonth() - from.getMonth();
    return 12 * years + months;
}

function getTotalEstimations(contract_id: number) {

}
