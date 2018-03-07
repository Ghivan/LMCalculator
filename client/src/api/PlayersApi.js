import {makeGetRequestWithHeaders, makeRequestWithBody} from './utils/functions'

const PLAYERS_API_URL = '/api/players/';

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
    }
};

export default PlayersAPI;
