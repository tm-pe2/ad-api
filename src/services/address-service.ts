import {execute} from "../utils/mysql.connector";
import {Address} from "../classes/address";
import {addressQueries} from "../queries/address-queries";

export const getAllAddresses = async () => {
    return execute<Address[]>(addressQueries.getAllAddresses, []);
};

export const getAddressById = async (id: Address['AdressID']) => {
    return execute<Address>(addressQueries.getAddressById, [id]);
};

export const insertAddress = async (address: Address) => {
    const result = await execute<{ affectedRows: number }>(addressQueries.addAddress, [
        address
    ]);
    return result.affectedRows > 0;
};

export const updateAddress = async (address: Address) => {
    const result = await execute<{ affectedRows: number }>(addressQueries.updateAddress, [
        address.City,
        address.Street,
        address.HouseNumber,
        address.PostalCode,
        address.Country,
        address.StartDate,
        address.EndDate,
        address.AdressID
    ]);
    return result.affectedRows > 0;
};

export const deleteAddressById = async (id: Address['AdressID']) => {
    const result = await execute<{ affectedRows: number }>(addressQueries.deleteAddressById, [id]);
    return result.affectedRows > 0;
};
