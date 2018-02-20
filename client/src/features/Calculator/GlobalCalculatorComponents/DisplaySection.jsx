import React from 'react';
import PropTypes from 'prop-types';

const DisplaySection = (
    {
        type = 'number',
        name,
        onChange,
        onBlur,
        onFocus,
        error,
        label,
        value
    }
) => {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id={`${label}prepend`}>{label}</span>
            </div>
            <input className={`form-control ${error ? 'is-invalid' : ''}`}
                   type={type}
                   name = {name || null}
                   value={value}
                   onChange={onChange ? onChange : null}
                   onBlur={onBlur ? onBlur : null}
                   onFocus={onFocus ? onFocus : null}
                   readOnly={!onChange}
            />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
};

DisplaySection.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default DisplaySection;