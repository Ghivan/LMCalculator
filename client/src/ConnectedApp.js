import {connect} from 'react-redux';

import {bindActionCreators} from './utils/utils';

import LoginForm from './App';
import PlayerActionCreator from "./redux/PlayerReducer/PlayerActionCreator";

const ActionCreator = {
    logout: PlayerActionCreator.logout,
    fetchDetails: PlayerActionCreator.fetchDetails
};

const mapStateToProps = state => ({
    player: state.player,
    error: state.error.message,
    isLoading: state.loader.display
});

const ConnectedApp = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(LoginForm);

export default ConnectedApp;