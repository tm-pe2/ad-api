import { Address } from "cluster";

export interface Planning {
    id: number,
    user: {
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        address: Address,
    },
    contract_id: number,
    date: Date,
    status: PlanningStatus,
}

export enum PlanningStatus {
    SCHEDULED = 1,
    DONE = 2,
}
