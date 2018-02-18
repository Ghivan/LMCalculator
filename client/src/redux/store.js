import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import AuthAPI from '../api/AuthApi';
import PlayersAPI from '../api/PlayersApi';

import ErrorReducer from './ErrorReducer/ErrorReducer';
import PlayerReducer from './PlayerReducer/PlayerReducer';

import PlayerActionCreator from './PlayerReducer/PlayerActionCreator';
import ErrorActionCreator from "./ErrorReducer/ErrorActionCreator";

const CombinedReducer = combineReducers({
    error: ErrorReducer,
    player: PlayerReducer
});

const ErrorService = {
    setError: message => {
        return ErrorActionCreator.setError(message)(store.dispatch)
    },
    clearError: () => {
        return ErrorActionCreator.clearError()(store.dispatch);
    }
};


const storeServices = {
    auth: AuthAPI,
    players: PlayersAPI,
    error: ErrorService
};

const store = createStore(CombinedReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(storeServices))));

const authToken = window.localStorage.getItem('authToken');
if (authToken) PlayerActionCreator.validate(authToken)(store.dispatch, store.getState, storeServices);

export default store;