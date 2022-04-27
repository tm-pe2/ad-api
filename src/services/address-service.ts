import {execute} from "../utils/mysql.connector";
import {Address} from "../classes/address";
import {addressQueries} from "../queries/address-queries";

export const getAllAddresses = async () => {
    let addresses = execute<{rows: Address[]}>(addressQueries.getAllAddresses, []);
    console.log(addresses);
    return (await addresses).rows;
};

export const getAddressById = async (id: Address['AdressID']) => {
    let answer =  execute<{rows: Address}>(addressQueries.getAddressById, [id]);
    console.log(answer);
    return (await answer).rows;
};

export const insertAddress = async (address: Address) => {
    const result = await execute<{ rowCount: number }>(addressQueries.addAddress, [
        address
    ]);
    return result.rowCount > 0;
};

export const updateAddress = async (address: Address) => {
    const result = await execute<{ rowCount: number }>(addressQueries.updateAddress, [
        address.City,
        address.Street,
        address.HouseNumber,
        address.PostalCode,
        address.Country,
        address.StartDate,
        address.EndDate,
        address.AdressID
    ]);
    return result.rowCount > 0;
};

export const deleteAddressById = async (id: Address['AdressID']) => {
    const result = await execute<{ rowCount: number }>(addressQueries.deleteAddressById, [id]);
    return result.rowCount > 0;
};
