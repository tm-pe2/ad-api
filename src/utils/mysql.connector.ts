import { Pool } from 'pg';

let pool : Pool;

export function init() {
    try {
        const credentials = {
            user: "ad",
            host: "10.97.0.10",
            database: "TestADwebsite",
            password: "Ad2022%",
            port: 5432,
        };

        pool = new Pool(credentials);
        console.log("Connection established succesfully");
    } catch (error) {
        console.error("Error trying to connect: ", error);
    }
}

export function end() {
    try {
        pool.end()

        console.log("Connection closed succesfully");
    } catch (error) {
        console.error("Error trying to end connection: ", error);
    }
}


export const execute = <T>(query: string, params: any[] = []): Promise<T> => {
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

        return new Promise((resolve, reject) => {
            pool.query(query, params, (error, results: any) => {
                if (error)
                    reject(error);
                else
                    resolve(results);
            });
        });

    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
}
