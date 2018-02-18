import {connect} from 'react-redux';

import {bindActionCreators} from './utils/utils';

import LoginForm from './App';

const ActionCreator = {
};

const mapStateToProps = state => ({
    player: state.player
});

const ConnectedApp = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(LoginForm);

export default ConnectedApp;