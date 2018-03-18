import React from 'react';
import PropTypes from 'prop-types';

import './css/loader.css';
import Spinner from './svg-loaders/puff.svg';

const Loader = ({display}) => {
    if (display) {
        return (
            <div className="loader">
                <img src={Spinner} alt="spinner. Copyright (c) 2014 Sam Herbert"/>
            </div>
        )
    } else {
        return null;
    }
};

Loader.propTypes = {
    display: PropTypes.bool.isRequired
};

export default Loader;
