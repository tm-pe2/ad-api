import { Client, Value } from 'ts-postgres';


let client: Client;

export function init() {
    try {
        //TODO: fill out host, user...
        client = new Client({
            host: 'localhost',
            user: 'postgres', 
            password: 'postgres', 
            database: 'postgres',
            port: 5432,
        });

        client.connect();

        console.debug('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
    }
}

export function end() {
    try {
        client.end();

        console.debug('Disconnected from PostgreSQL');
    } catch (error) {
        console.error('Error disconnecting from PostgreSQL:', error);
    }
}

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */

export async function execute<T>(query: string, params: Value[]) : Promise<T> {
    try {
        if (!client) throw new Error('Databse client not initialized');

        const result : T = await client.query(query, params);

        return new Promise<T>((resolve, reject) => {
                reject(new Error('Query failed'));
                resolve(result);
        });
        
    } catch (error) {
        console.error('Problem trying to execute the query: ', error);
    }
}

/*
import {createPool, Pool} from 'mysql';


import dotenv from 'dotenv';


    dotenv.config();


let pool: Pool;

/**
 * generates pool connection to be used throughout the app
 */

/*
export const init = () => {
    try {
        pool = createPool({
            connectionLimit: 10,
            host: process.env.DB_HOST ?? '',
            //port: Number(process.env.DB_PORT),
            user: process.env.DB_USER ?? '',
            password: process.env.DB_PASSWORD ?? '',
            database: process.env.DB_DATABASE ?? ''
        });

        console.debug('MySql Adapter Pool generated successfully');
    } catch (error) {
        console.error(error);
        throw new Error('failed to initialized pool');
    }
};

export const end = () => {
    try {
    pool.end();
        console.debug('MySql Adapter Pool closed successfully');
    } catch (error) {
        console.error(error);
        throw new Error('failed to end pool');
    }
}

*/

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */

/*
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

        return new Promise<T>((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
}
*/
