import * as contractService from '../services/contract-service';
import * as invoiceService from '../services/invoice-service';
import * as meterService from '../services/meter-service';
import * as consumptionService from '../services/consumption-service';
import * as tariffService from '../services/tariff-service';
import * as estimationService from '../services/estimation-service';

import {Contract} from "../classes/contracts";
import {Invoice} from "../classes/invoice";
import {Meter} from "../classes/meters";
import {Tariff} from "../classes/tariff";
import {Estimation} from "../classes/estimation";
import {Consumption} from "../classes/consumption";

export const generateAdvanceInvoices = async (currentDate: Date) => {
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
            console.log("Is it time to make an advance invoice: " + timeForAdvanceInvoice);
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
    const tariff: Tariff = await tariffService.getTariffById(contract.tariff_id);
    const estimation: Estimation = await estimationService.getEstimationById(contract.estimation_id);

    let invoice: Invoice = {
        invoice_id: -1,
        contract_id: contract.contract_id,
        supplier_id: 0, // TODO?
        creation_date: new Date(),
        due_date: addMonths(new Date(), 1),
        status_id: 0,
        price: tariff.value * estimation.estimated_consumption,
        tax: tariff.value * estimation.estimated_consumption * 0.21,
        period_start: new Date(),
        period_end: addMonths(new Date(), 1),
        tariff_rate: tariff.value
    };

    return await invoiceService.insertInvoice(invoice);
}

export const generateAnnualInvoices = async (currentDate: Date) => {
    currentDate.setHours(0,0,0,0);

    try {
        const activeContracts: Contract[] = await contractService.getAllActiveContracts();

        for (const contract of activeContracts) {
            console.log("******************" + contract.contract_id + "******************");

            const nearAnnualInvoiceDate: Date = addMonths(contract.start_date, 10);
            console.log("Nearing Annual invoice date: " + nearAnnualInvoiceDate);

            const timeForAnnualInvoice = currentDate >= nearAnnualInvoiceDate;

            if (timeForAnnualInvoice)
            {
                console.log("It's past " + nearAnnualInvoiceDate + ". It's time to try and make and annual invoice.")

                if (!await invoiceAlreadyExists(contract))
                {
                    console.log("invoice does not exist yet");
                    await handleAnnualInvoice(contract);
                }
            }
        }

        return true;
    }
    catch (error) {
        return false;
    }
}

const invoiceAlreadyExists = async (contract: Contract) => {
    return await invoiceService.getInvoiceByIdAndContractPeriod(contract);
}

const handleAnnualInvoice = async (contract: Contract) => {
    const meters: Meter[] = await meterService.getMetersByContractId(contract.contract_id);
    let totalConsumption = 0;

    console.log("got meter data");
    let metersWithMissingReading: Meter[] = [];

    for (const meter of meters) {
        const consumption: Consumption = await consumptionService.getConsumptionByMeterIdAndPeriod(meter.meter_id, contract.start_date, contract.end_date);

        console.log("got consumption: " + consumption);
        if (consumption != undefined) {
            totalConsumption += consumption.consumption;
        }
        else {
            metersWithMissingReading.push(meter);
        }
    }

    if (metersWithMissingReading.length > 0)
    {
        for (const meter of metersWithMissingReading) {
            console.log("create planning entry for meter");
            //TODO
        }
    }
    else {
        await generateAnnualInvoice(contract, totalConsumption);
    }
}

const generateAnnualInvoice = async (contract: Contract, totalConsumption: number) => {
    const tariff: Tariff = await tariffService.getTariffById(contract.tariff_id);

    const invoice: Invoice = {
        invoice_id: -1,
        contract_id: contract.contract_id,
        supplier_id: 0, //TODO?
        creation_date: new Date(),
        due_date: addMonths(new Date(), 1),
        status_id: 0,
        price: totalConsumption * tariff.value,
        tax: totalConsumption * tariff.value * 0.21,
        tariff_rate: tariff.value,
        period_start: contract.start_date,
        period_end: contract.end_date
    };

    return await invoiceService.insertInvoice(invoice);
}

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

export const monthDiff = (from: Date, to: Date) => {
    const years = to.getFullYear() - from.getFullYear();
    const months = to.getMonth() - from.getMonth();

    return 12 * years + months;
}
