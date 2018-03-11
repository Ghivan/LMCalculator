const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const localLoginStrategy = require('./auth/LocalLoginStrategy');
const createAuthRouter = require('./routes/auth');
const createApiRouter = require('./routes/api');

const app = express();

const corsOptions = {
    origin:'*'
};

app.use(cors(corsOptions));

passport.use('local-login', localLoginStrategy);
app.use(passport.initialize());

app.use(bodyParser.json());


app.use(createAuthRouter());
app.use(createApiRouter());

module.exports = app;