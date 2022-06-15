import {execute} from "../utils/database-connector";
import { User, UserAuthInfo, UserIdRole} from "../models/user";
import {userQueries} from "../queries/users";
import { PoolClient } from "pg";

export async function getUserById(client: PoolClient,id: User['id']): Promise<User | null> {
    const res = await execute(client,userQueries.getUserById, [id]);
    if(res.rowCount === 0) return null
    return res.rows[0] as User;
};

export async function addUser(client:PoolClient, user: User): Promise<User['id'] | null> {
    // TODO : update
    const res = await execute(client,userQueries.AddUser, [
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

export async function insertUserAddress (client: PoolClient, user_id: number, address_id: number): Promise<boolean> {
    const result = await execute(client,userQueries.AddUserAddress, [user_id, address_id]);
    return result.rowCount > 0;
};


export async function getUserAuthInfoById(client:PoolClient,id: number): Promise<UserAuthInfo | null> {
    const res = await execute(client,userQueries.getUserAuthInfoById, [id]);
    if (res.rowCount === 0) return null;
    return {
        id: res.rows[0].id,
        email: res.rows[0].email,
        password: res.rows[0].password,
        roles: res.rows[0].roles
    }
}

export async function getUserAuthInfoByEmail(client:PoolClient,email: string): Promise<UserAuthInfo | null> {
    const res = await execute(client,userQueries.getUserAuthInfoByEmail, [email]);
    if (res.rowCount === 0) return null;
    return {
        id: res.rows[0].id,
        email: res.rows[0].email,
        password: res.rows[0].password,
        roles: res.rows[0].roles
    }
}
export async function insertUserRole(client:PoolClient, user_id: number, role_id: number): Promise<boolean> {
    const res = await execute(client,userQueries.InsertUserRole, [user_id, role_id]);
    return res.rowCount > 0;
}

