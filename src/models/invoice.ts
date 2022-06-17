import {Address} from "./address";
import { ServiceType } from "./estimation";
import { Customer, CustomerType } from "./user";

export interface Invoice {
    id: number,
    contract_id: number,
    supplier_id: number,
    price: number,
    tax: number,
    creation_date: Date,
    due_date: Date,
    period_start: Date,
    period_end: Date,
    status: INVOICE_STATUS,
    type: INVOICE_TYPE,
    address?: Address,
    customer?: Customer,
    tariff?: Tariff,
}

interface Tariff {
    id: number,
    customer_type: CustomerType,
    service_type: ServiceType,
    value: number,
}

export enum INVOICE_TYPE {
    ADVANCE = 1,
    DEBIT,
    CREDIT,
}

export enum INVOICE_STATUS {
    DUE = 1,
    LATE,
    PAID,
}

export interface InvoicesStatuses {
    invoice_id: number,
    status_id: INVOICE_STATUS
}
