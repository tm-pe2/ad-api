/** source/controllers/clients.ts */
import {execute} from "../utils/mysql.connector";
import {Address} from "../classes/address";
import {AddressQueries} from "../queries/addressQueries";

export const getAllAddresses = async () => {
    return execute<Address[]>(AddressQueries.getAllAddresses, []);
};

export const getAddressById = async (id: Address['AdressID']) => {
    return execute<Address>(AddressQueries.getAddressById, [id]);
};

export const insertAddress = async (address: Address) => {
    const result = await execute<{ affectedRows: number }>(AddressQueries.addAddress, [address]);
    return result.affectedRows > 0;
};

export const updateAddress = async (address: Address) => {
    const result = await execute<{ affectedRows: number }>(AddressQueries.updateAddress, [
        address.getCity,
        address.getStreet,
        address.getHouseNumber,
        address.getPostalCode,
        address.getCountry,
        address.getAddressID
    ]);
    return result.affectedRows > 0;
};

export const deleteAddressById = async (id: Address['AdressID']) => {
    const result = await execute<{ affectedRows: number }>(AddressQueries.deleteAddressById, [id]);
    return result.affectedRows > 0;
};
