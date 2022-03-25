import * as mysql from 'mysql';

export class Database {
    private connection: mysql.Connection;

    constructor()
    {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "pedb"
        });
    }

    connect(): mysql.Connection
    {
        //console.log(mysql);
        this.connection.connect(function (err: Error) {
            if (err) {
                console.log("error occured while connecting");
                return;
            }
        });

        return this.connection;
    }
}