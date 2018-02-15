const {Strategy} = require('passport-local');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('./config');
const {throwAuthError} = require('./utils/ErrorGenerator');
const {PlayerModel} = require('../model/database');
const {ROLES} = require('../model/constants/');

module.exports = new Strategy({
    usernameField: 'nickname',
    passwordField: 'password',
    session: false
}, (nickname, password, done) => {
    PlayerModel.findOne({nickname})
        .then(player => {
            if (!player) {
                throwAuthError();
            }

            return bcrypt.compare(password, player.password)
                .then(isMatched => {
                    if (!isMatched) {
                        throwAuthError();
                    }

                    const data = {
                        sup: {
                            id: player.id,
                            isAdmin: (player.role === ROLES.ADMIN)
                        }
                    };

                    jwt.sign(data, config.jwtSecret, (err, token) => {
                        if (!err) {
                            done(null, token);
                        } else {
                            done(err)
                        }
                    });
                })
        })
        .catch(err => done(err));
});