const express = require('express');

const {PlayerModel} = require('../../model/database');
const {ROLES} = require('../../model/constants');

module.exports = () => {
    const router = express.Router();

    router.get('/players', (req, res, next) => {
        const accessGranted = (req.body.loggedInPlayer.role === ROLES.ADMIN || req.body.loggedInPlayer.role === ROLES.OWNER);
        if (accessGranted) {
            PlayerModel.find({})
                .then(players => res.send(players), next);
        } else {
            res.status(403);
            return res.json({
                message: 'Доступ запрещен'
            })
        }
    });

    router.get('/players/:id', (req, res, next) => {
        const id = req.params.id;
        const accessGranted = (
            req.body.loggedInPlayer.id === id ||
            req.body.loggedInPlayer.role === ROLES.OWNER ||
            req.body.loggedInPlayer.role === ROLES.ADMIN
        );
        if (accessGranted) {
            PlayerModel.findById(id)
                .then(player => res.send(player), next);
        } else {
            res.status(403);
            return res.json({
                message: 'Доступ запрещен'
            })
        }
    });

    router.post('/players', (req, res, next) => {
        PlayerModel.find({}).then(players => res.send(players), next);
    });

    return router;
};