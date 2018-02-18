const express = require('express');
const bcrypt = require('bcrypt');

const {PlayerModel} = require('../../model/database');
const {transform} = require('../../model/utils/functions');
const {AccessPermission, checkPlayerAccessRights} = require('../../auth/utils/checkAccessRights')


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
            .then(player => res.send(transform(player, ['password', 'role', 'id'])), next);

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

        if (!nickname || !password){
            res.status(400);
            return res.send({
                message: 'Имя игрока или пароль не должны быть пустыми'
            });
        }

        if (password.length < 6){
            res.status(400);
            return res.send({
                message: 'Длина пароля должна быть не менее 6 символов'
            });
        }

        PlayerModel.findOne({nickname})
            .then(player => {
               if (player){
                   res.status(400);
                   return res.send({
                       message: 'Игрок с таким именем уже существует'
                   });
               }
                bcrypt.hash(password, 10, (err, hash) => {
                    if (!err){
                        const newPlayer = new PlayerModel({
                            nickname,
                            password: hash
                        });

                        newPlayer.save()
                            .then(player => {
                                if (player){
                                    res.send(transform(player,['password']))
                                }
                            })
                            .catch(err => {
                                if (err.code === 11000){
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

    return router;
};