import React from 'react';
import PropTypes from 'prop-types';

import SpeedUpForm from "./Components/SpeedUpForm";
import {SPEED_UPS_SOURCE_TYPES} from "../../../Global/Constants/speedups";
import SpeedUpDisplayBox from "./Components/SpeedUpDisplayBox";

class SpeedUpsScreen extends React.Component {
    state = {
        selectedSpeedUpType: ''
    };

    showEditForm = selectedSpeedUpType => {
        this.setState({
            selectedSpeedUpType
        })
    };

    closeEditForm = () => {
        this.setState({
            selectedSpeedUpType: ''
        })
    };

    render() {
        return (
            <div className="columns is-multiline">
                {this.state.selectedSpeedUpType ?
                    <SpeedUpForm type={this.state.selectedSpeedUpType || null}
                                 speedUps={this.props.speedUps[this.state.selectedSpeedUpType] ? this.props.speedUps[this.state.selectedSpeedUpType].slice() : []}
                                 closeModal={this.closeEditForm}
                                 updateSpeedUps={this.props.updateSpeedUps}
                    /> :
                    null
                }
                <div className="column is-fullwidth">
                    {Object.keys(SPEED_UPS_SOURCE_TYPES).map((speedUpType, index) => {
                        return <SpeedUpDisplayBox type={speedUpType}
                                                  speedUps={this.props.speedUps[speedUpType]}
                                                  showEditForm={this.showEditForm}
                                                  key={index}
                        />
                    })}
                </div>
            </div>
        )
    }
}

SpeedUpsScreen.propTypes = {
    speedUps: PropTypes.object.isRequired,
    updateSpeedUps: PropTypes.func.isRequired
};

export default SpeedUpsScreen
