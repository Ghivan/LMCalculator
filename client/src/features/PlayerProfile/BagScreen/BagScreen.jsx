import React from 'react';
import PropTypes from 'prop-types';

import SpeedUpsScreen from "./SpeedUpsScreen/SpeedUpsScreen";
import Dropdown from "./DropDown/Dropdown";

import {BAG_SCREENS} from "./constants/screens";
import ResourceScreen from "./ResourceScreen/ResourceScreen";

class BagScreen extends React.Component {
    state = {
        currentScreen: BAG_SCREENS.SPEED_UPS
    };

    setScreen = (screenType) => {
        this.setState({
            currentScreen: Object.values(BAG_SCREENS).find(screen => screenType === screen.type)
        })
    };

    renderScreen = () => {
        switch (this.state.currentScreen.type) {
            case BAG_SCREENS.SPEED_UPS.type:
                return (
                    <SpeedUpsScreen speedUps={this.props.speedUps}
                                    updateSpeedUps={this.props.updateSpeedUps}
                    />
                );
            case BAG_SCREENS.RESOURCES.type:
                return (
                    <ResourceScreen resources={this.props.resources}
                                    updateResources={this.props.updateResources}
                    />
                );
            default:
                return (
                    <SpeedUpsScreen speedUps={this.props.speedUps}
                                    updateSpeedUps={this.props.updateSpeedUps}
                    />
                )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            currentScreen: BAG_SCREENS.SPEED_UPS
        }
    }

    render() {

        return (
            <div className="container">
                <div className="row p-2 justify-content-center">
                    <Dropdown items={Object.values(BAG_SCREENS)}
                              label={this.state.currentScreen.label}
                              onItemClick={this.setScreen}
                    />
                </div>
                {this.renderScreen(this.state.currentScreen)}
            </div>

        )
    }
}

BagScreen.propTypes = {
    speedUps: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    updateSpeedUps: PropTypes.func.isRequired,
    updateResources: PropTypes.func.isRequired
};

export default BagScreen
