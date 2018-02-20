import {connect} from 'react-redux';

import {bindActionCreators} from '../../utils/utils';

import PlayerActionCreator from '../../redux/PlayerReducer/PlayerActionCreator';
import PlayerProfile from './PlayerProfile';

const ActionCreator = {
    logout: PlayerActionCreator.logout
};

const mapStateToProps = state => {
    return {
        player: state.player
    };
};

const ConnectedPlayerProfile = connect(mapStateToProps,
    dispatch => bindActionCreators(dispatch, ActionCreator))(PlayerProfile);

export default ConnectedPlayerProfile;
