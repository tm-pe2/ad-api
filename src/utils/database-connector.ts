import dotenv from 'dotenv';
import { Pool, PoolClient, QueryResult } from 'pg';
import path from 'path';
import { Logger } from './logger';

if (process.env.NODE_ENV == 'test') {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });
}
else {
    dotenv.config();
}

let pool : Pool;

export function init() {
    try {

        const credentials = {
            user: process.env.DB_USER ?? '',
            host: process.env.DB_HOST ?? '',
            database: process.env.DB_DATABASE ?? '',
            password: process.env.DB_PASSWORD ?? '',
            port: Number(process.env.DB_PORT),
        };

        pool = new Pool(credentials);
        Logger.info("Connection established succesfully");
    } catch (error) {
        Logger.error("Error trying to connect: ", error);
    }
}

export async function connectClient(): Promise<PoolClient> {
    return await pool.connect();
}

export function end() {
    try {
        pool.end()

        Logger.info("Connection closed succesfully");
    } catch (error) {
        Logger.error("Error trying to end connection: ", error);
    }
}


export const execute = (client: PoolClient,query: string, params: any[] = []): Promise<QueryResult<any>> => { // TODO change any to T of table
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

        return new Promise<QueryResult<any>>((resolve, reject) => {
            client.query(query, params, (error, results: QueryResult) => {
                if (error)
                    reject(error);
                else
                    resolve(results);
            });
        });

    } catch (error) {
        Logger.error('[Database connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
}

export async function begin() {
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
        const client = await connectClient();
        return new Promise<PoolClient>((resolve, reject) => {
            client.query('BEGIN', (error, results: QueryResult) => {
                if (error)
                    reject(error);
                else
                    resolve(client);
            });
        });

    } catch (error) {
        Logger.error('[Database connector][begin][Error]: ', error);
        throw new Error('failed to begin transaction');
    }
}

export async function commit(client:PoolClient){
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
        return new Promise<PoolClient>((resolve, reject) => {
            client.query('COMMIT', (error, results: QueryResult) => {
                if (error)
                    reject(error);
                else
                    resolve(client);
            });
        });

    } catch (error) {
        Logger.error('[Database connector][commit][Error]: ', error);
        throw new Error('failed to commit transaction');
    }
}

export async function rollback(client:PoolClient){
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');
        return new Promise<PoolClient>((resolve, reject) => {
            client.query('ROLLBACK', (error, results: QueryResult) => {
                if (error)
                    reject(error);
                else
                    resolve(client);
            });
        });

    } catch (error) {
        Logger.error('[Database connector][rollback][Error]: ', error);
        throw new Error('failed to rollback transaction');
    }
}
