import {Contract} from "../models/contract";
import {getAllActiveContracts} from "../services/contract";
import {connectClient} from "./database-connector";
import {Invoice, INVOICE_STATUS, INVOICE_TYPE} from "../models/invoice";
import {Estimation} from "../models/estimation";
import {getEstimationById} from "../services/estimation";
import {Consumption, Meter} from "../models/consumption";
import {getInvoiceByContractIdAndPeriod, insertInvoice} from "../services/invoice";
import {getMetersByContractId} from "../services/meter";
import {getLastConsumptionByMeterId} from "../services/consumption";
import { MailService } from "../services/mail";
import { Logger } from "./logger";

export const generateInvoices = async (invoiceType: INVOICE_TYPE) => {
    const client = await connectClient();
    const activeContracts: Contract[] | null = await getAllActiveContracts(client);
    if (activeContracts) {
        handleActiveContracts(activeContracts, invoiceType);
    }
    return true;
}

const handleActiveContracts = (activeContracts: Contract[], invoiceType: INVOICE_TYPE) => {
    if (invoiceType == INVOICE_TYPE.ADVANCE) {
        handleAdvancePayments(activeContracts);
    } else {
        handleAnnualPayments(activeContracts);
    }
}

const handleAdvancePayments = async (activeContracts: Contract[]) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0)

    for (const contract of activeContracts) {
        const amountOfPastInvoices = monthDiff(contract.start_date, currentDate);
        const nextInvoiceDate: Date = addMonths(contract.start_date, amountOfPastInvoices);
        const timeForAdvanceInvoice = nextInvoiceDate.valueOf() === currentDate.valueOf() && amountOfPastInvoices < 11;
        if (timeForAdvanceInvoice) {
            try {
                await generateAdvanceInvoice(contract);
                new MailService().sendInvoice(contract.user_id)
            } catch (e) {
                Logger.error('Error when generating advance invoice for contract with id: ' + contract.id + ' -> ' + e);
            }
        }
    }
}

const handleAnnualPayments = async (activeContracts: Contract[]) => {
    const currentDate = new Date();
    for (const contract of activeContracts) {
        const nearAnnualInvoiceDate: Date = addMonths(contract.start_date, 11);
        const timeForAnnualInvoice = currentDate >= nearAnnualInvoiceDate;
        if (timeForAnnualInvoice) {
            try {
                const invoiceExists = await annualInvoiceAlreadyExists(contract)
                if (invoiceExists) {
                    return;
                }
                const totalConsumption = await getTotalConsumption(contract);
                await generateAnnualInvoice(contract, totalConsumption);

            } catch (e) {
                Logger.error('Error when generating annual invoice for contract with id: ' + contract.id + ' -> ' + e);
            }
        }
    }
}

const generateAdvanceInvoice = async (contract: Contract) => {
    const client = await connectClient();
    const estimation: Estimation | null = await getEstimationById(client, contract.estimation_id);

    if (!estimation) {
        throw new Error('Could not find estimation.');
    }

    const creationDate = new Date();
    const serviceType = contract.tariff.service_type.valueOf();

    const price = contract.tariff.value * estimation.estimated_consumption;

    let invoice: Invoice = {
        id: -1,
        contract_id: contract.id,
        supplier_id: serviceType === 1 ? 1 : 2,
        price: price,
        tax: price * 0.21,
        creation_date: creationDate,
        due_date: addMonths(creationDate, 1),
        period_start: creationDate,
        period_end: addMonths(creationDate, 1),
        status: INVOICE_STATUS.DUE,
        type: INVOICE_TYPE.ADVANCE,
        address: undefined,
        customer: undefined,
        tariff: undefined
    };

    const invoiceId = await insertInvoice(client, invoice);
    client.release();

    if (!invoiceId) {
        throw new Error('Could not insert invoice/invoice_status.');
    }
}

const generateAnnualInvoice = async (contract: Contract, totalConsumption: number) => {
    const currentDate = new Date();

    const client = await connectClient();
    const estimation: Estimation | null = await getEstimationById(client, contract.estimation_id);
    if (!estimation) {
        throw new Error('Could not find estimation while generating annual invoice for contract: ' + contract.id);
    }

    const price = totalConsumption * contract.tariff.value;
    const tax = price * 0.21
    const totalEstimations = estimation.estimated_consumption * 11
    const estimationTax = totalEstimations * 0.21;
    const endTotal = (price + tax) - (totalEstimations + estimationTax);

    const serviceType = contract.tariff.service_type.valueOf();

    const invoice: Invoice = {
        id: -1,
        contract_id: contract.id,
        supplier_id: serviceType === 1 ? 1 : 2,
        price: price,
        tax: tax,
        creation_date: currentDate,
        due_date: addMonths(currentDate, 1),
        period_start: contract.start_date,
        period_end: contract.end_date,
        status: INVOICE_STATUS.DUE,
        type: endTotal > 0 ? INVOICE_TYPE.DEBIT : INVOICE_TYPE.CREDIT,
        address: undefined,
        customer: undefined,
        tariff: undefined
    };

    const invoiceId = await insertInvoice(client, invoice);
    client.release();

    if (!invoiceId) {
        throw new Error('Could not insert invoice/invoice_status.');
    }
}

const getTotalConsumption = async (contract: Contract) => {
    const client = await connectClient();

    const meters: Meter[] | null = await getMetersByContractId(client, contract.id);
    if (!meters) {
        throw new Error('Could not find any meters linked to this contract');
    }
    let totalConsumption = 0;
    for (const meter of meters) {
        const consumption: Consumption | null = await getLastConsumptionByMeterId(client, meter.id);

        if (!consumption) {
            throw new Error('Meter with id: ' + meter.id + ' does not have valid consumption reading');
        }

        const consumptionIsValid = consumption.consumed_value > 0
            && consumption.calculated_date > contract.start_date
            && consumption.calculated_date <= contract.end_date;
        if (!consumptionIsValid) {
            throw new Error('Meter with id: ' + meter.id + ' does not have valid consumption reading');
        }
        totalConsumption += consumption.consumed_value;
    }
    return totalConsumption;
}

const annualInvoiceAlreadyExists = async (contract: Contract) => {
    const client = await connectClient();
    const invoice: Invoice | null = await getInvoiceByContractIdAndPeriod(client, contract);
    client.release();
    return invoice != null;
}

const addMonths = (date: Date, amount: number) => {
    const endDate = new Date(date.getTime());
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
