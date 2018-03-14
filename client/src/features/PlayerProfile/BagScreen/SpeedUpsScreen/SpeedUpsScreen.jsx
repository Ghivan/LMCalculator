import React from 'react';
import PropTypes from 'prop-types';

import {SPEED_UPS_SOURCE_TYPES} from "../../../Global/Constants/speedups";
import SpeedUpDisplayBox from "./Components/SpeedUpDisplayBox";

class SpeedUpsScreen extends React.Component {
    constructor(props) {
        super(props);
        const speedUpsTypes = Object.keys(SPEED_UPS_SOURCE_TYPES);
        this.state = {
            index: 0,
            speedUpsTypes,
            currentSpeedUpType: speedUpsTypes[0]
        };
    }

    nextSpeedUpType = () => {
        const nextIndex = (this.state.index + 1 < this.state.speedUpsTypes.length) ? this.state.index + 1 : 0;
        const nextSpeedUpType = this.state.speedUpsTypes[nextIndex];
        this.setState({
            index: nextIndex,
            currentSpeedUpType: nextSpeedUpType
        })
    };
    previousSpeedUpType = () => {
        const previousIndex = (this.state.index - 1 >= 0) ? this.state.index - 1 : this.state.speedUpsTypes.length - 1;
        const previousSpeedUpType = this.state.speedUpsTypes[previousIndex];
        this.setState({
            index: previousIndex,
            currentSpeedUpType: previousSpeedUpType
        })

    };

    render() {
        return (
            <SpeedUpDisplayBox type={this.state.currentSpeedUpType}
                               updateSpeedUps={this.props.updateSpeedUps}
                               speedUps={Array.isArray(this.props.speedUps[this.state.currentSpeedUpType]) ? this.props.speedUps[this.state.currentSpeedUpType].slice() : []}
                               next={this.nextSpeedUpType}
                               previous={this.previousSpeedUpType}
            />
        )
    }
}

SpeedUpsScreen.propTypes = {
    speedUps: PropTypes.object.isRequired,
    updateSpeedUps: PropTypes.func.isRequired
};

export default SpeedUpsScreen
