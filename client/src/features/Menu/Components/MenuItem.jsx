import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const MenuItem = ({title, path}) => {
    return (
        <NavLink className="navbar-item"
                 to={path}
                 activeClassName='is-active'
        >
            {title}
        </NavLink>
    )
};

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

export default MenuItem;