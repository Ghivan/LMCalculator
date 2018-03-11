import ActionTypes from './PlayerActionTypes';

export const authorize = token => ({
    type: ActionTypes.AUTHORIZE,
    payload: {
        token
    }
});

export const logout = () => ({
    type: ActionTypes.LOGOUT
});

export const fetchDetails = details => ({
    type: ActionTypes.FETCH_DETAILS,
    payload: {
        details
    }
});

export const updateStats = stats => ({
    type: ActionTypes.UPDATE_STATS,
    payload: {
        stats
    }
});

export const updateSpeedUps = (speedUps) => ({
    type: ActionTypes.UPDATE_SPEED_UPS,
    payload: {
        speedUps
    }
});

export default {
    login: (credentials) => {
        return (dispatch, getState, api) => {
            return api.auth.login(credentials)
                .then(response => {
                    if (response.token) {
                        dispatch(authorize(response.token));
                    } else {
                        throw new Error('Ошибка авторизации')
                    }
                })
                .catch(err => {
                    api.error.setError(err.message);
                    if (err.status === 401) dispatch(logout());
                })
        };
    },

    validate: token => {
        return (dispatch, getState, api) => {
            return api.auth.verify(token)
                .then(response => {
                    if (response.isValid) {
                        dispatch(authorize(token));
                    } else {
                        throw new Error('Срок сессии истек. Пожалуйста, авторизируйтесь')
                    }
                })
                .catch(err => {
                    api.error.setError(err.message);
                    dispatch(logout());
                })
        };
    },

    fetchDetails: id => {
        return (dispatch, getState, api) => {
            return api.players.getDetails(getState().player.token, id)
                .then(response => {
                    dispatch(fetchDetails(response));
                })
                .catch(err => {
                    api.error.setError(err.message);
                    if (err.status === 401) dispatch(logout());
                })
        };
    },

    logout: () => {
        return dispatch => {
            dispatch(logout());
        }
    },

    updateStats: stats => {
        return (dispatch, getState, api) => {
            return api.players.updatePlayersStats(getState().player.token, stats)
                .then(response => {
                    dispatch(updateStats(response));
                })
                .catch(err => {
                    api.error.setError(err.message);
                    if (err.status === 401) dispatch(logout());
                })
        };
    },

    updateSpeedUps: (type, speedUps) => {
        return (dispatch, getState, api) => {
            return api.players.updatePlayersSpeedUps(getState().player.token, type, speedUps)
                .then(response => {
                    dispatch(updateSpeedUps(response));
                })
                .catch(err => {
                    api.error.setError(err.message);
                    if (err.status === 401) dispatch(logout());
                })
        };
    }
};