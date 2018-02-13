const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../auth/config');

module.exports = () => {
    const router = express.Router();

    router.post('/auth/login', (req, res, next) => {
        passport.authenticate('local-login', (err, token) => {
            if (err) {
                res.status(400);
                return res.json({
                    message: err.message
                });
            }

            return res.json({token});
        })(req, res, next);
    });

    router.post('/auth/verify', (req, res) => {
        jwt.verify(req.body.token, config.jwtSecret, (err) => {
            if (err) {
                res.json({
                    isValid: false
                })
            } else {
                res.json({
                    isValid: true
                })
            }

        })
    });

    return router;
};