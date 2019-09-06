const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool( database );

pool.getConnection( (err, connection) =>{
    
    if (err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.error("Se cerró la conexión con la base de datos");
        }

        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error("La base de datos tiene muchas conexiones");
        }

        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión de la base de datos fue rechazada');
        }

    }

    if (connection){
        connection.release();
    }

    console.log('DB is Connected');
    return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;