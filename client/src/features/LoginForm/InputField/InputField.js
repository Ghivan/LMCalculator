import React from 'react';
import PropTypes from 'prop-types';

const InputField = (
    {
        type='text', name, label, error, placeholder='Введите значение...',
        value = '',
        handleInputFocus, handleInputChange, handleInputBlur
    }) => (
    <div className="input-group">
        <div className="input-group-prepend">
            <span className="input-group-text" id={`${name}prepend`}>{label}</span>
        </div>
        <input className={`form-control ${error ? 'is-invalid' : ''}`}
               type={type}
               id={name}
               name={name}
               value={value}
               placeholder={placeholder} required
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
    type: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    handleInputBlur: PropTypes.func,
    handleInputChange: PropTypes.func,
    handleInputFocus: PropTypes.func
};

export default InputField;