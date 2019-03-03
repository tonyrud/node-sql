const faker = require('faker');
const connection = require('./dbConnection');

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    let createTodos = `create table if not exists users(
        email VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW()
    )`;

    connection.query(createTodos, function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        console.log('created users table');
    });

    // connection.end(function(err) {
    //     if (err) {
    //         return console.log(err.message);
    //     }
    // });
    var users = [];
    for (var i = 0; i < 500; i++) {
        users.push([faker.internet.email(), faker.date.past()]);
    }

    const query = 'INSERT INTO users (email, created_at) VALUES ?';

    connection.query(query, [users], (error, results, fields) => {
        if (error) throw error;

        console.log('result: ', results);
    });
    connection.end();
});
