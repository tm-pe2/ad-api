import { TABLES } from "./tables";

export const refreshtokenQueries = {
    getTokenByToken: `
        SELECT * FROM ${TABLES.REFRESHTOKENS} WHERE token = $1
    `,

    addToken: `
        INSERT INTO ${TABLES.REFRESHTOKENS} (token, user_id, expiry_date)
        VALUES ($1, $2, $3)
    `,

    deleteToken: `
        DELETE FROM ${TABLES.REFRESHTOKENS} WHERE token = $1
    `
};
