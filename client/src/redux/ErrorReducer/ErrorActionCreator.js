import ActionTypes from './ErrorActionTypes';

export const setError = message => ({
    type: ActionTypes.SET_ERROR,
    payload: {
        message
    }
});

export const clearError = () => ({
    type: ActionTypes.CLEAR_ERROR
});

export default {
    setError: (message) => {
        return dispatch => {
            dispatch(setError(message));
            setTimeout(() => dispatch(clearError()), 2000);
        }
    },

    clearError: () => {
        return dispatch => {
            dispatch(clearError());
        }
    }
};