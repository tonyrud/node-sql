const express = require('express');
const { promisify } = require('util');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const connection = require('./db/dbConnection')();

const sqlQuery = promisify(connection.query).bind(connection);
const app = express();

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    const countQuery = 'SELECT COUNT(*) as count FROM users';
    const [usersCount] = await sqlQuery(countQuery);

    res.render('home', { count: usersCount.count });
});

app.post('/register', async (req, res) => {
    const email = req.body.email;
    await sqlQuery('INSERT INTO users SET ?', { email });
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
