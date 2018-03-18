import React from 'react';

import {countTimeWithHelp, countTimeWithSpeedBonus} from "../Global/Functions/time";
import TimeForm from "../Global/Components/Time/TimeForm";
import CalculatorInputField from "../Global/Components/Calculator/CalculatorInputField";
import TimeDisplay from "../Global/Components/Time/TimeDisplay";

const FIELD_NAMES = {
    HELP_QUANTITY: 'helpQuantity',
    SPEED_BONUS: 'speedBonus'
};

const CALCULATOR_MODES = {
    RESEARCH: 'research',
    BUILDING: 'building'
};

class GeneralCalculator extends React.Component {
    state = {
        seconds: 0,
        [FIELD_NAMES.SPEED_BONUS]: this.props.stats[CALCULATOR_MODES.RESEARCH] || 0,
        [FIELD_NAMES.HELP_QUANTITY]: 30,
        errors: {},
        mode: CALCULATOR_MODES.RESEARCH,
        shouldResetInputs: false
    };

    setError = (field, message) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [field]: message
            }
        })
    };

    setMode = mode => {
        this.setState({
            [FIELD_NAMES.SPEED_BONUS]: this.props.stats[mode],
            shouldResetInputs: true,
            mode
        }, () => this.setState({shouldResetInputs: false}))
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
                <div className="col-12">
                    <div className="h3">Общий калькулятор</div>
                </div>
                <div className="col-12">
                    <div className="form-check form-check-inline">
                        <label className="form-check-label"><b>Режим:</b></label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="CalculatorMode" id={CALCULATOR_MODES.RESEARCH}
                               value={CALCULATOR_MODES.RESEARCH} onClick={e => this.setMode(e.target.value)}
                               defaultChecked={this.state.mode === CALCULATOR_MODES.RESEARCH}
                        />
                        <label className="form-check-label" htmlFor={CALCULATOR_MODES.RESEARCH}>Исследование</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="CalculatorMode" id={CALCULATOR_MODES.BUILDING}
                               value={CALCULATOR_MODES.BUILDING} onClick={e => this.setMode(e.target.value)}
                               checked={this.state.mode === CALCULATOR_MODES.BUILDING}
                        />
                        <label className="form-check-label" htmlFor={CALCULATOR_MODES.BUILDING}>Строительство</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row p-2">
                        <div className="h4 w-100">Модификаторы</div>
                    </div>
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
                                                          shouldReset={this.state.shouldResetInputs}
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

                <TimeForm seconds={this.state.seconds}
                          onTimeChange={this.setSeconds}
                />

                <div className="col-12 mb-2">
                    <div className="row p-2">
                        <div className="col-12 h4">Рассчетное время</div>
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
