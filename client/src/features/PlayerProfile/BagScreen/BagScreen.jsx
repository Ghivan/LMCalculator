import React from 'react';
import PropTypes from 'prop-types';

import SpeedUpsScreen from "./SpeedUpsScreen/SpeedUpsScreen";
import Dropdown from "../../Global/Components/DropDown/Dropdown";

import {BAG_SCREENS} from "./constants/screens";

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
                return <div>Ресурсы</div>;
            default:
                return <SpeedUpsScreen speedUps={this.props.speedUps}/>
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
            <div>
                <Dropdown items={Object.values(BAG_SCREENS)}
                          label={this.state.currentScreen.label}
                          onItemClick={this.setScreen}
                />
                {this.renderScreen(this.state.currentScreen)}
            </div>

        )
    }
}

BagScreen.propTypes = {
    speedUps: PropTypes.object.isRequired,
    updateSpeedUps: PropTypes.func.isRequired
};

export default BagScreen
