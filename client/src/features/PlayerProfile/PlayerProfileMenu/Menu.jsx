import React from 'react';
import PropTypes from 'prop-types';
import {PlayerProfileScreens} from "./helpers/constants";

const PlayerProfileMenu = (props)=> {
        const {setScreen, activeScreen} = props;

        return (
            <div className="tabs">
                <ul>
                    <li className={`${activeScreen === PlayerProfileScreens.STATS ? 'is-active' : ''}`}>
                        <a onClick={() => setScreen(PlayerProfileScreens.STATS)}>Статистика</a>
                    </li>
                    <li className={`${activeScreen === PlayerProfileScreens.BAG ? 'is-active' : ''}`}>
                        <a onClick={() => setScreen(PlayerProfileScreens.BAG)}>Рюкзак</a>
                    </li>
                    <li className={`${activeScreen === PlayerProfileScreens.SETTINGS ? 'is-active' : ''}`}>
                        <a onClick={() => setScreen(PlayerProfileScreens.SETTINGS)}>Настройки
                        </a>
                    </li>
                </ul>
            </div>
        )
    };

PlayerProfileMenu.propTypes = {
    setScreen: PropTypes.func,
    activeScreen: PropTypes.string
};

export default PlayerProfileMenu;

