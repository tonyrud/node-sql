const mysql = require('mysql');
module.exports = mysql.createConnection({
    host: 'host.docker.internal',
    port: process.env.DB_PORT,
    user: 'user',
    password: 'password',
    database: 'db',
});
