import {makeGetRequestWithHeaders, makeRequestWithBody} from './utils/functions'
import {PLAYERS_API_URL} from "./constants/constants";



const PlayersAPI = {
    getDetails: (token, id) => {
        return makeGetRequestWithHeaders(`${PLAYERS_API_URL}${id}`, {
            'Authorization': token
        })
    },

    createNewPlayer: (token, credentials) => {
        return makeRequestWithBody(PLAYERS_API_URL, 'POST', credentials, {
            'Authorization': token
        })
    },

    updatePlayersStats: (token, stats) => {
        return makeRequestWithBody(`${PLAYERS_API_URL}/stats`, 'PUT', {stats}, {
            'Authorization': token
        })
    },

    updatePlayersSpeedUps: (token, type, speedUps) => {
        return makeRequestWithBody(`${PLAYERS_API_URL}/bag/speedups`, 'PUT', {type, speedUps}, {
            'Authorization': token
        })
    },

    updatePlayersResources: (token, type, packs) => {
        return makeRequestWithBody(`${PLAYERS_API_URL}/bag/resources`, 'PUT', {type, packs}, {
            'Authorization': token
        })
    },
};

export default PlayersAPI;
