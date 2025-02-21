const express = require('express');
const session = require('express-session');
const mySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');
const path = require('path');

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'assets')));

const sessionStore = new mySQLStore({}, db);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 1000*60*60*2 }
}));

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminSelection');

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/home', (req, res) => {
    res.render('home');
});



app.use('/', authRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});