import {connect} from 'react-redux';

import {bindActionCreators} from './utils/utils';

import LoginForm from './App';
import PlayerActionCreator from "./redux/PlayerReducer/PlayerActionCreator";

const ActionCreator = {
    fetchDetails: PlayerActionCreator.fetchDetails
};

const mapStateToProps = state => ({
    player: state.player
});

const ConnectedApp = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(LoginForm);

export default ConnectedApp;