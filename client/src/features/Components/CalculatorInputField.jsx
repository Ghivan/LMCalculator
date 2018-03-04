import React from 'react';
import PropTypes from 'prop-types';

class CalculatorInputField extends React.Component {
    state = {
        inputValue: this.props.defaultValue || 0
    };

    onInputChange = e => {
        this.setState({
            inputValue: e.target.value
        });

        if (this.props.onChange) this.props.onChange(e.target);
    };

    onInputBlur = e => {
        this.setState({
            inputValue: e.target.value
        });

        if (this.props.onBlur) this.props.onBlur(e.target);
    };

    onInputFocus = e => {
        e.target.select();

        if (this.props.onFocus) this.props.onFocus(e.target);
    };

    render() {
        const {
            type = 'text',
            name,
            error,
            label = '',
            icon='fa-clock'
        } = this.props;
        const is_narrow = window.innerWidth <= 768;

        return (
            <div className="field">
                {label
                    ? <label className="label">{label}</label>
                    : null
                }
                <div className={`control ${!is_narrow ? 'has-icons-left' : ''}`}>
                    <input className={`input ${error ? 'is-danger' : ''}  is-small`}
                           type={type}
                           name={name || null}
                           value={this.state.inputValue}
                           onChange={this.onInputChange}
                           onBlur={this.onInputBlur}
                           onFocus={this.onInputFocus}
                    />
                    <span className="icon is-small is-left is-hidden-mobile">
                        <i className={`fas ${icon}`}/>
                    </span>
                </div>
                <p className="help is-danger">
                    {error}
                </p>
            </div>
        );
    }
}

CalculatorInputField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    icon: PropTypes.string
};

export default CalculatorInputField;
