import { Address } from "./address";

export interface Supplier{
    id?: number,
    company_name: string,
    vat_number: string,
    address: Address,
    service_type: string,
}