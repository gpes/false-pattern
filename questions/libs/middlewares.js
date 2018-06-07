const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

module.exports = app => {
    app.set('port', process.env.PORT || 3000);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '..', 'views'));

    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressValidator());
    app.use(morgan('dev'));
    app.use(helmet());
}