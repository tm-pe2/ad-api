import { Address } from "./address";

export interface Contract {
    id: number,
    user_id: number,
    start_date: Date,
    end_date: Date,
    tariff_id: number,
    estimation_id: number,
    address: Address,
}
