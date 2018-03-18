import React from 'react';
import PropTypes from 'prop-types';

import {getFormattedNumberOutput} from "../Global/Functions/general";
import {countTimeWithSpeedBonus} from "../Global/Functions/time";
import {TROOPS_CLASSES} from "../Global/Constants/troops";
import {RESOURCES_TYPE} from "../Global/Constants/resources";

import CalculatorInputField from "../Global/Components/Calculator/CalculatorInputField";
import TimeDisplay from "../Global/Components/Time/TimeDisplay";
import TroopsCalculatorRow from "../Global/Components/Calculator/TroopsCalculatorRow";
import ResourcesDisplayBox from "../Global/Components/Resources/ResourcesDisplayBox";

const FIELD_NAMES = {
    SPEED_BONUS: 'speedBonus',
};


class TroopsCalculator extends React.Component {
    state = {
        seconds: 0,
        [FIELD_NAMES.SPEED_BONUS]: this.props.speedBonus || 0,
        time: {
            [TROOPS_CLASSES.INFANTRY]: 0,
            [TROOPS_CLASSES.CAVALRY]: 0,
            [TROOPS_CLASSES.RANGED]: 0,
            [TROOPS_CLASSES.SIEGE]: 0
        },
        might: {
            [TROOPS_CLASSES.INFANTRY]: 0,
            [TROOPS_CLASSES.CAVALRY]: 0,
            [TROOPS_CLASSES.RANGED]: 0,
            [TROOPS_CLASSES.SIEGE]: 0
        },
        resources: {
            [TROOPS_CLASSES.INFANTRY]: {},
            [TROOPS_CLASSES.CAVALRY]: {},
            [TROOPS_CLASSES.RANGED]: {},
            [TROOPS_CLASSES.SIEGE]: {}
        },
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
            case FIELD_NAMES.SPEED_BONUS:
                this.setSpeedBonusField(value);
                break;

            default:
                return null;
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

    setClassTime = (troopClass, time) => {
        this.setState({
            time: {
                ...this.state.time,
                [troopClass]: time
            }
        })
    };

    setClassMight = (troopClass, might) => {
        this.setState({
            might: {
                ...this.state.might,
                [troopClass]: might
            }
        })
    };

    setClassResources = (troopClass, resources) => {
        this.setState({
            resources: {
                ...this.state.resources,
                [troopClass]: {
                    ...resources
                }
            }
        })
    };

    getTotalMight = () => {
        return Object.values(this.state.might).reduce((acc, currentValue) => acc + currentValue, 0);
    };

    getTotalTime = () => {
        return Object.values(this.state.time).reduce((acc, currentValue) => acc + currentValue, 0);
    };

    getTotalResources = () => {
        const total = Object.values(RESOURCES_TYPE).reduce((acc, curr) => {
            acc[curr] = 0;
            return acc;
        }, {});
        Object.values(RESOURCES_TYPE).map(resource => {
            return Object.values(TROOPS_CLASSES).map(troopClass => {
                return total[resource] += this.state.resources[troopClass][resource] || 0
            })
        });
        return total;
    };


    render() {
        const initialTime = this.getTotalTime();
        const totalMight = this.getTotalMight();
        const totalResources = this.getTotalResources();
        const timeWithSpeedBonus = countTimeWithSpeedBonus(initialTime, this.state[FIELD_NAMES.SPEED_BONUS]);

        return (
            <div className="row">

                <div className="col-12">
                    <div className="h3">Калькулятор войск (тренировка)</div>
                </div>

                <div className="col-12">
                    <div className="row p-2">
                        <div className="card m-auto">
                            <div className="card-header text-center">
                                Бонус скорости тренировки
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
                </div>

                <div className="col-12">
                    <div className="row">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th/>
                                <th>Класс 1</th>
                                <th>Класс 2</th>
                                <th>Класс 3</th>
                                <th>Класс 4</th>
                            </tr>
                            </thead>
                            <tbody>
                            <TroopsCalculatorRow title="Пехота"
                                                 class={TROOPS_CLASSES.INFANTRY}
                                                 icon="fa-male"
                                                 setTime={this.setClassTime}
                                                 setMight={this.setClassMight}
                                                 setResources={this.setClassResources}
                            />
                            <TroopsCalculatorRow title="Кавалерия"
                                                 class={TROOPS_CLASSES.CAVALRY}
                                                 icon="fa-chess-knight"
                                                 setTime={this.setClassTime}
                                                 setMight={this.setClassMight}
                                                 setResources={this.setClassResources}
                            />
                            <TroopsCalculatorRow title="Лучники"
                                                 class={TROOPS_CLASSES.RANGED}
                                                 icon="fa-angle-double-up"
                                                 setTime={this.setClassTime}
                                                 setMight={this.setClassMight}
                                                 setResources={this.setClassResources}
                            />
                            <TroopsCalculatorRow title="Осадные орудия"
                                                 class={TROOPS_CLASSES.SIEGE}
                                                 setTime={this.setClassTime}
                                                 setMight={this.setClassMight}
                                                 setResources={this.setClassResources}
                                                 icon="fa-rocket"
                            />
                            </tbody>
                            <tfoot>
                            <tr>
                                <th colSpan="5"
                                    className="text-center border-top border-bottom"
                                >
                                    Суммарная мощь армии: {
                                    getFormattedNumberOutput(totalMight)
                                }
                                </th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col-12 h4">Рассчетное время</div>
                        <div className="col-sm-12 col-md-6 mb-2">
                            <TimeDisplay title='Исходное время:'
                                         seconds={initialTime}
                                         color="info"
                            />
                        </div>
                        <div className="col-sm-12 col-md-6 mb-2">
                            <TimeDisplay title='Фактическое время:'
                                         seconds={timeWithSpeedBonus}
                                         color="success"
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12">
                        <ResourcesDisplayBox resources={totalResources}/>
                </div>

            </div>
        )
    }
}

TroopsCalculator.propTypes = {
    speedBonus: PropTypes.number
};

export default TroopsCalculator;
