import {execute} from "../utils/database-connector";
import { Customer } from "../models/user";
import { PoolClient } from "pg";
import { contractQueries } from "../queries/contract";
import { Contract } from "../models/contract";
import { MeterType, ServiceType } from "../models/estimation";
import { meterQueries } from "../queries/meters";

export async function addNewMeter(client:PoolClient,
    contractId: number, meterType: MeterType): Promise<number | null> {
    const meterRes = await execute(client, meterQueries.insertMeter, [
        meterType
    ]);
    if (meterRes.rowCount === 0) return null;

    const contractRes = await execute(client, meterQueries.insertContractMeter, [
        contractId, meterRes.rows[0].id
    ]);
    if (contractRes.rowCount === 0) return null;

    return meterRes.rows[0].id;
}
