const jwt = require('jsonwebtoken');
const config = require('./config');


const {PlayerModel} = require('../model/database');
const {transform} = require('../model/utils/functions');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401);
        return res.json({
            message: 'Необходима авторизация'
        })
    }

    const token = req.headers.authorization;

    jwt.verify(token, config.jwtSecret, (err, data) => {
        if (err) {
            res.status(401);
            return res.json({
                message: 'Неправильный логин или пароль'
            })
        }
        const playerId = data.sup.id;

        PlayerModel.findById(playerId)
            .then(player => {
                if (!player) {
                    res.status(401);
                    return res.json({
                        message: 'Неправильный логин или пароль'
                    })
                } else {
                    req.body.loggedInPlayer = transform(player, ['password']);
                    next();
                }
            })
    });
};