import React from 'react';
import PropTypes from 'prop-types';

import './FloatError.css'

const FloatError = ({message, clearError}) => {
    return (
        <div  className="float-error-container"
              onClick={() => {
                  clearError();
              }
              }
        >
            <div className="float-error alert alert-danger alert-dismissible fade show"
                 role="alert"
            >
                <strong>Ошибка!</strong> {message}
            </div>
        </div>
    )
};

FloatError.propTypes = {
    message: PropTypes.string,
    clearError: PropTypes.func
};

export default FloatError;