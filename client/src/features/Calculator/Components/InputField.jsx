import React from 'react';
import PropTypes from 'prop-types';

class InputField extends React.Component{
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
        this.setState({
            inputValue: ''
        });

        if (this.props.onFocus) this.props.onFocus(e.target);
    };

    render(){
        const {
            type = 'text',
            name,
            error,
            label = ''
        } = this.props;

        return (
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id={`${label}_prepend`}>{label}</span>
                    </div>
                    <input className={`form-control ${error ? 'is-invalid' : ''}`}
                           type={type}
                           name = {name || null}
                           value={this.state.inputValue}
                           onChange={this.onInputChange}
                           onBlur={this.onInputBlur}
                           onFocus={this.onInputFocus}
                    />
                    <div className="invalid-feedback">
                        {error}
                    </div>
                </div>
            );
    }
}

InputField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
};

export default InputField;