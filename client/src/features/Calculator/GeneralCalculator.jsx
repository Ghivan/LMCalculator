import React from 'react';

import {countTimeWithHelp, countTimeWithSpeedBonus} from "../Global/Functions/time";
import TimeForm from "../Global/Components/Time/TimeForm";
import CalculatorInputField from "../Global/Components/Calculator/CalculatorInputField";
import TimeDisplay from "../Global/Components/Time/TimeDisplay";

const FIELD_NAMES = {
    HELP_QUANTITY: 'helpQuantity',
    SPEED_BONUS: 'speedBonus'
};

class GeneralCalculator extends React.Component {
    state = {
        seconds: 0,
        [FIELD_NAMES.SPEED_BONUS]: 0,
        [FIELD_NAMES.HELP_QUANTITY]: 30,
        errors: {}
    };

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

    onInputBlur = element => {
        const fieldName = element.name;
        if (this.state.errors[fieldName]) {
            element.select();
        }
    };

    onInputChange = element => {
        const fieldName = element.name;
        const value = element.value;

        switch (fieldName) {
            case FIELD_NAMES.HELP_QUANTITY:
                this.setHelpQuantityField(value);
                break;

            case FIELD_NAMES.SPEED_BONUS:
                this.setSpeedBonusField(value);
                break;

            default:
                return null;
        }
    };

    setHelpQuantityField = valueToSet => {
        const value = Number(valueToSet);
        if (value < 0 || value > 30 || isNaN(value) || (value % 1 !== 0)) {
            this.setError(FIELD_NAMES.HELP_QUANTITY, 'Целое число от 0 до 30');
            this.setState({
                [FIELD_NAMES.HELP_QUANTITY]: 0
            });
        } else {
            this.clearError(FIELD_NAMES.HELP_QUANTITY);
            this.setState({
                [FIELD_NAMES.HELP_QUANTITY]: value
            });
        }
    };

    setSpeedBonusField = valueToSet => {
        const value = Number(valueToSet.replace(/,/g, '.'));
        if (value < 0 || isNaN(value)) {
            this.setError(FIELD_NAMES.SPEED_BONUS, 'Число больше 0');
            this.setState({
                [FIELD_NAMES.SPEED_BONUS]: 0
            });
        } else {
            this.clearError(FIELD_NAMES.SPEED_BONUS);
            this.setState({
                [FIELD_NAMES.SPEED_BONUS]: value
            });
        }
    };

    setSeconds = seconds => {
        this.setState({
            seconds
        })
    };

    render() {
        const timeWithSpeedBonus = countTimeWithSpeedBonus(this.state.seconds, this.state[FIELD_NAMES.SPEED_BONUS]);
        const timeWithHelp = countTimeWithHelp(timeWithSpeedBonus, this.state[FIELD_NAMES.HELP_QUANTITY]);
        return (
            <div className="row">
                <TimeForm seconds={this.state.seconds}
                          onTimeChange={this.setSeconds}
                />
                <div className="col-12">
                    <div className="row p-2">
                        <div className="col-sm-12 col-md-6 mb-2">
                            <div className="card m-auto">
                                <div className="card-header text-center">
                                    Бонус скорости
                                </div>
                                <div className="card-body">
                                    <CalculatorInputField name={FIELD_NAMES.SPEED_BONUS}
                                                          defaultValue={this.state[FIELD_NAMES.SPEED_BONUS]}
                                                          error={this.state.errors[FIELD_NAMES.SPEED_BONUS]}
                                                          onChange={this.onInputChange}
                                                          onBlur={this.onInputBlur}
                                                          icon="fa-fast-forward"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 mb-2">
                            <div className="card m-auto">
                                <div className="card-header text-center">
                                    Количество помощи
                                </div>
                                <div className="card-body">
                                    <CalculatorInputField name={FIELD_NAMES.HELP_QUANTITY}
                                                          defaultValue={this.state[FIELD_NAMES.HELP_QUANTITY]}
                                                          error={this.state.errors[FIELD_NAMES.HELP_QUANTITY]}
                                                          onChange={this.onInputChange}
                                                          onBlur={this.onInputBlur}
                                                          icon="fa-handshake"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mb-2">
                    <div className="row p-2">
                        <div className="col-sm-12 col-md-6 mb-2">
                            <TimeDisplay title='Фактическое время:'
                                         seconds={timeWithSpeedBonus}
                                         color="info"
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 mb-2">
                            <TimeDisplay title='Время после помощи:'
                                         seconds={timeWithHelp}
                                         color="success"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GeneralCalculator;
