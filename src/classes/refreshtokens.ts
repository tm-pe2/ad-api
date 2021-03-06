import { commit, execute, rollback } from "../utils/database-connector";
import { v4 as uuid } from 'uuid';
import Joi from "joi";
import { DatabaseError, PoolClient } from "pg";
import { refreshtokenQueries } from "../queries/refreshtoken";

export interface RefreshTokenData {
    refreshToken: string,
    userId: number
    expires: Date
}

const refreshExpireTime = 604800; // 7 days

export class RefreshToken {
    static add(client:PoolClient, userId: number, refreshToken: string): Promise<void> {
        let expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + refreshExpireTime);

        return new Promise<void>((resolve, reject) => {
            execute(client,refreshtokenQueries.addToken, [
                refreshToken,
                userId,
                expirationDate,
            ])
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static get(client:PoolClient,token: string): Promise<RefreshTokenData> {
        return new Promise<RefreshTokenData>((resolve, reject) => {
            execute(client,refreshtokenQueries.getTokenByToken, [token])
                .then((result) => {

                    if (result.rows.length > 0) {
                        commit(client);
                        resolve(result.rows[0]);
                    }
                    else {
                        rollback(client)
                        reject("No refresh token found");
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    static delete(client:PoolClient,token: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            execute(client,refreshtokenQueries.deleteToken, [token])
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    static create(client:PoolClient,userId: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const token = uuid();
            RefreshToken.add(client,userId, token)
                .then(() => {
                    commit(client);
                    resolve(token);
                })
                .catch((err) => {
                    rollback(client);
                    reject(err);
                });
        });
    }
}
