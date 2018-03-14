import React from 'react';
import PropTypes from 'prop-types';
import {PlayerProfileScreens} from "./helpers/constants";

const PlayerProfileMenu = (props) => {
    const {setScreen, activeScreen} = props;

    return (
            <ul className="nav nav-tabs w-100">
                <li className="nav-item">
                    <a href="#"
                       className={`nav-link ${activeScreen === PlayerProfileScreens.STATS ? 'active' : ''}`}
                       onClick={(e) => {
                           e.preventDefault();
                           setScreen(PlayerProfileScreens.STATS)
                       }}>Статистика</a>
                </li>
                <li className="nav-item">
                    <a href="#"
                       className={`nav-link ${activeScreen === PlayerProfileScreens.BAG ? 'active' : ''}`}
                       onClick={(e) => {
                           e.preventDefault();
                           setScreen(PlayerProfileScreens.BAG)
                       }}>Рюкзак</a>
                </li>
                <li className="nav-item">
                    <a href="#"
                       className={`nav-link ${activeScreen === PlayerProfileScreens.SETTINGS ? 'active' : ''}`}
                       onClick={(e) => {
                           e.preventDefault();
                           setScreen(PlayerProfileScreens.SETTINGS)
                       }}>Настройки
                    </a>
                </li>
            </ul>
    )
};

PlayerProfileMenu.propTypes = {
    setScreen: PropTypes.func,
    activeScreen: PropTypes.string
};

export default PlayerProfileMenu;

