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
        const {logout} = this.props;

        if (isEmpty(details)) return (
            <div className="section">
                <div className="notification is-warning has-text-centered ">Загрузка...</div>
            </div>
        );

        return (
            <div className="box is-radiusless">

                <div className="columns is-multiline">
                    <div className="column is-one-fifth-desktop is-one-third-tablet is-full-mobile">
                        <div className="section">
                            <figure className="image">
                                <img src={details.avatar}
                                     alt="Аватар игрока"/>
                            </figure>
                            <div className="buttons  is-centered">
                                <button className="button is-danger"
                                        onClick={e => {
                                            e.preventDefault();
                                            logout();
                                        }}
                                >
                                    Выйти из профиля
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="column is-four-fifth-desktop is-two-third-tablet is-full-mobile">
                        <PlayerProfileMenu setScreen={this.setScreen}
                                           activeScreen={this.state.currentScreen}
                        />
                        {this.renderScreen(this.state.currentScreen)}
                    </div>
                </div>
            </div>
        )
    }
}

PlayerProfile.propTypes = {
    logout: PropTypes.func,
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
