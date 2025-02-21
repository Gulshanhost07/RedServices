const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
    if (req.session.loggedin) {
        return next();
    } else {
        res.redirect('/login');
    }
}

router.get('/dashboard', isLoggedIn, (req, res) => {
    const role = req.session.role;
    let dashboardView;

    if (role === 'admin') {
        dashboardView = 'adminDashboard';
    } else {
        dashboardView = 'userDashboard';
    }

    res.render(dashboardView, { username: req.session.username });
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { username: req.session.username, role: req.session.role });
});

module.exports = router;