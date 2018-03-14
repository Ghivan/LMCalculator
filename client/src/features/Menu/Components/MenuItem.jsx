import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const MenuItem = ({title, path}) => {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={path}>{title}<span className="sr-only">(current)</span>
            </NavLink>
        </li>
    )
};

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

export default MenuItem;