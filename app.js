const mysql = require('mysql');
const faker = require('faker');

console.log(faker.internet.email());
const connection = mysql.createConnection({});

function generateAddress() {}
