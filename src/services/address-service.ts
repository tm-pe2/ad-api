import {execute} from "../utils/mysql.connector";
import {Address} from "../classes/address";
import {addressQueries} from "../queries/address-queries";

export const getAllAddresses = async () => {
    return await execute<Address[]>(addressQueries.getAllAddresses, [], "rows");
};

export const getAddressById = async (id: Address['address_id']) => {
    const addresses = await execute<Address[]>(addressQueries.getAddressById, [id], "rows");

    return addresses[0];
};

export const insertAddress = async (address: Address) => {
    const rowCount = await execute<number>(addressQueries.addAddress, [
        address.city,
        address.street,
        address.house_number,
        address.postal_code,
        address.country,
        address.start_date,
        address.end_date,
    ], "rowCount");

    return rowCount > 0;
};

export const updateAddress = async (address: Address) => {
    const rowCount = await execute<number>(addressQueries.updateAddress, [
        address.city,
        address.street,
        address.house_number,
        address.postal_code,
        address.country,
        address.start_date,
        address.end_date,

        address.address_id
    ], "rowCount");

    return rowCount > 0;
};

export const deleteAddressById = async (id: Address['address_id']) => {
    const rowCount = await execute<number>(addressQueries.deleteAddressById, [id], "rowCount");

    return rowCount > 0;
};
