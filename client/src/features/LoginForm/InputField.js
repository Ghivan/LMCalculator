import React from 'react';
import PropTypes from 'prop-types';

const InputField = (
    {
        name, error, handleInputFocus, handleInputChange, handleInputBlur
    }) => (
    <div className="input-group">
        <div className="input-group-prepend">
            <span className="input-group-text" id={`${name}prepend`}>Логин:</span>
        </div>
        <input className={`form-control ${error ? 'is-invalid' : ''}`}
               id={name}
               name={name}
               placeholder="Ваш логин..." required
               onFocus={handleInputFocus}
               onChange={handleInputChange}
               onBlur={handleInputBlur}
        />
        <div className="invalid-feedback">
            {error}
        </div>
    </div>
);

InputField.propTypes = {
    name: PropTypes.string,
    error: PropTypes.string,
    handleInputBlur: PropTypes.func,
    handleInputChange: PropTypes.func,
    handleInputFocus: PropTypes.func
};

export default InputField;