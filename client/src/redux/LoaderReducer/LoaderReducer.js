import ActionTypes from './LoaderActionTypes';

const initialState = {
    display: false
};

const reducerSetLoader = (state, action) => {
    return {
        ...state,
        display: true
    }
};

const reducerRemoveLoader = state => {
    return {
        ...state,
        display: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_LOADER:
            return reducerSetLoader(state, action);
        case ActionTypes.REMOVE_LOADER:
            return reducerRemoveLoader(state, action);
        default:
            return state
    }
};