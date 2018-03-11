const mongoose = require('mongoose');
const PlayerSchema = require('./schemas/Player');

const DBNames = {
    PLAYERS: 'players'
};

const MONGO_URL = "mongodb://localhost/lm-calculator";

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECTION || MONGO_URL)
    .catch(err => console.warn(err.message));

const PlayerModel = mongoose.model(DBNames.PLAYERS, PlayerSchema);


module.exports = {
    PlayerModel
};
