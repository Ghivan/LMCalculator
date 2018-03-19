import jwt_decode from 'jwt-decode';

import ActionTypes from './PlayerActionTypes';

const initialState = {
    id: '',
    token: '',
    isAdmin: false,
    details: {}
};

const reducerAuthorize = (state, action) => {
    const tokenData = jwt_decode(action.payload.token);
    window.localStorage.setItem('authToken', action.payload.token);
    return {
        ...state,
        token: action.payload.token,
        id: tokenData.sup.id,
        isAdmin: tokenData.sup.isAdmin
    }
};

const reducerLogout = state => {
    window.localStorage.removeItem('authToken');
    return {
        ...state,
        id: '',
        token: '',
        isAdmin: false
    }
};

const reducerFetchDetails = (state, action) => {
    return {
        ...state,
        details: action.payload.details
    }
};

const reducerUpdateStats = (state, action) => {
    return {
        ...state,
        details: {
            ...state.details,
            stats: action.payload.stats
        }
    }
};

const reducerUpdateSpeedUps = (state, action) => {
    return {
        ...state,
        details: {
            ...state.details,
            bag: {
                ...state.details.bag,
                speedUps: action.payload.speedUps
            }
        }
    }
};

const reducerUpdateResources = (state, action) => {
    return {
        ...state,
        details: {
            ...state.details,
            bag: {
                ...state.details.bag,
                resources: action.payload.packs
            }
        }
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTHORIZE:
            return reducerAuthorize(state, action);
        case ActionTypes.LOGOUT:
            return reducerLogout(state, action);
        case ActionTypes.FETCH_DETAILS:
            return reducerFetchDetails(state, action);
        case ActionTypes.UPDATE_STATS:
            return reducerUpdateStats(state, action);
        case ActionTypes.UPDATE_SPEED_UPS:
            return reducerUpdateSpeedUps(state, action);
        case ActionTypes.UPDATE_RESOURCES:
            return reducerUpdateResources(state, action);
        default:
            return state
    }
};