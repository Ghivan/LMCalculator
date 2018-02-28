import React from 'react';
import TimeDisplay from "./Components/TimeDisplay";
import {countTimeWithHelp, countTimeWithSpeedBonus} from "./helpers/functions";
import TimeInputField from "./Components/TimeInputField";
import TimeForm from "./Components/TimeForm";

const FIELD_NAMES = {
    HELP_QUANTITY: 'helpQuantity',
    SPEED_BONUS: 'speedBonus'
};

class Calculator extends React.Component {
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
        const value = Number(valueToSet.replace(/,/g, '.'));
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
            <div className="columns">
                <div className="column">
                    <h2 className="is-size-2 has-text-centered">Исходное время</h2>
                    <TimeForm seconds={this.state.seconds}
                              onTimeChange={this.setSeconds}
                    />
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title is-centered">
                                        Бонус скорости
                                    </p>
                                </header>
                                <div className="card-content ">
                                    <div className="content  has-text-centered">
                                        <TimeInputField name={FIELD_NAMES.SPEED_BONUS}
                                                        defaultValue={this.state[FIELD_NAMES.SPEED_BONUS]}
                                                        error={this.state.errors[FIELD_NAMES.SPEED_BONUS]}
                                                        onChange={this.onInputChange}
                                                        onBlur={this.onInputBlur}
                                                        icon="fa-fast-forward"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column is-half">
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title is-centered">
                                        Количество помощи
                                    </p>
                                </header>
                                <div className="card-content">
                                    <div className="content  has-text-centered">
                                        <TimeInputField name={FIELD_NAMES.HELP_QUANTITY}
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
                </div>
                <div className="column">
                    <h2 className="is-size-2 has-text-centered">Расчетное время</h2>

                    <div className="columns is-multiline">
                        <div className="column is-half-desktop is-12-tablet">
                            <TimeDisplay title='Фактическое время:'
                                         seconds={!this.state.errorMessage ? timeWithSpeedBonus : null}
                                         color="info"
                            />
                        </div>
                        <div className="column is-half-desktop is-12-tablet">
                            <TimeDisplay title='Время после помощи:'
                                         seconds={!this.state.errorMessage ? timeWithHelp : null}
                                         color="success"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator;
