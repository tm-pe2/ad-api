import {execute} from "../utils/database-connector";
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
