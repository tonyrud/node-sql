const mysql = require('mysql');
module.exports = host =>
    mysql.createConnection({
        host: host || 'host.docker.internal',
        port: process.env.DB_PORT || 33306,
        user: 'user',
        password: 'password',
        database: 'db',
    });
