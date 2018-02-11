const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const localLoginStrategy = require('./auth/LocalLoginStrategy');
const createAuthRouter = require('./routes/auth');
const createApiRouter = require('./routes/api');

const app = express();
passport.use('local-login', localLoginStrategy);
app.use(passport.initialize());

app.use(express.static('public'));
app.use(bodyParser.json());


app.use(createAuthRouter());
app.use(createApiRouter());

module.exports = app;