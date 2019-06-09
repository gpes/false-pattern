const { Pool } = require('pg');

module.exports = app => {
    let connString;

    if(process.env.NODE_ENV == 'production') {
        connString = process.env.DATABASE_URL;
    } else if(process.env.NODE_ENV === 'docker') {
        connString = 'postgres://postgres:12345@classification-db:5432/classification';
    } else {
        connString = 'postgres://postgres:12345@localhost:5432/classification';
    } 
    
    let single_connection;

    if(!single_connection){
        const pool = new Pool({
            connectionString: connString
        })

        single_connection = pool;

        return single_connection;
    }

    return single_connection;
}