import React from 'react';
import PropTypes from 'prop-types';

class TimeInputField extends React.Component {
    state = {
        inputValue: this.props.defaultValue
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

        return (
            <div className="field">
                {label
                    ? <label className="label">{label}</label>
                    : null
                }
                <div className="control has-icons-left">
                    <input className={`input ${error ? 'is-danger' : ''}`}
                           type={type}
                           name={name || null}
                           value={this.state.inputValue}
                           onChange={this.onInputChange}
                           onBlur={this.onInputBlur}
                           onFocus={this.onInputFocus}
                    />
                    <span className="icon is-small is-left">
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

TimeInputField.propTypes = {
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

export default TimeInputField;
