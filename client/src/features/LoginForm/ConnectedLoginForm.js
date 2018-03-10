import {connect} from 'react-redux';

import {bindActionCreators} from '../../utils/utils';

import PlayerActionCreator from '../../redux/PlayerReducer/PlayerActionCreator';
import LoginForm from './LoginForm';

const ActionCreator = {
    login: PlayerActionCreator.login
};

const mapStateToProps = state => ({});

const ConnectedLoginForm = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(LoginForm);

export default ConnectedLoginForm;