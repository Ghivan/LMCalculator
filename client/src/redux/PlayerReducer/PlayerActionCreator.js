import ActionTypes from './PlayerActionTypes';

export const authorize = token => ({
    class: ActionTypes.AUTHORIZE,
    payload: {
        token
    }
});

export const logout = () => ({
    class: ActionTypes.LOGOUT
});

export const fetchDetails = details => ({
    class: ActionTypes.FETCH_DETAILS,
    payload: {
        details
    }
});

export default {
    login: (credentials) => {
        return (dispatch, getState, api) => {
            return api.auth.login(credentials)
                .then(response => {
                    dispatch(authorize(response.token));
                })
                .catch(err => {
                    api.error.setError(err.message)
                })
        };
    },

    validate: token => {
        return (dispatch, getState, api) => {
            return api.auth.verify(token)
                .then(response => {
                    if (response.isValid){
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
                })
        };
    },

    logout: () => {
        return dispatch => {
            dispatch(logout());
        }
    }
};