const express = require('express');

const updateRequestsRouter = require('./put/playerPutRequests');
const getRequestsRouter = require('./get/playersGetRequests');
const postRequestsRouter = require('./post/playerPostRequests');

module.exports = () => {
    const router = express.Router();

    router.use('/players', getRequestsRouter());
    router.use('/players', updateRequestsRouter());
    router.use('/players', postRequestsRouter());

    return router;
};