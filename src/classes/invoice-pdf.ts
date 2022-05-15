import {Invoice} from "./invoice";
import {Customer} from "./customer";
import {Address} from "./address";
import {Estimation} from "./estimation";

export interface InvoicePdf extends Invoice, Customer, Address, Estimation {}
