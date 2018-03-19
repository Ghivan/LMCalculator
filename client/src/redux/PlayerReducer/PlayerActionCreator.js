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

export const updateResources = (packs) => ({
    type: ActionTypes.UPDATE_RESOURCES,
    payload: {
        packs
    }
});

export default {
    login: (credentials) => {
        return (dispatch, getState, api) => {
            api.loader.setLoader();
            return api.auth.login(credentials)
                .then(response => {
                    api.loader.removeLoader();
                    if (response.token) {
                        dispatch(authorize(response.token));
                    } else {
                        throw new Error('Ошибка авторизации')
                    }
                })
                .catch(err => {
                    api.loader.removeLoader();
                    api.error.setError(err.message);
                    if (err.status === 401) dispatch(logout());
                })
        };
    },

    validate: token => {
        return (dispatch, getState, api) => {
            api.loader.setLoader();
            return api.auth.verify(token)
                .then(response => {
                    api.loader.removeLoader();
                    if (response.isValid) {
                        dispatch(authorize(token));
                    } else {
                        throw new Error('Срок сессии истек. Пожалуйста, авторизируйтесь')
                    }
                })
                .catch(err => {
                    api.loader.removeLoader();
                    api.error.setError(err.message);
                    dispatch(logout());
                })
        };
    },

    fetchDetails: id => {
        return (dispatch, getState, api) => {
            api.loader.setLoader();
            return api.players.getDetails(getState().player.token, id)
                .then(response => {
                    api.loader.removeLoader();
                    dispatch(fetchDetails(response));
                })
                .catch(err => {
                    api.loader.removeLoader();
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
            api.loader.setLoader();
            return api.players.updatePlayersStats(getState().player.token, stats)
                .then(response => {
                    api.loader.removeLoader();
                    dispatch(updateStats(response));
                })
                .catch(err => {
                    api.loader.removeLoader();
                    api.error.setError(err.message);
                    if (err.status === 401) dispatch(logout());
                })
        };
    },

    updateSpeedUps: (type, speedUps) => {
        return (dispatch, getState, api) => {
            api.loader.setLoader();
            return api.players.updatePlayersSpeedUps(getState().player.token, type, speedUps)
                .then(response => {
                    api.loader.removeLoader();
                    dispatch(updateSpeedUps(response));
                })
                .catch(err => {
                    api.loader.removeLoader();
                    api.error.setError(err.message);
                    if (err.status === 401) dispatch(logout());
                })
        };
    },

    updateResources: (type, packs) => {
        return (dispatch, getState, api) => {
            api.loader.setLoader();
            return api.players.updatePlayersResources(getState().player.token, type, packs)
                .then(response => {
                    api.loader.removeLoader();
                    console.log(response);
                    dispatch(updateResources(response));
                })
                .catch(err => {
                    api.loader.removeLoader();
                    api.error.setError(err.message);
                    if (err.status === 401) dispatch(logout());
                })
        };
    }
};