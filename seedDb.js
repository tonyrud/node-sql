const faker = require('faker');
const connection = require('./dbConnection')('localhost');
const { promisify } = require('util');

const totalUsers = +process.argv[2] || 500;

const mysqlQuery = promisify(connection.query).bind(connection);

connection.connect(async function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    const dropTable = `DROP TABLE users`;
    await mysqlQuery(dropTable);

    console.log('dropped users table');

    const createUsersTable = `create table if not exists users(
        email VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW()
    )`;

    await mysqlQuery(createUsersTable);

    console.log('created users table');

    const users = [...Array(totalUsers)].map(i => {
        return [faker.internet.email(), faker.date.past()];
    });

    const insertUsers = 'INSERT INTO users (email, created_at) VALUES ?';

    await mysqlQuery(insertUsers, [users]);

    console.log(`${totalUsers} users added`);

    connection.end();
});
