const express = require('express');
const consign = require('consign');

const app = express();

consign()
    .include('lib/middlewares.js')
    .then('lib/db.js')
    .then('repositories')
    .then('services')
    .then('controllers')
    .then('routes')
    .then('lib/boot.js')
    .into(app);