import {execute} from "../utils/database-connector";
import {Customer, RegisterCustomer, RegisterUser, User, UserAddress, UserAuthInfo, UserIdRole, UserRole} from "../models/user";
import {userQueries} from "../queries/users";

export async function getUserById(id: User['id']): Promise<User | null> {
    const res = await execute(userQueries.getUserById, [id]);
    if(res.rowCount === 0) return null
    return res.rows[0] as User;
};

export async function addUser(user: RegisterUser): Promise<User['id'] | null> {
    // TODO : update
    const res = await execute(userQueries.AddUser, [
        user.first_name,
        user.last_name,
        user.birth_date,
        user.email,
        user.password,
        user.phone_number,
        user.national_registry_number
    ]);
    if(res.rowCount === 0) return null
    return res.rows[0].id;
};

export async function insertUserAddress (userAddress: UserAddress): Promise<boolean> {
    const result = await execute(userQueries.AddUserAddress, [
        userAddress.user_id,
        userAddress.address_id
    ]);
    return result.rowCount > 0;
};
export async function insertCustomer(customer: RegisterCustomer): Promise<boolean>{
    const result = await execute(userQueries.AddCustomer, [
        customer.id,
        customer.type,
    ]);

    return result.rowCount > 0;
};

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
export async function insertUserRole(userRole: UserIdRole): Promise<boolean> {
    const res = await execute(userQueries.InsertUserRole, [userRole.id, userRole.role]);
    return res.rowCount > 0;
}

