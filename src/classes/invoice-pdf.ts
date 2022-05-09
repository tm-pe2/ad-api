import {Customer} from "./customer";
import {Invoice} from "./invoice";

export interface InvoicePdf extends Invoice, Customer {}
