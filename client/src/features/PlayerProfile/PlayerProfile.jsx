import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {PlayerProfileScreens} from "./PlayerProfileMenu/helpers/constants";
import PlayerProfileMenu from "./PlayerProfileMenu/Menu";
import PlayerStatsScreen from "./PlayerStatsScreen/PlayerStatsScreen";
import BagScreen from "./BagScreen/BagScreen";

class PlayerProfile extends React.Component {
    setScreen = (screen) => {
        this.setState({
            currentScreen: screen
        })
    };
    renderScreen = screen => {
        switch (screen) {
            case PlayerProfileScreens.STATS:
                return (
                    <PlayerStatsScreen stats={this.props.player.details.stats}
                                       updateStats={this.props.updateStats}
                    />
                );
            case PlayerProfileScreens.BAG:
                return (
                    <BagScreen speedUps={this.props.player.details.bag.speedUps || {}}
                               updateSpeedUps={this.props.updateSpeedUps}
                    />
                );
            case PlayerProfileScreens.SETTINGS:
                return <div>Settings</div>;
            default:
                return (
                    <PlayerStatsScreen stats={this.props.player.details.stats}
                                       updateStats={this.props.updateStats}
                    />
                );
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            currentScreen: PlayerProfileScreens.STATS
        }
    }

    render() {
        const {details} = this.props.player;

        if (isEmpty(details)) return (
            <div className="section">
                <div className="notification is-warning has-text-centered ">Загрузка...</div>
            </div>
        );

        return (
            <div className="row">
                <div className="col-md-3 p-3">
                    <figure className="figure">
                        <img className="img-fluid"
                             src={`${details.avatar}`}
                             alt="Аватар игрока"/>
                        <figcaption className="figure-caption"><b>{details.nickname}</b></figcaption>
                    </figure>
                </div>
                <div className="col-md-9 p-3">
                    <div className="row">
                        <PlayerProfileMenu setScreen={this.setScreen}
                                           activeScreen={this.state.currentScreen}
                        />
                    </div>
                    <div className="row p-3 border-left border-right">
                        {this.renderScreen(this.state.currentScreen)}
                    </div>
                </div>
            </div>
        )
    }
}

PlayerProfile.propTypes = {
    updateSpeedUps: PropTypes.func,
    updateStats: PropTypes.func,
    player: PropTypes.shape({
        id: PropTypes.string,
        details: PropTypes.shape({
            nickname: PropTypes.string,
            avatar: PropTypes.string,
            stats: PropTypes.shape({
                research: PropTypes.number,
                building: PropTypes.number,
                training: PropTypes.number
            })
        })
    })
};

export default PlayerProfile
