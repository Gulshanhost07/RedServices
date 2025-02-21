const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const user = result[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    req.session.loggedin = true;
                    req.session.username = user.username;
                    req.session.role = user.role;
                    res.redirect('/admin/dashboard');
                } else {
                    res.send('Incorrect Password!');
                }
            });
        } else {
            res.send('Username does not exist!');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

module.exports = router;