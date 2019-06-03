const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
// const expressValidator = require('express-validator');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const path = require('path');
// const passport = require('passport')
// const cookieSession = require('cookie-session')

module.exports = app => {
    app.set('port', process.env.PORT || 3000);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'views'));

    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    // app.use(expressValidator());
    // app.use(cookieSession({
    //     maxAge: 24 * 60 * 60 * 1000,
    //     keys: ['appbsied21jis090ss']
    // }));
    app.use(expressSession({
        secret: 'appbsied',
        resave: true,
        saveUninitialized: true
    }));
    // app.use(passport.initialize())
    // app.use(passport.session())
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }))
}