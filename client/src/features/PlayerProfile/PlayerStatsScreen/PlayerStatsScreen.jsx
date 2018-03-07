import React from 'react';
import PropTypes from 'prop-types';
import PlayerStatsTable from "./PlayerStatsTable";
import PlayerStatsForm from "./PlayerStatsForm";

class PlayerStatsScreen extends React.Component {
    state = {
        editMode: false
    };

    toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    };

    render() {
        const {stats} = this.props;

        if (this.state.editMode) {
            return (
                <PlayerStatsForm stats={stats}
                                 toggle={this.toggleEditMode}
                                 updateStats={this.props.updateStats}
                />
            )
        } else {
            return <PlayerStatsTable stats={stats} toggle={this.toggleEditMode}/>
        }
    }
}

PlayerStatsScreen.propTypes = {
    stats: PropTypes.shape({
        research: PropTypes.number,
        building: PropTypes.number,
        training: PropTypes.number
    }),
    updateStats: PropTypes.func.isRequired
};

export default PlayerStatsScreen
