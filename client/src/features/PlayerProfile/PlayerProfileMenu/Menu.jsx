import React from 'react';
import PropTypes from 'prop-types';
import {PlayerProfileScreens} from "./helpers/constants";

const PlayerProfileMenu = (props) => {
    const {setScreen, activeScreen} = props;

    return (
        <ul className="nav nav-tabs w-100">
            <li className="nav-item">
                <button className={`nav-link ${activeScreen === PlayerProfileScreens.STATS ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setScreen(PlayerProfileScreens.STATS)
                        }}>Статистика
                </button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${activeScreen === PlayerProfileScreens.BAG ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            setScreen(PlayerProfileScreens.BAG)
                        }}>Рюкзак
                </button>
            </li>
            <li className="nav-item">
                <button
                   className={`nav-link ${activeScreen === PlayerProfileScreens.SETTINGS ? 'active' : ''}`}
                   onClick={(e) => {
                       e.preventDefault();
                       setScreen(PlayerProfileScreens.SETTINGS)
                   }}>Настройки
                </button>
            </li>
        </ul>
    )
};

PlayerProfileMenu.propTypes = {
    setScreen: PropTypes.func,
    activeScreen: PropTypes.string
};

export default PlayerProfileMenu;

