import {execute} from "../utils/mysql.connector";
import {User} from "../classes/user";
import {userQueries} from "../queries/users-queries";

export const getAllUsers = async () => {
    return execute<User[]>(userQueries.getAllUsers, []);
};

export const getUserById = async (id: User['UserID']) => {
    return execute<User>(userQueries.getUserById, [id]);
};

export const getUserByEmail = async (email: User['Email']) => {
    return execute<User>(userQueries.getUserByEmail, [email]);
};

export const getLastUserID = async () => {
    return execute<User>(userQueries.getLastID, []);
};

export const insertUser = async (user: User) => {
    const result = await execute<{ affectedRows: number }>(userQueries.AddUser, [user]);
    return result.affectedRows > 0;
};

export const UpdateUser = async (user: User) => {
    const result = await execute<{ affectedRows: number }>(userQueries.UpdateUser, [
        user.RoleID,
        user.FirstName,
        user.LastName,
        user.BirthDate,
        user.AddressID,
        user.Email,
        user.PhoneNumber,
        user.Password,
        user.UserID
    ]);
    return result.affectedRows > 0;
};

export const deleteUser = async (id: User['UserID']) => {
    const result = await execute<{ affectedRows: number }>(userQueries.DeleteUserById, [id]);
    return result.affectedRows > 0;
};
