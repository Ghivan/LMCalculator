import React from 'react';
import PropTypes from 'prop-types';

const InputField = (
    {
        type = 'text', name, label, error, placeholder = 'Введите значение...',
        icon ='fa-user',
        value = '',
        handleInputFocus, handleInputChange, handleInputBlur
    }) => (
    <div className="field">
        <label className="label">{label}</label>
        <div className="control has-icons-left has-icons-right">
            <input className={`input ${error ? 'is-danger' : ''}`}
                   type={type}
                   id={name}
                   name={name}
                   value={value}
                   placeholder={placeholder} required
                   onFocus={handleInputFocus}
                   onChange={handleInputChange}
                   onBlur={handleInputBlur}
            />
            <span className="icon is-small is-left">
                    <i className={`fas ${icon}`}/>
                </span>
            <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"/>
                </span>
        </div>
        <p className="help is-danger">{error}</p>
    </div>
);

InputField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.string,
    handleInputBlur: PropTypes.func,
    handleInputChange: PropTypes.func,
    handleInputFocus: PropTypes.func
};

export default InputField;