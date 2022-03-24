import {Connection} from 'mysql';
//var mysql = require('mysql');
import * as mysql from 'mysql';

export class Database {
    private connection: Connection;

    constructor()
    {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "Webuser",
            password: "Lab2021",
            database: "webshop"
        });
    }

    connect(): Connection
    {
        console.log(mysql);
        this.connection.connect(function (err: Error) {
            if (err) {
                console.log("error occured while connecting");
                return;
            }
        });

        return this.connection;
    }
}