import {execute} from "../utils/database-connector";
import {Customer, RegisterCustomer, RegisterUser, User, UserAddress} from "../models/user";
import {userQueries} from "../queries/users-queries";



export const addUser = async (user: RegisterUser) => {
    // TODO : update
    const newUser = await execute(userQueries.AddUser, [
        user.first_name,
        user.last_name,
        user.birth_date,
        user.email,
        user.password,
        user.phone_number,
        user.national_registry_number
    ]);

    return newUser.rows[0].user_id;
};

export const insertUserAddress = async (userAddress: UserAddress) => {
    const result = await execute(userQueries.addUserAddress, [
        userAddress.user_id,
        userAddress.address_id
    ]);

    return result.rowCount > 0;
};
export const insertCustomer = async (customer: RegisterCustomer) => {
    const result = await execute(userQueries.AddCustomer, [
        customer.id,
        customer.type,
    ]);

    return result.rowCount > 0;
};
