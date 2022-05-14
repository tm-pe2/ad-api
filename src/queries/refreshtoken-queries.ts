export const refreshtokenQueries = {
    getTokenByToken: `
        SELECT * FROM refreshtokens WHERE token = $1
    `,

    addToken: `
        INSERT INTO refreshtokens (token, user_id, expiry_date)
        VALUES ($1, $2, $3)
    `,

    deleteToken: `
        DELETE FROM refreshtokens WHERE token = $1
    `
};
