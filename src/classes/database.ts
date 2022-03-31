import { Connection } from 'mysql';
import * as mysql from 'mysql';

export class Database {
    private connection: Connection;

    constructor()
    {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "pedb"
        });
    }

    connect(): Connection
    {
        //console.log(mysql);
        this.connection.connect(function (err: Error) {
            if (err) throw err;
        });

        return this.connection;
    }
}