import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const MenuItem = ({title, path}) => {
    return (
        <Link className="navbar-item"
              to={path}
        >
            {title}
        </Link>
    )
};

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
};

export default MenuItem;