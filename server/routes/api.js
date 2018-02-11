const express = require('express');
const authMiddleware = require('../auth/AuthMiddleware');
const createPlayersRouter = require('./players/players');

module.exports = () => {
    const router = express.Router();
    router.use('/api', authMiddleware);
    router.use('/api', createPlayersRouter());

    return router;
};