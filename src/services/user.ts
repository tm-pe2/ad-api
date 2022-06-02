import {execute} from "../utils/database-connector";
<<<<<<< HEAD
import {Customer, RegisterCustomer, RegisterUser, User, UserAddress} from "../models/user";
import {userQueries} from "../queries/users-queries";

export const getUserById = async (id: User['id']) => {
    const users = await (await execute(userQueries.getUserById, [id])).rows as User[];
    return users[0];
};

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

    return newUser.rows[0].id;
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
=======
import {User, UserAuthInfo} from "../models/user";
import {userQueries} from "../queries/users";

export async function getUserAuthInfoById(id: number): Promise<UserAuthInfo | null> {
    const res = await execute(userQueries.getUserAuthInfoById, [id]);
    if (res.rowCount === 0) return null;
    return {
        id: res.rows[0].id,
        email: res.rows[0].email,
        password: res.rows[0].password,
        roles: res.rows[0].roles
    }
}

export async function getUserAuthInfoByEmail(email: string): Promise<UserAuthInfo | null> {
    const res = await execute(userQueries.getUserAuthInfoByEmail, [email]);
    if (res.rowCount === 0) return null;
    return {
        id: res.rows[0].id,
        email: res.rows[0].email,
        password: res.rows[0].password,
        roles: res.rows[0].roles
    }
}
>>>>>>> rewriteApi
