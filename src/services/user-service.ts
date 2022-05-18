import {execute} from "../utils/mysql.connector";
import {User} from "../classes/user";
import {userQueries} from "../queries/users-queries";

export const getAllUsers = async () => {
    return await execute<User[]>(userQueries.getAllUsers, [], "rows");
};

export const getUserById = async (id: User['user_id']) => {
    const users = await execute<User[]>(userQueries.getUserById, [id], "rows");
    return users[0];
};

export const getUserByEmail = async (email: User['email']) => {
    const result = await execute<User[]>(userQueries.getUserByEmail, [email], "rows")
    return result[0];
};


export const getUserByNationalNumber = async (nationalNumber: User['national_registry_number']) => {
    const users = await execute<User[]>(userQueries.getUserByNationalNumber, [nationalNumber], "rows");

    return users[0];
};

export const addUser = async (user: User) => {
    const newUser = await execute<User[]>(userQueries.AddUser, [
        user.role_id,
        user.first_name,
        user.last_name,
        user.birth_date,
        user.email,
        user.phone_number,
        user.password,
        user.national_registry_number
    ], "rows");

    return newUser[0].user_id;
};

export const updateUser = async (user: User) => {
    const rowCount = await execute<number>(userQueries.UpdateUser, [
        user.role_id,
        user.first_name,
        user.last_name,
        user.birth_date,
        user.email,
        user.phone_number,
        user.password,

        user.user_id
    ], "rowCount");

    return rowCount > 0;
};

export const deleteUser = async (id: User['user_id']) => {
    const rowCount = await execute<number>(userQueries.DeleteUserById, [id], "rowCount");

    return rowCount > 0;
};
