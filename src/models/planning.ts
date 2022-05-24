export interface Planning {
    id: number,
    user_id: number, // can be removed from table. We can query it from contracts.
    contract_id: number,
    date: Date,
    status: PlanningStatus,
}

export enum PlanningStatus {
    // shrug
}
