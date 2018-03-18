import ActionTypes from './LoaderActionTypes';

export const setLoader = () => ({
    type: ActionTypes.SET_LOADER
});

export const removeLoader = () => ({
    type: ActionTypes.REMOVE_LOADER
});

export default {
    setLoader: () => {
        return dispatch => {
            dispatch(setLoader())
        }
    },
    removeLoader: () => {
        return dispatch => {
            return dispatch(removeLoader())
        }
    }
};