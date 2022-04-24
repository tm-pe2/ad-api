import { Pool } from "mysql";

const { Pool } = require("pg");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "nodedemo",
  password: "yourpassword",
  port: 5432,
};

let pool : Pool;

// Connect with a connection pool.

async function poolDemo() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

export function init() {
    try {
        const credentials = {
            user: "postgres",
            host: "localhost",
            database: "nodedemo",
            password: "yourpassword",
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
// Use a self-calling function so we can use async / await.

(async () => {
  const poolResult = await poolDemo();
  console.log("Time with pool: " + poolResult.rows[0]["now"]);

  const clientResult = await clientDemo();
  console.log("Time with client: " + clientResult.rows[0]["now"]);
})();

/*
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

/*

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
} */

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
