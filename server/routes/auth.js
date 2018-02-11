const express = require('express');
const passport = require('passport');

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

    return router;
};