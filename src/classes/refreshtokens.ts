import { execute } from "../utils/database-connector";
import { refreshtokenQueries } from "../queries/refreshtoken-queries";
import { v4 as uuid } from 'uuid';
import Joi from "joi";

export interface RefreshTokenData {
    refreshToken: string,
    userId: number
    expires: Date
}

const refreshExpireTime = 604800; // 7 days

export class RefreshToken {
    static add(userId: number, refreshToken: string): Promise<void> {
        let expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + refreshExpireTime);

        return new Promise<void>((resolve, reject) => {
            execute<{ rowCount: number }>(refreshtokenQueries.addToken, [
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

    static get(token: string): Promise<RefreshTokenData> {
        return new Promise<RefreshTokenData>((resolve, reject) => {
            execute<{ rows: RefreshTokenData[] }>(refreshtokenQueries.getTokenByToken, [token])
                .then((result) => {
                    if (result.rows.length > 0) {
                        resolve(result.rows[0]);
                    }
                    else {
                        reject("No refresh token found");
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    static delete(token: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            execute<{ rowCount: number }>(refreshtokenQueries.deleteToken, [token])
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    static create(userId: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const token = uuid();
            RefreshToken.add(userId, token)
                .then(() => {
                    resolve(token);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
