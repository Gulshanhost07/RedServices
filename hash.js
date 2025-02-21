const bcrypt = require('bcryptjs');
const db = require('./config/db')

const username = 'test1';
const role = 'admin';
const password = '123';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hash, role], (err, result) => {
        if (err) throw err;
        console.log('Admin created')
    });
});