import ActionTypes from './ErrorActionTypes';

const initialState = {
    message: ''
};

const reducerSetError = (state, action) => {
    return {
        ...state,
        message: action.payload.message
    }
};

const reducerClearError = state => {
    return {
        ...state,
        message: ''
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_ERROR:
            return reducerSetError(state, action);
        case ActionTypes.CLEAR_ERROR:
            return reducerClearError(state, action);
        default:
            return state
    }
};