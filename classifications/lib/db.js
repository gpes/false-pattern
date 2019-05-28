const { Pool } = require('pg');
const connString = 'postgres://postgres:12345@localhost:5432/classification';
// const connString = process.env.DATABASE_URL;

let single_connection;

module.exports = app => {
    if(!single_connection){
        const pool = new Pool({
            connectionString: connString
        })

        single_connection = pool;

        return single_connection;
    }

    return single_connection;
}