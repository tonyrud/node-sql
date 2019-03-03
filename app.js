const express = require('express');
const app = express();
const connection = require('./dbConnection')();

const PORT = process.env.PORT;

const query = 'SELECT COUNT(*) FROM users';

connection.query(query, (error, results, fields) => {
    if (error) throw error;

    console.log('result: ', results);
});

connection.end();

app.get('/', (req, res) => {
    res.send('Hello from our web app!');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
