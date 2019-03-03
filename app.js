const mysql = require('mysql');
const faker = require('faker');

console.log(faker.internet.email());
const connection = mysql.createConnection({
    host: 'host.docker.internal',
    port: '33306',
    user: 'user',
    password: 'password',
    database: 'db',
});

function generateAddress() {}

const query = 'SELECT CURDATE()';

connection.query(query, (error, results, fields) => {
    if (error) throw error;

    console.log('result: ', results);
});

connection.end();
