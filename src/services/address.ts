import {execute} from "../utils/database-connector";
import {addressQueries} from "../queries/address-queries";
import { QueryResult } from "pg";
import { Address } from "../models/address";



export const insertAddress = async (address: Address) => {
    const newAddress = await execute(addressQueries.addAddress, [
        address.city_id,
        address.street,
        address.house_number,
        address.country
    ]);

    return newAddress.rows[0].address_id;
};

export const getCityIDByPostalCode = async (postalCode: string) => {
    const cityID = await execute(addressQueries.getCityIDByPostalCode, [postalCode]);
    return cityID.rows[0].city_id;
}
