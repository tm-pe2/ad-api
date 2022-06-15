import * as contractService from '../services/contract';
import * as invoiceService from '../services/invoice';
import * as meterService from '../services/meter';
import * as consumptionService from '../services/consumption';
import * as tariffService from '../services/tariff';
import * as estimationService from '../services/estimation';
import * as planningService from '../services/planning';

import {Contract} from "../classes/contracts";
import {Invoice} from "../classes/invoice";
import {Meter} from "../classes/meters";
import {Tariff} from "../classes/tariff";
import {Estimation} from "../classes/estimation";
import {Consumption} from "../classes/consumption";
import {Planning} from "../classes/planning";

export const generateAdvanceInvoices = async (currentDate: Date) => {
    currentDate.setHours(0, 0, 0, 0);

    try {
        const activeContracts: Contract[] = await contractService.getAllActiveContracts();

        for (const contract of activeContracts) {
            const amountOfPastInvoices = monthDiff(contract.start_date, currentDate);
            const nextInvoiceDate: Date = addMonths(contract.start_date, amountOfPastInvoices);
            nextInvoiceDate.setHours(0,0,0,0);

            const timeForAdvanceInvoice = nextInvoiceDate.valueOf() === currentDate.valueOf() && amountOfPastInvoices < 11
            if (timeForAdvanceInvoice) {
                const result = await generateAdvanceInvoice(contract);
                result ? console.log("Generated invoice for contract with id: " + contract.contract_id): console.log("Failed to generate invoice for contract with id: " + contract.contract_id);
            }
        }

        return true;
    } catch (error) {
        return false;
    }
}

export const generateAnnualInvoices = async (currentDate: Date) => {
    currentDate.setHours(0,0,0,0);

    try {
        const activeContracts: Contract[] = await contractService.getAllActiveContracts();
        for (const contract of activeContracts) {
            const nearAnnualInvoiceDate: Date = addMonths(contract.start_date, 11);
            const timeForAnnualInvoice = currentDate >= nearAnnualInvoiceDate;

            if (timeForAnnualInvoice)
            {
                if (!await invoiceAlreadyExists(contract))
                {
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

const invoiceAlreadyExists = async (contract: Contract) => {
    return await invoiceService.getInvoiceByIdAndContractPeriod(contract);
}

const handleAnnualInvoice = async (contract: Contract) => {
    const meters: Meter[] = await meterService.getMetersByContractId(contract.contract_id);
    let totalConsumption = 0;

    let metersWithMissingReading: Meter[] = [];

    for (const meter of meters) {
        const consumption: Consumption = await consumptionService.getConsumptionByMeterIdAndPeriod(meter.meter_id, contract.start_date, contract.end_date);

        if (consumption != undefined) {
            totalConsumption += consumption.consumption;
        }
        else {
            metersWithMissingReading.push(meter);
        }
    }

    if (metersWithMissingReading.length > 0)
    {
        const readingPlanned = await planningService.getPlanningByContractIdAndPeriod(contract);

        if (!readingPlanned) {
            const planningEntry: Planning = {
                planning_id: -1,
                employee_id: -1,
                contract_id: contract.contract_id,
                date: contract.end_date,
                status: 0
            }

            await planningService.insertPlanning(planningEntry);
        }
    }
    else {
        await generateAnnualInvoice(contract, totalConsumption);
    }
}

const generateAnnualInvoice = async (contract: Contract, totalConsumption: number) => {
    const tariff: Tariff = await tariffService.getTariffById(contract.tariff_id);
    const price = totalConsumption * tariff.value;

    const invoice: Invoice = {
        invoice_id: -1,
        contract_id: contract.contract_id,
        supplier_id: 0, //TODO?
        creation_date: new Date(),
        due_date: addMonths(new Date(), 1),
        status_id: 0,
        price: price,
        tax: price * 0.21,
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

    return new Date(endDate);
}

export const monthDiff = (from: Date, to: Date) => {
    const years = to.getFullYear() - from.getFullYear();
    const months = to.getMonth() - from.getMonth();

    return 12 * years + months;
}
