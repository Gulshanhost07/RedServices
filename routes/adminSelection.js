const express = require("express");
const db = require("../config/db");

const router = express.Router();

function isLoggedIn(req, res, next) {
    if (req.session.loggedin) {
        return next();
    } else {
        res.redirect('/login');
    }
}

router.get('/dashboard', isLoggedIn, (req, res) => {
    if (req.session.role === 'admin') {
        const sql = "SELECT * FROM lost_luggage";

        db.query(sql, (err, results) => {
            if (err) {
                console.error("Database error: " + err.message);
                return res.status(500).json({ error: "Database error" });
            }

            res.render('adminDashboard', { 
                username: req.session.username, 
                lostLuggage: results 
            });
        });
    } else {
        res.render('userDashboard', { username: req.session.username });
    }
});

module.exports = router;
