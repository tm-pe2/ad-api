import { Customer } from "./user";
import {Address} from "./address";

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
