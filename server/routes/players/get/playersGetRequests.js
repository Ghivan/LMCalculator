const express = require('express');

const {PlayerModel} = require('../../../model/database');
const {transform} = require('../../../model/utils/functions');
const {AccessPermission, checkPlayerAccessRights} = require('../../../auth/utils/checkAccessRights');

module.exports = () => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
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

    router.get('/:id', (req, res, next) => {
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
    return router;
};