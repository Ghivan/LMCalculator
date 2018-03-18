import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import AuthAPI from '../api/AuthApi';
import PlayersAPI from '../api/PlayersApi';

import ErrorReducer from './ErrorReducer/ErrorReducer';
import PlayerReducer from './PlayerReducer/PlayerReducer';
import LoaderReducer from './LoaderReducer/LoaderReducer';

import PlayerActionCreator from './PlayerReducer/PlayerActionCreator';
import ErrorActionCreator from "./ErrorReducer/ErrorActionCreator";
import LoaderActionCreator from "./LoaderReducer/LoaderActionCreator";

const CombinedReducer = combineReducers({
    error: ErrorReducer,
    player: PlayerReducer,
    loader: LoaderReducer
});

const ErrorService = {
    setError: message => {
        return ErrorActionCreator.setError(message)(store.dispatch)
    },
    clearError: () => {
        return ErrorActionCreator.clearError()(store.dispatch);
    }
};

const LoaderService = {
    setLoader: message => {
        return LoaderActionCreator.setLoader()(store.dispatch)
    },
    removeLoader: () => {
        return LoaderActionCreator.removeLoader()(store.dispatch);
    }
};


const storeServices = {
    auth: AuthAPI,
    players: PlayersAPI,
    error: ErrorService,
    loader: LoaderService
};

const store = createStore(CombinedReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(storeServices))));

const authToken = window.localStorage.getItem('authToken');
if (authToken) PlayerActionCreator.validate(authToken)(store.dispatch, store.getState, storeServices);

export default store;