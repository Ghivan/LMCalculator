import React from 'react';
import PropTypes from 'prop-types';
import CalculatorInputField from '../Calculator/CalculatorInputField';

import {getFormattedTime} from "../../Functions/general";

const FIELD_NAMES = {
    DAYS: 'days',
    HOURS: 'hours',
    MINUTES: 'minutes',
    SECONDS: 'seconds'
};

class TimeForm extends React.Component {
    setError = (field, message) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [field]: message
            }
        })
    };
    clearError = field => {
        this.setState({
            errors: {
                ...this.state.errors,
                [field]: ''
            }
        })
    };
    getTimeInSeconds = () => {
        return (
            this.state[FIELD_NAMES.DAYS] * 24 * 60 * 60 +
            this.state[FIELD_NAMES.HOURS] * 60 * 60 +
            this.state[FIELD_NAMES.MINUTES] * 60 +
            this.state[FIELD_NAMES.SECONDS]
        )
    };
    onInputChange = element => {
        const fieldName = element.name;
        const fieldValue = element.value;
        this.setTime(fieldName, fieldValue);
    };
    setTime = (field, value) => {
        const time = Number(value);
        const limits = {
            [FIELD_NAMES.HOURS]: 23,
            [FIELD_NAMES.MINUTES]: 59,
            [FIELD_NAMES.SECONDS]: 59,
            [FIELD_NAMES.DAYS]: Infinity
        };
        if (time < 0 || time > limits[field] || isNaN(time) || (time % 1 !== 0)) {
            this.setError(field, `Целое число от 0${Number.isFinite(limits[field]) ? ' до ' + limits[field] : ''}`);
            this.setState({
                [field]: 0
            });
            this.props.onTimeChange(0);
        } else {
            this.clearError(field);
            this.setState({
                [field]: time
            }, () => this.props.onTimeChange(this.getTimeInSeconds()));
        }
    };
    onInputBlur = element => {
        const fieldName = element.name;
        if (this.state.errors[fieldName]) {
            element.select();
        }
    };

    constructor(props) {
        super(props);
        const time = getFormattedTime(this.props.seconds);
        this.state = {
            [FIELD_NAMES.DAYS]: time.days,
            [FIELD_NAMES.HOURS]: time.hours,
            [FIELD_NAMES.MINUTES]: time.minutes,
            [FIELD_NAMES.SECONDS]: time.seconds,
            errors: {}
        }
    }

    render() {
        return (
            <div className="col-12">
                <div className="row">
                    <div className="h4 w-100">Исходное время</div>
                </div>
                <div className="row p-2">
                    <div className="col-sm-6 col-md-3 mb-2">
                        <div className="card m-auto">
                            <div className="card-header text-center">
                                Дни
                            </div>
                            <div className="card-body">
                                <CalculatorInputField name={FIELD_NAMES.DAYS}
                                                      defaultValue={this.state[FIELD_NAMES.DAYS]}
                                                      error={this.state.errors[FIELD_NAMES.DAYS]}
                                                      onChange={this.onInputChange}
                                                      onBlur={this.onInputBlur}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-3 mb-2">
                        <div className="card m-auto">
                            <div className="card-header text-center">
                                Часы
                            </div>
                            <div className="card-body">
                                <CalculatorInputField name={FIELD_NAMES.HOURS}
                                                      defaultValue={this.state[FIELD_NAMES.HOURS]}
                                                      error={this.state.errors[FIELD_NAMES.HOURS]}
                                                      onChange={this.onInputChange}
                                                      onBlur={this.onInputBlur}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-3 mb-2">
                        <div className="card m-auto">
                            <div className="card-header text-center">
                                Минуты
                            </div>
                            <div className="card-body">
                                <CalculatorInputField name={FIELD_NAMES.MINUTES}
                                                      defaultValue={this.state[FIELD_NAMES.MINUTES]}
                                                      error={this.state.errors[FIELD_NAMES.MINUTES]}
                                                      onChange={this.onInputChange}
                                                      onBlur={this.onInputBlur}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-3 mb-2">
                        <div className="card m-auto">
                            <div className="card-header text-center">
                                Секунды
                            </div>
                            <div className="card-body">
                                <CalculatorInputField name={FIELD_NAMES.SECONDS}
                                                      defaultValue={this.state[FIELD_NAMES.SECONDS]}
                                                      error={this.state.errors[FIELD_NAMES.SECONDS]}
                                                      onChange={this.onInputChange}
                                                      onBlur={this.onInputBlur}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TimeForm.propTypes = {
    seconds: PropTypes.any,
    onTimeChange: PropTypes.func
};

export default TimeForm;