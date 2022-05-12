import { execute } from "../utils/mysql.connector";
import { refreshtokenQueries } from "../queries/refreshtoken-queries";
import Joi from "joi";

export class RefreshToken {

    static addRefreshToken(userId: number, refreshToken: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            execute<{ rowCount: number }>(refreshtokenQueries.addToken, [
                refreshToken,
                userId,
                new Date(),
            ])
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

    static getRefreshToken(token: string): Promise<RefreshTokenData> {
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

    static deleteRefreshToken(userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            execute<{ rowCount: number }>(refreshtokenQueries.deleteTokenByUserId, [userId])
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export interface RefreshTokenData {
    refreshToken: string,
    userId: number
    expires: Date
}

// export const addressSchema = Joi.object({
//     id: Joi.number().integer().min(0).required(),
//     token: Joi.string().required(),
//     user_id: Joi.number().integer().min(0).required(),
//     expiry_date: Joi.date()
// });
