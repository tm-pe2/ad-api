import {execute} from "../utils/database-connector";
import {UserAddress} from '../classes/user-addresses';
import {userAdressQueries} from '../queries/user-address-queries';

export const getAllUserAddresses = async () => {
    return await execute<UserAddress[]>(userAdressQueries.getAllUserAddresses, [], "rows");
};

export const getAddressIdByUserId = async (id: UserAddress['user_id']) => {
    return await execute<UserAddress[]>(userAdressQueries.getAddressIdByUserId, [id], "rows");
};

export const insertUserAddress = async (userAddress: UserAddress) => {
    const rowCount = await execute<number>(userAdressQueries.addUserAddress, [
        userAddress.user_id,
        userAddress.address_id
    ], "rowCount");

    return rowCount;
};

export const updateUserAddress = async (userAddress: UserAddress) => {
    const rowCount = await execute<number>(userAdressQueries.addUserAddress, [
        userAddress.user_id,
        userAddress.address_id
    ], "rowCount");

    return rowCount;
}

export const deleteUserAddress = async (id: UserAddress['user_id']) => {
    const rowCount = await execute<number>(userAdressQueries.deleteUserAddress, [id], "rowCount");
    return rowCount > 0;
}
