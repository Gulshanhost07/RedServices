const express = require('express');
const session = require('express-session');
const mySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');
const path = require('path');
const luggageRoutes = require("./routes/lost_luggage");
const updateStatusRoutes = require("./routes/updateStatus");
const statusRoutes = require("./routes/status");

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'assets')));

const sessionStore = new mySQLStore({}, db);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
}));

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminSelection');

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/luggage', (req, res) => {
    res.render('luggage');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/status', (req, res) => {
    res.render('status');
});

app.get('/thankyou', (req, res) => {
    res.render('thankyou');
});

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', luggageRoutes);
app.use("/", updateStatusRoutes);
app.use("/", statusRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
