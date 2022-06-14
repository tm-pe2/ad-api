import { Address } from "./address";
import { CustomerType, UserRole } from "./user";

export interface Consumption{
    id: number,
    consumed_value: number,
    calculate_date: Date,
    customer: {
        id: number,
        first_name: string,
        last_name: string,
        birth_date: Date,
        email: string,
        phone_number: string,
        national_registry_number: string,
        customer_type: CustomerType,
        active: boolean,
        roles: UserRole[],
    },
    address: Address,
    meter: {
        id: number,
        meter_type: string,
        physical_id: string,
        index_value: number,
        read_date: Date,
    }

    
}

export interface ConsumptionPost {
    consumed_value: number,
    calculated_date: Date,
    meter_id: number,
}