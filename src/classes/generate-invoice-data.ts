import {Customer} from "./customer";
import {Tariff} from "./tariff";
import {Contract} from "./contracts";

export interface GenerateInvoiceData extends Contract, Tariff, Customer {}
