import React from 'react';
import PropTypes from 'prop-types';

class InputField extends React.Component {
    state = {
        inputValue: String(this.props.defaultValue) || 0,
        isChanged: false,
        initialValue: String(this.props.defaultValue) || 0
    };

    onInputChange = e => {
        this.setState({
            inputValue: e.target.value,
            isChanged: e.target.value !== this.state.initialValue
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

    componentWillReceiveProps(nextProps){
        if(nextProps.shouldReset){
            this.setState({
                isChanged: false,
                inputValue: nextProps.defaultValue || 0
            });
        }
    }

    render() {
        const {
            type = 'text',
            name,
            error,
            label = '',
            addon = '%'
        } = this.props;

        return (
            <div className="field">
                {label
                    ? <label className="label">{label}</label>
                    : null
                }

                <div className="field has-addons">
                    <div className="control">
                        <a className="button is-static">
                            {addon}
                        </a>
                    </div>
                    <div className="control">
                        <input className={`input ${this.state.isChanged ? 'is-warning' : ''} ${error ? 'is-danger' : ''}`}
                               type={type}
                               name={name || null}
                               value={this.state.inputValue}
                               onChange={this.onInputChange}
                               onBlur={this.onInputBlur}
                               onFocus={this.onInputFocus}
                        />
                        <p className="help is-danger">
                            {error}
                        </p>
                        <p className="help is-warning">
                            {this.state.isChanged && !error ? 'Значение изменено' : ''}
                        </p>
                    </div>
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
    onFocus: PropTypes.func,
    addon: PropTypes.string,
    shouldReset: PropTypes.bool
};

export default InputField;
