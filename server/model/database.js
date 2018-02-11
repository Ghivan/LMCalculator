const mongoose = require('mongoose');
const PlayerSchema = require('./schemas/Player');

const DBNames = {
    PLAYERS: 'players'
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECTION || 'mongodb://localhost/LMCalculator')
    .catch(err => console.warn(err.message));

const PlayerModel = mongoose.model(DBNames.PLAYERS, PlayerSchema)


module.exports = {
    PlayerModel
};
