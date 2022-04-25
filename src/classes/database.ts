import {Connection} from 'mysql';
var mysql = require('mysql');

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
        this.connection.connect(function (err: Error) {
            if (err) {
                console.log("error occured while connecting");
                return;
            }
        });

        return this.connection;
    }
}