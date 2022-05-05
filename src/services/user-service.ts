import {execute} from "../utils/mysql.connector";
import {User} from "../classes/user";
import {userQueries} from "../queries/users-queries";

export const getAllUsers = async () => {
    return execute<User[]>(userQueries.getAllUsers, []);
};

export const getUserById = async (id: User['user_id']) => {
    return execute<User>(userQueries.getUserById, [id]);
};

export const getUserByEmail = async (email: User['email']) => {
    const result = await execute<User[]>(userQueries.getUserByEmail, [email], "rows")

    return result[0];
};

export const getLastUserID = async () => {
    return execute<User>(userQueries.getLastID, []);
};

export const insertUser = async (user: User) => {
    const result = await execute<{ rows: any }>(userQueries.AddUser, [
        user.role_id,
        user.first_name,
        user.last_name,
        user.birth_date,
        user.address_id,
        user.email,
        user.phone_number,
        user.password,
        user.national_registry_number
    ]);

    return result.rows[0].user_id;
};

export const updateUser = async (user: User) => {
    const result = await execute<{ rowCount: number }>(userQueries.UpdateUser, [
        user.role_id,
        user.first_name,
        user.last_name,
        user.birth_date,
        user.address_id,
        user.email,
        user.phone_number,
        user.password,
        user.user_id
    ]);
    return result.rowCount > 0;
};

export const deleteUser = async (id: User['user_id']) => {
    const result = await execute<{ rowCount: number }>(userQueries.DeleteUserById, [id]);
    return result.rowCount > 0;
};
