const mysql = require('mysql');

class ConnectionFactory {
    constructor() {

        this._connection;
    }

    on(MultQuery) {

        let mltQry = MultQuery ? true : false;

        if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {

            this._connection = mysql.createConnection({
                multipleStatements: mltQry,
                host: 'localhost',
                port: '8889',
                user: 'root',
                password: 'root',
                database: 'titullo'
            });
        }

        return this._connection;
    }

    off() {

        this._connection.end();
    }
}

module.exports = ConnectionFactory;