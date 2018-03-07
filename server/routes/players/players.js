const express = require('express');
const bcrypt = require('bcrypt');

const {PlayerModel} = require('../../model/database');
const {transform} = require('../../model/utils/functions');
const {AccessPermission, checkPlayerAccessRights} = require('../../auth/utils/checkAccessRights');
const {PASSWORD_LENGTH} = require('./helpers/constants')


module.exports = () => {
    const router = express.Router();

    router.get('/players', (req, res, next) => {
        const accessGranted = checkPlayerAccessRights(AccessPermission.ADMIN, req);
        if (!accessGranted) {
            res.status(403);
            return res.json({
                message: 'Доступ запрещен'
            })
        }

        PlayerModel.find({})
            .then(players => res.send(players.map(player => transform(player, ['password']))), next);

    });

    router.get('/players/:id', (req, res, next) => {
        const id = req.params.id;
        const accessGranted = checkPlayerAccessRights(AccessPermission.REQUESTING_PLAYER, req);
        if (!accessGranted) {
            res.status(403);
            return res.json({
                message: 'Доступ запрещен'
            })
        }

        PlayerModel.findById(id)
            .then(player => {
                if (!player) {
                    res.status(404);
                    res.json({
                        message: 'Игрок не найден'
                    })
                }
                res.json(transform(player, ['password', 'role', 'id']))
            })
            .catch(err => {
                res.status(500);
                res.json({
                    message: 'Ошибка запроса'
                })
            });

    });

    router.post('/players', (req, res) => {
        const accessGranted = checkPlayerAccessRights(AccessPermission.ADMIN, req);
        if (!accessGranted) {
            res.status(403);
            return res.json({
                message: 'Доступ запрещен'
            })
        }

        const {nickname, password} = req.body;

        if (!nickname || !password) {
            res.status(400);
            return res.send({
                message: 'Имя игрока или пароль не должны быть пустыми'
            });
        }

        if (password.length < PASSWORD_LENGTH) {
            res.status(400);
            return res.send({
                message: 'Длина пароля должна быть не менее 6 символов'
            });
        }

        PlayerModel.findOne({nickname})
            .then(player => {
                if (player) {
                    res.status(400);
                    return res.send({
                        message: 'Игрок с таким именем уже существует'
                    });
                }
                bcrypt.hash(password, 10, (err, hash) => {
                    if (!err) {
                        const newPlayer = new PlayerModel({
                            nickname,
                            password: hash
                        });

                        newPlayer.save()
                            .then(player => {
                                if (player) {
                                    res.send(transform(player, ['password']))
                                }
                            })
                            .catch(err => {
                                if (err.code === 11000) {
                                    res.status(400);
                                    res.send({
                                        message: 'Игрок с таким именем уже существует'
                                    });
                                } else {
                                    res.status(500);
                                    res.send({
                                        message: 'Database connection problems'
                                    });
                                }

                            })

                    } else {
                        res.status(500);
                        res.json({message: 'Password encryption error'});
                    }
                })
            });
    });

    router.put('/players/stats', (req, res, next) => {
        const accessGranted = checkPlayerAccessRights(AccessPermission.REQUESTING_PLAYER, req);
        if (!accessGranted) {
            res.status(403);
            return res.json({
                message: 'Доступ запрещен'
            })
        }

        PlayerModel.findById(req.body.loggedInPlayer.id)
            .then(player => {
                if (!player) {
                    res.status(404);
                    res.send({
                        message: 'Игрок не найден'
                    });
                    res.end();
                }


                const {stats} = req.body;
                if (!stats){
                    res.status(400);
                    res.send({
                        message: 'Данные не переданы!'
                    });
                    res.end();
                }

                const {training, building, research} = req.body.stats;
                let errorMessage = '';

                if (training) {
                    if (typeof training === 'number'){
                        player.stats.training = training
                    } else {
                        errorMessage += 'Значение скорости тренировки должно быть числом. '
                    }
                }

                if (building) {
                    if (typeof building === 'number'){
                        player.stats.building = building
                    } else {
                        errorMessage += 'Значение скорости строительства должно быть числом. '
                    }
                }

                if (research) {
                    if (typeof research === 'number'){
                        player.stats.research = research
                    } else {
                        errorMessage += 'Значение скорости исследования должно быть числом. '
                    }
                }

                if (errorMessage) {
                    res.status(400);
                    res.send({
                        message: errorMessage
                    });
                } else {
                    return player.save().then(player => {
                        res.json(player.stats)
                    })
                }
            })
            .catch(err => {
                res.status(500);
                res.send({
                    message: err.message
                });
            });

    });

    return router;
};