const express = require('express');

const {PlayerModel} = require('../../../model/database');
const {SPEED_UPS_TIME_TYPES, SPEED_UPS_SOURCE_TYPES} = require('../../../model/constants/Player').SPEED_UPS;

module.exports = () => {
    const router = express.Router();

    router.put('/stats', (req, res) => {

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
                if (!stats) {
                    res.status(400);
                    res.send({
                        message: 'Данные не переданы!'
                    });
                    res.end();
                }

                const {training, building, research} = req.body.stats;
                let errorMessage = '';

                if (training) {
                    if (typeof training === 'number') {
                        player.stats.training = training
                    } else {
                        errorMessage += 'Значение скорости тренировки должно быть числом. '
                    }
                }

                if (building) {
                    if (typeof building === 'number') {
                        player.stats.building = building
                    } else {
                        errorMessage += 'Значение скорости строительства должно быть числом. '
                    }
                }

                if (research) {
                    if (typeof research === 'number') {
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

    router.put('/bag/speedups', (req, res) => {

        PlayerModel.findById(req.body.loggedInPlayer.id)
            .then(player => {
                if (!player) {
                    res.status(404);
                    res.send({
                        message: 'Игрок не найден'
                    });
                    res.end();
                }


                const {speedUps, type} = req.body;
                let errors = [];

                if (!speedUps || !type) {
                    res.status(400);
                    res.send({
                        message: 'Данные не переданы!'
                    });
                    res.end();
                }

                if (!Array.isArray(speedUps)) {
                    res.status(400);
                    res.send({
                        message: 'SpeedUps should be array!'
                    });
                    res.end();
                }

                speedUps.map(speedUp => {
                    if (!SPEED_UPS_TIME_TYPES[speedUp.name]) {
                        errors.push(`${speedUp.name} is not valid speedup name type!`);
                    }
                    if (typeof speedUp.quantity !== 'number') {
                        errors.push('Quantity should be a number!')
                    }
                });

                if (!SPEED_UPS_SOURCE_TYPES[type]) {
                    errors.push(`${type} is not valid speedup type!`);
                }

                if (errors.length > 0) {
                    res.status(400);
                    res.send({
                        message: errors.join(' ')
                    });
                    res.end();
                } else {
                    player.bag.speedUps = {
                        ...player.bag.speedUps,
                        [type]: speedUps
                    };
                    return player.save().then(updatedPlayer => {
                        res.json(updatedPlayer.bag.speedUps)
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