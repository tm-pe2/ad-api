import {execute} from "../utils/database-connector";
import { PoolClient, QueryResult } from "pg";
import {addressQueries} from "../queries/address";
import { Address } from "../models/address";



export const insertAddress = async (client:PoolClient, address: Address) => {
    const newAddress = await execute(client,addressQueries.addAddress, [
        address.street,
        address.house_number,
        address.city_id,
        address.country
    ]);

    return newAddress.rows[0].id;
};

export const getCityIDByPostalCode = async (client: PoolClient, postalCode: string) => {
    const cityID = await execute(client,addressQueries.getCityIDByPostalCode, [postalCode]);
    return cityID.rows[0].id;
}

export async function getUserIdFromAddressId(client: PoolClient, addressId: number): Promise<number | null> {
    const userId = await execute(client,addressQueries.getUserIdFromAddress, [addressId]);
    if (userId.rowCount === 0) return null;
    return userId.rows[0].user_id;
}
