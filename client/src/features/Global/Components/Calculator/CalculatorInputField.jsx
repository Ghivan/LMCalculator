import React from 'react';
import PropTypes from 'prop-types';

class CalculatorInputField extends React.Component {
    state = {
        inputValue: this.props.defaultValue || '',
        initialValue: this.props.defaultValue|| ''
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.shouldReset) {
            this.setState({
                inputValue: nextProps.defaultValue || 0,
                initialValue: nextProps.defaultValue || 0
            });
        }
    }

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

    resetValue = () => {
        this.setState({
            inputValue: this.state.initialValue
        }, () => {
            if (this.props.onChange) this.props.onChange(this.ref);
        });
    };

    render() {
        const {
            type = 'text',
            name,
            error,
            label = '',
            icon = 'fa-clock',
            showResetBtn = false,
            prependText = ''
        } = this.props;

        return (
            <div className={`input-group input-group-sm ${error || this.state.isChanged ? 'mb-1' : 'mb-3'}`}>
                {label
                    ? <label className="label col-form-label">{label}</label>
                    : null
                }

                <div className="input-group-prepend d-none d-md-flex">
                    <span className="input-group-text" id={label}>
                        {prependText ? prependText : <i className={`fas ${icon}`}/>}
                    </span>
                </div>

                <input className={`input form-control ${error ? 'is-invalid' : ''}`}
                       ref={ref => this.ref = ref}
                       type={type}
                       name={name || null}
                       value={this.state.inputValue}
                       onChange={this.onInputChange}
                       onBlur={this.onInputBlur}
                       onFocus={this.onInputFocus}
                       onKeyPress={e => {
                           if (e.which === 13) {
                               if (error) return;
                               const inputs = document.getElementsByTagName('input');
                               const currentInputIndex = Array.prototype.findIndex.call(inputs, input => document.activeElement.name === input.name);
                               if (currentInputIndex !== -1 && inputs[currentInputIndex + 1]) {
                                   inputs[currentInputIndex + 1].focus();
                               } else {
                                   document.activeElement.blur();
                               }
                           }
                       }}
                />

                {
                    showResetBtn ?
                        <div className="input-group-append">
                            <button className="btn btn-warning"
                                    tabIndex="-1"
                                    onClick={this.resetValue}
                                    title="Вернуть исходное значение"
                            >
                                <i className="fas fa-window-restore"/>
                            </button>
                        </div> :
                        null
                }

                <div className="invalid-feedback">
                    {error}
                </div>
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
    icon: PropTypes.string,
    shouldReset: PropTypes.bool,
    showResetBtn: PropTypes.bool,
    prependText: PropTypes.string
};

export default CalculatorInputField;
