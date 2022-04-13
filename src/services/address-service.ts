import {execute} from "../utils/mysql.connector";
import {Address} from "../classes/address";
import {addressQueries} from "../queries/address-queries";

export const getAllAddresses = async () => {
    return execute<Address[]>(addressQueries.getAllAddresses, []);
};

export const getAddressById = async (id: Address['addressId']) => {
    return execute<Address>(addressQueries.getAddressById, [id]);
};

export const insertAddress = async (address: Address) => {
    const result = await execute<{ affectedRows: number }>(addressQueries.addAddress, [
        address.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const updateAddress = async (address: Address) => {
    const result = await execute<{ affectedRows: number }>(addressQueries.updateAddress, [
        address.city,
        address.street,
        address.houseNumber,
        address.postalCode,
        address.country,
        address.startDate,
        address.endDate,
        address.addressId
    ]);
    return result.affectedRows > 0;
};

export const deleteAddressById = async (id: Address['addressId']) => {
    const result = await execute<{ affectedRows: number }>(addressQueries.deleteAddressById, [id]);
    return result.affectedRows > 0;
};
